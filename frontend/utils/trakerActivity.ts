import { getToken } from "./getToken";
import axios, { AxiosResponse } from "axios";

interface ActivityData {
  activityType: string;
  data: any;
  timestamp?: string;
}

class ActivityTracker {
  private static apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  private static viewStartTimes: Map<string, Date> = new Map();

  // Create axios instance with default config
  private static axiosInstance = axios.create({
    baseURL: this.apiUrl,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Setup axios interceptors
  static {
    // Request interceptor to add auth token
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("⚠️ Authentication failed, token may be expired");
          // You can add logic here to refresh token or redirect to login
        }
        return Promise.reject(error);
      }
    );
  }

  static async trackActivity(activityData: ActivityData) {
    try {
      const token = getToken();
      if (!token) {
        console.warn("⚠️ No auth token found, skipping activity tracking");
        return null;
      }

      // Validate required fields before sending
      if (!activityData.activityType) {
        console.error("❌ Missing required field: activityType");
        return null;
      }

      if (!activityData.data) {
        console.error("❌ Missing required field: data");
        return null;
      }

      // Ensure data is an object
      const data =
        typeof activityData.data === "object" ? activityData.data : {};

      const requestPayload = {
        activityType: activityData.activityType,
        data: data,
        timestamp: activityData.timestamp || new Date().toISOString(),
      };

      console.log("🚀 Sending activity tracking request:", requestPayload);

      const response: AxiosResponse = await this.axiosInstance.post(
        "/kafka/track-activity",
        requestPayload
      );

      if (response.status === 200 || response.status === 201) {
        console.log("✅ Activity tracked successfully:", response.data);
        return response.data;
      } else {
        console.warn(
          "⚠️ Activity tracking failed with status:",
          response.status
        );
        return null;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios error tracking activity:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          url: error.config?.url,
          method: error.config?.method,
          requestData: error.config?.data,
        });

        // Log specific validation errors
        if (error.response?.status === 400) {
          console.error("🔍 Validation error details:", error.response.data);
        }

        // If it's a 401, token might be expired
        if (error.response?.status === 401) {
          console.warn("🔒 Authentication failed - token might be expired");
        }
      } else {
        console.error("❌ Unknown error tracking activity:", error);
      }
      return null;
    }
  }

  //   static async trackProductView(productId: number, productData?: any) {
  //     const viewKey = `product-${productId}`;
  //     this.viewStartTimes.set(viewKey, new Date());

  //     try {
  //       await this.trackActivity({
  //         activityType: "VIEW_PRODUCT",
  //         data: {
  //           productId,
  //           productName: productData?.name,
  //           categoryName: productData?.category?.name,
  //           price: productData?.price,
  //           referrer: typeof window !== "undefined" ? document.referrer : null,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("❌ Error tracking product view:", error);
  //     }
  //   }

  //   static async trackProductViewEnd(productId: number) {
  //     const viewKey = `product-${productId}`;
  //     const startTime = this.viewStartTimes.get(viewKey);

  //     if (startTime) {
  //       const viewDuration = Math.round(
  //         (Date.now() - startTime.getTime()) / 1000
  //       );
  //       this.viewStartTimes.delete(viewKey);

  //       try {
  //         await this.trackActivity({
  //           activityType: "VIEW_PRODUCT_DURATION",
  //           data: {
  //             productId,
  //             viewDuration, // in seconds
  //           },
  //         });
  //       } catch (error) {
  //         console.error("❌ Error tracking product view duration:", error);
  //       }
  //     }
  //   }

  static async trackAddToCart(
    productId: number,
    productData: any,
    quantity: number = 1
  ) {
    try {
      const token = getToken();
      if (!token) {
        console.warn("⚠️ No auth token found, skipping cart tracking");
        return;
      }

      console.log("🚀 Sending add to cart request:", {
        productId,
        productName: productData.name,
        quantity,
        price: productData.price,
        categoryName: productData.category?.name,
        image: productData.image,
      });

      const response = await this.axiosInstance.post("/cart/add", {
        productId,
        productName: productData.name,
        quantity,
        price: productData.price,
        categoryName: productData.category?.name,
        image: productData.image,
      });

      console.log("✅ Add to cart tracked:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios error tracking add to cart:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
          },
        });
      } else {
        console.error("❌ Error tracking add to cart:", error);
      }

      // Fallback to general activity tracking
      try {
        console.log("🔄 Attempting fallback tracking...");
        await this.trackActivity({
          activityType: "ADD_TO_CART",
          data: {
            productId,
            productName: productData.name,
            quantity,
            price: productData.price,
            totalValue: productData.price * quantity,
            categoryName: productData.category?.name,
          },
        });
        console.log("✅ Fallback tracking successful");
      } catch (fallbackError) {
        console.error("❌ Fallback tracking also failed:", fallbackError);
      }
    }
  }

  static async trackRemoveFromCart(
    productId: number,
    productData: any,
    quantity: number
  ) {
    try {
      const token = getToken();
      if (!token) {
        console.warn("⚠️ No auth token found, skipping cart tracking");
        return;
      }

      // Validate required data before sending
      if (!productData || !productData.name) {
        console.error(
          "❌ Invalid product data for remove tracking:",
          productData
        );
        return;
      }

      const requestPayload = {
        productId,
        productName: productData.name,
        quantity,
        price: productData.price || 0,
      };

      console.log("🚀 Sending remove from cart request:", requestPayload);

      const response = await this.axiosInstance.post(
        "/cart/track-remove",
        requestPayload
      );

      console.log("✅ Remove from cart tracked:", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("❌ Axios error tracking remove from cart:", {
          message: error.message,
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            data: error.config?.data,
          },
        });

        // Log specific validation errors
        if (error.response?.status === 400) {
          console.error(
            "🔍 Remove cart validation error:",
            error.response.data
          );
        }
      } else {
        console.error("❌ Error tracking remove from cart:", error);
      }

      // Fallback to general activity tracking
      try {
        console.log("🔄 Attempting fallback remove tracking...");
        await this.trackActivity({
          activityType: "REMOVE_FROM_CART",
          data: {
            productId,
            productName: productData.name || `Product ${productId}`,
            quantity,
            price: productData.price || 0,
          },
        });
        console.log("✅ Fallback remove tracking successful");
      } catch (fallbackError) {
        console.error(
          "❌ Fallback remove tracking also failed:",
          fallbackError
        );
      }
    }
  }

  static async trackSearch(
    query: string,
    resultCount?: number,
    category?: string
  ) {
    try {
      await this.trackActivity({
        activityType: "SEARCH",
        data: {
          searchQuery: query,
          resultCount,
          categoryFilter: category,
        },
      });
    } catch (error) {
      console.error("❌ Error tracking search:", error);
    }
  }

  //   static async trackPageView(page: string) {
  //     try {
  //       await this.trackActivity({
  //         activityType: "PAGE_VIEW",
  //         data: {
  //           page,
  //           url: typeof window !== "undefined" ? window.location.href : null,
  //           referrer: typeof window !== "undefined" ? document.referrer : null,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("❌ Error tracking page view:", error);
  //     }
  //   }
  //   static async trackCheckout(orderData: any) {
  //     try {
  //       await this.trackActivity({
  //         activityType: "CHECKOUT",
  //         data: {
  //           items: orderData.items,
  //           totalAmount: orderData.totalAmount,
  //           paymentMethod: orderData.paymentMethod,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("❌ Error tracking checkout:", error);
  //     }
  //   }

  //   static async trackPurchase(orderData: any) {
  //     try {
  //       await this.trackActivity({
  //         activityType: "PURCHASE",
  //         data: {
  //           orderId: orderData.orderId,
  //           totalAmount: orderData.totalAmount,
  //           items: orderData.items,
  //           paymentMethod: orderData.paymentMethod,
  //         },
  //       });
  //     } catch (error) {
  //       console.error("❌ Error tracking purchase:", error);
  //     }
  //   }

  // Enhanced method for tracking product view with detailed analytics
  //   static async trackDetailedProductView(productId: number, productData?: any) {
  //     try {
  //       const token = getToken();
  //       if (!token) return;

  //       const response = await this.axiosInstance.post("/cart/track-view", {
  //         productId,
  //         productName: productData?.name || `Product ${productId}`,
  //         price: productData?.price || 0,
  //         categoryName: productData?.category?.name,
  //       });

  //       console.log("✅ Detailed product view tracked:", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("❌ Error tracking detailed product view:", error);
  //     }
  //   }

  // Batch tracking for better performance
  //   static async trackBatchActivities(activities: ActivityData[]) {
  //     try {
  //       const token = getToken();
  //       if (!token) {
  //         console.warn("⚠️ No auth token found, skipping batch tracking");
  //         return;
  //       }

  //       const response = await this.axiosInstance.post("/kafka/track-batch", {
  //         activities: activities.map((activity) => ({
  //           ...activity,
  //           timestamp: new Date().toISOString(),
  //         })),
  //       });

  //       console.log("✅ Batch activities tracked:", response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("❌ Error tracking batch activities:", error);
  //     }
  //   }

  // Auto-track page views with enhanced detection
  //   static initPageTracking() {
  //     if (typeof window === "undefined") return;

  //     let startTime = Date.now();
  //     let currentPath = window.location.pathname;

  //     const trackCurrentPage = async () => {
  //       const duration = Math.round((Date.now() - startTime) / 1000);

  //       // Track page view with duration
  //       await this.trackActivity({
  //         activityType: "PAGE_VIEW_WITH_DURATION",
  //         data: {
  //           page: currentPath,
  //           url: window.location.href,
  //           referrer: document.referrer,
  //           duration: duration,
  //         },
  //       });
  //     };

  //     // Track initial page view
  //     this.trackPageView(window.location.pathname);

  //     // Track when leaving page
  //     window.addEventListener("beforeunload", trackCurrentPage);
  //     window.addEventListener("pagehide", trackCurrentPage);

  //     // Track route changes (for Next.js)
  //     const observer = new MutationObserver(() => {
  //       if (window.location.pathname !== currentPath) {
  //         trackCurrentPage();
  //         currentPath = window.location.pathname;
  //         startTime = Date.now();
  //         this.trackPageView(currentPath);
  //       }
  //     });

  //     observer.observe(document.body, { childList: true, subtree: true });

  //     // Track visibility changes
  //     document.addEventListener("visibilitychange", () => {
  //       if (document.hidden) {
  //         trackCurrentPage();
  //       } else {
  //         startTime = Date.now();
  //       }
  //     });
  //   }

  // Health check method
  static async healthCheck() {
    try {
      const response = await this.axiosInstance.get("/kafka/health");
      console.log("✅ Activity tracking service is healthy:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Activity tracking service health check failed:", error);
      return { status: "unhealthy" };
    }
  }
}

export default ActivityTracker;
