/* eslint-disable react/display-name */
// import Image from "next/image";
// import React, { forwardRef } from "react";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";
// import { addToCart } from "@/redux/cart/cartSlice";
// import { AppDispatch } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { ShoppingCart, Eye, Heart, Star } from "lucide-react";

// interface Category {
//   id: number;
//   name: string;
// }

// interface ProductCardProps {
//   name: string;
//   price: string;
//   image: string;
//   stock: number;
//   category: Category;
//   id: number;
// }

// const ProductCards = forwardRef<HTMLDivElement, ProductCardProps>(
//   (props, ref) => {
//     const { name, price, image, stock, category, id } = props;
//     const router = useRouter();
//     const dispatch = useDispatch<AppDispatch>();

//     const handleAddToCart = (product: ProductCardProps) => {
//       dispatch(
//         addToCart({ ...product, price: Number(product.price), quantity: 1 })
//       );
//       toast.success("🛒 Product added to cart successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     };

//     const handleClick = () => {
//       router.push(`/products/${id}`);
//     };

//     return (
//       <div
//         ref={ref}
//         className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
//       >
//         {/* Product Image Container */}
//         <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
//           <div className="relative w-full h-64 sm:h-72">
//             <Image
//               src={image}
//               alt={name}
//               fill
//               className="object-cover transition-transform duration-700 group-hover:scale-110"
//               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
//             />
//             {/* Overlay on hover */}
//             <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100"></div>
//           </div>

//           {/* Stock Badge */}
//           <div className="absolute top-3 right-3">
//             {stock > 0 ? (
//               <div className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-lg">
//                 In Stock ({stock})
//               </div>
//             ) : (
//               <div className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
//                 Out of Stock
//               </div>
//             )}
//           </div>

//           {/* Category Badge */}
//           <div className="absolute top-3 left-3">
//             <div className="px-3 py-1 text-xs font-medium text-gray-700 rounded-full shadow-md bg-white/90 backdrop-blur-sm">
//               {category.name}
//             </div>
//           </div>

//           {/* Hover Actions */}
//           <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
//             <div className="flex space-x-3">
//               <button className="p-3 transition-colors duration-200 bg-white rounded-full shadow-lg hover:bg-gray-50">
//                 <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
//               </button>
//               <button
//                 onClick={handleClick}
//                 className="p-3 transition-colors duration-200 bg-white rounded-full shadow-lg hover:bg-gray-50"
//               >
//                 <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="p-6">
//           <div className="space-y-3">
//             {/* Product Name */}
//             <h3 className="text-lg font-bold text-gray-900 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600">
//               {name}
//             </h3>

//             {/* Rating */}
//             <div className="flex items-center space-x-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   className={`w-4 h-4 ${
//                     i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
//                   }`}
//                 />
//               ))}
//               <span className="ml-2 text-sm text-gray-500">(4.0)</span>
//             </div>

//             {/* Price */}
//             <div className="flex items-center justify-between">
//               <div className="space-y-1">
//                 <div className="text-2xl font-bold text-gray-900">
//                   {price}{" "}
//                   <span className="text-lg font-normal text-gray-600">RUB</span>
//                 </div>
//                 <div className="text-sm text-gray-500 line-through">
//                   {(parseFloat(price) * 1.2).toFixed(0)} RUB
//                 </div>
//               </div>
//               <div className="text-right">
//                 <div className="text-sm font-semibold text-green-600">
//                   Save 20%
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col mt-6 space-y-3">
//             <Button
//               onClick={() =>
//                 handleAddToCart({ id, name, price, image, stock, category })
//               }
//               disabled={stock === 0}
//               className="w-full py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl hover:shadow-xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
//             >
//               <ShoppingCart className="w-5 h-5 mr-2" />
//               {stock === 0 ? "Out of Stock" : "Add to Cart"}
//             </Button>

//             <Button
//               onClick={handleClick}
//               className="w-full py-3 font-semibold text-blue-600 transition-all duration-300 transform bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 hover:scale-105"
//             >
//               View Details
//             </Button>
//           </div>
//         </div>

//         {/* Decorative Element */}
//         <div className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 group-hover:scale-x-100"></div>
//       </div>
//     );
//   }
// );

// ProductCards.displayName = "ProductCards";

// export default ProductCards;

/* eslint-disable react/display-name */
import Image from "next/image";
import React, { forwardRef, useEffect } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/cart/cartSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ShoppingCart, Eye, Heart, Star } from "lucide-react";
import ActivityTracker from "@/utils/trakerActivity";

interface Category {
  id: number;
  name: string;
}

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  stock: number;
  category: Category;
  id: number;
}

const ProductCards = forwardRef<HTMLDivElement, ProductCardProps>(
  (props, ref) => {
    const { name, price, image, stock, category, id } = props;
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // Track product impression when component mounts
    useEffect(() => {
      const trackImpression = async () => {
        try {
          await ActivityTracker.trackDetailedProductView(id, {
            id,
            name,
            price: Number(price),
            category,
            image,
          });
        } catch (error) {
          console.error("Error tracking product impression:", error);
        }
      };

      // Delay tracking to avoid spam for quickly scrolled products
      const timer = setTimeout(trackImpression, 1000);
      return () => clearTimeout(timer);
    }, [id, name, price, category, image]);

    const handleAddToCart = async (product: ProductCardProps) => {
      try {
        // Create product data object
        const productData = {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          category: product.category,
          image: product.image,
        };

        // First add to Redux store for immediate UI feedback
        dispatch(
          addToCart({
            ...product,
            price: Number(product.price),
            quantity: 1,
          })
        );

        // Then track the activity using axios
        await ActivityTracker.trackAddToCart(product.id, productData, 1);

        // Show success message
        toast.success("🛒 Product added to cart successfully!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error in handleAddToCart:", error);
        toast.error("Failed to add product to cart", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    const handleClick = async () => {
      try {
        // Track detailed product view
        await ActivityTracker.trackProductView(id, {
          id,
          name,
          price: Number(price),
          category,
          image,
        });

        router.push(`/products/${id}`);
      } catch (error) {
        console.error("Error tracking product click:", error);
        // Still navigate even if tracking fails
        router.push(`/products/${id}`);
      }
    };

    const handleWishlistClick = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await ActivityTracker.trackActivity({
          activityType: "ADD_TO_WISHLIST",
          data: {
            productId: id,
            productName: name,
            price: Number(price),
            categoryName: category.name,
          },
        });

        toast.info("❤️ Added to wishlist!", {
          position: "top-right",
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Error tracking wishlist:", error);
        toast.error("Failed to add to wishlist");
      }
    };

    return (
      <div
        ref={ref}
        className="relative overflow-hidden transition-all duration-500 transform bg-white border border-gray-100 shadow-lg group rounded-2xl hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Product Image Container */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="relative w-full h-64 sm:h-72">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              loading="lazy"
            />
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-black/20 group-hover:opacity-100"></div>
          </div>

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            {stock > 0 ? (
              <div className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded-full shadow-lg">
                In Stock ({stock})
              </div>
            ) : (
              <div className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded-full shadow-lg">
                Out of Stock
              </div>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <div className="px-3 py-1 text-xs font-medium text-gray-700 rounded-full shadow-md bg-white/90 backdrop-blur-sm">
              {category.name}
            </div>
          </div>

          {/* Hover Actions */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
            <div className="flex space-x-3">
              <button
                onClick={handleWishlistClick}
                className="p-3 transition-colors duration-200 bg-white rounded-full shadow-lg hover:bg-gray-50"
                title="Add to Wishlist"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
              <button
                onClick={handleClick}
                className="p-3 transition-colors duration-200 bg-white rounded-full shadow-lg hover:bg-gray-50"
                title="View Details"
              >
                <Eye className="w-5 h-5 text-gray-600 hover:text-blue-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <div className="space-y-3">
            {/* Product Name */}
            <h3 className="text-lg font-bold text-gray-900 transition-colors duration-200 line-clamp-2 group-hover:text-blue-600">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">(4.0)</span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-gray-900">
                  {price}{" "}
                  <span className="text-lg font-normal text-gray-600">RUB</span>
                </div>
                <div className="text-sm text-gray-500 line-through">
                  {(parseFloat(price) * 1.2).toFixed(0)} RUB
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-green-600">
                  Save 20%
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col mt-6 space-y-3">
            <Button
              onClick={() =>
                handleAddToCart({ id, name, price, image, stock, category })
              }
              disabled={stock === 0}
              className="w-full py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl hover:shadow-xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            <Button
              onClick={handleClick}
              className="w-full py-3 font-semibold text-blue-600 transition-all duration-300 transform bg-white border-2 border-blue-600 rounded-xl hover:bg-blue-50 hover:scale-105"
            >
              View Details
            </Button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 transform scale-x-0 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 group-hover:scale-x-100"></div>
      </div>
    );
  }
);

ProductCards.displayName = "ProductCards";

export default ProductCards;
