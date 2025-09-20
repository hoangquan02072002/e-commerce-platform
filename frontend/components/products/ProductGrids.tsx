// "use client";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import ProductCards from "./ProductCards";
// import axios from "axios";
// import { throttle, debounce } from "lodash";
// import CategorySidebar from "./CategorySidebar";
// import Spinner from "../Spinner";

// interface Category {
//   id: number;
//   name: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
//   stock: number;
//   category: Category;
// }

// const ProductGrids: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const observer = useRef<IntersectionObserver | null>(null);

//   const fetchProducts = async (
//     category: string | null,
//     page: number,
//     search: string | null,
//     desc: string | null,
//     price: string | null
//   ) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/product/search`, {
//         params: {
//           search,
//           category,
//           price,
//           desc,
//           page,
//           limit: 4,
//         },
//       });
//       if (response.data.length === 0) {
//         setHasMore(false);
//       } else {
//         if (page === 1) {
//           setProducts(response.data);
//         } else {
//           setProducts((prevProducts) => [...prevProducts, ...response.data]);
//         }
//       }
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response?.status === 404) {
//         setHasMore(false);
//       } else {
//         setError("Failed to fetch products");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (hasMore) {
//       fetchProducts(selectedCategory, page, searchTerm, null, null);
//     }
//   }, [selectedCategory, page, searchTerm]);

//   const lastProductRef = useCallback(
//     throttle((node: HTMLDivElement | null) => {
//       if (loading || !hasMore || !node) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       observer.current.observe(node);
//     }, 1000),
//     [loading, hasMore]
//   );

//   const handleCategoryClick = useCallback(
//     debounce((category: string) => {
//       setProducts([]);
//       setPage(1);
//       setSelectedCategory(category);
//       setHasMore(true);
//     }, 300),
//     []
//   );

//   const handleSearch = () => {
//     setPage(1);
//     setHasMore(true);
//     fetchProducts(selectedCategory, 1, searchTerm, null, null);
//   };

//   return (
//     <div className="flex flex-col gap-6 lg:flex-row">
//       {/* Category Sidebar - Hidden on mobile, visible on desktop */}
//       <div className="hidden w-64 lg:block">
//         <CategorySidebar onCategoryClick={handleCategoryClick} />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1">
//         {/* Search Bar */}
//         <div className="mb-6">
//           <div className="flex flex-col gap-2 sm:flex-row">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="flex-1 p-2 border border-gray-300 rounded"
//             />
//             <button
//               onClick={handleSearch}
//               className="px-4 py-2 text-white transition-colors bg-blue-500 rounded hover:bg-blue-600"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Title */}
//         <div className="mb-6 text-lg font-bold text-center text-black uppercase">
//           TOP PRODUCTS
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product, index) => (
//             <div
//               key={`${product.id}-${index}`}
//               ref={index === products.length - 1 ? lastProductRef : null}
//             >
//               <ProductCards {...product} />
//             </div>
//           ))}
//         </div>

//         {/* Loading and Error States */}
//         {loading && (
//           <div className="flex justify-center mt-4">
//             <Spinner />
//           </div>
//         )}
//         {!hasMore && (
//           <div className="mt-4 text-center text-gray-500">
//             No more products to load
//           </div>
//         )}
//         {error && <div className="mt-4 text-center text-red-500">{error}</div>}
//       </div>
//     </div>
//   );
// };

// export default ProductGrids;

"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import { throttle, debounce } from "lodash";
import CategorySidebar from "./CategorySidebar";
import Spinner from "../Spinner";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  stock: number;
  category: Category;
}

const ProductGrids: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = async (
    category: string | null,
    page: number,
    search: string | null,
    desc: string | null,
    price: string | null
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/product/search`, {
        params: {
          search,
          category,
          price,
          desc,
          page,
          limit: 8,
        },
      });
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setProducts(response.data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...response.data]);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setHasMore(false);
      } else {
        setError("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchProducts(selectedCategory, page, searchTerm, null, null);
    }
  }, [selectedCategory, page, searchTerm]);

  const lastProductRef = useCallback(
    throttle((node: HTMLDivElement | null) => {
      if (loading || !hasMore || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      observer.current.observe(node);
    }, 1000),
    [loading, hasMore]
  );

  const handleCategoryClick = useCallback(
    debounce((category: string) => {
      setProducts([]);
      setPage(1);
      setSelectedCategory(category);
      setHasMore(true);
    }, 300),
    []
  );

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    fetchProducts(selectedCategory, 1, searchTerm, null, null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Category Sidebar - Enhanced */}
      <div className="hidden lg:block w-80">
        <div className="sticky top-8">
          <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
            <div className="p-6">
              <CategorySidebar onCategoryClick={handleCategoryClick} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-8">
        {/* Search and Filter Bar */}
        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="Search for amazing products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full py-4 pl-12 pr-4 text-gray-700 placeholder-gray-400 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                />
                <button
                  onClick={handleSearch}
                  className="absolute px-6 py-2 font-semibold text-white transition-all duration-300 transform -translate-y-1/2 rounded-lg shadow-lg right-2 top-1/2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-600">View:</span>
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white shadow-md text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    viewMode === "list"
                      ? "bg-white shadow-md text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <p className="mt-2 text-gray-600">
              {products.length} products found
              {selectedCategory && ` in ${selectedCategory}`}
            </p>
          </div>
          <div className="hidden sm:block">
            <select className="px-4 py-2 transition-all duration-300 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
              <option>Best Rating</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div
          className={`grid gap-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              ref={index === products.length - 1 ? lastProductRef : null}
              className="transition-all duration-300 transform hover:scale-105"
            >
              <ProductCards {...product} />
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <Spinner />
              <div className="mt-4 text-center">
                <p className="font-medium text-gray-600">
                  Loading amazing products...
                </p>
                <div className="flex justify-center mt-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No More Products */}
        {!hasMore && products.length > 0 && (
          <div className="py-12 text-center">
            <div className="p-8 border border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <Grid className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                That's all for now!
              </h3>
              <p className="text-gray-600">
                You've seen all our amazing products. Check back later for new
                arrivals!
              </p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && !error && (
          <div className="py-16 text-center">
            <div className="p-12 border border-gray-200 bg-gray-50 rounded-2xl">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                No products found
              </h3>
              <p className="mb-6 text-gray-600">
                We couldn't find any products matching your search. Try
                different keywords or browse our categories.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setPage(1);
                  setHasMore(true);
                }}
                className="px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 hover:shadow-xl"
              >
                Show All Products
              </button>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-16 text-center">
            <div className="p-12 border border-red-200 bg-red-50 rounded-2xl">
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-red-200 rounded-full">
                <Filter className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-red-900">
                Oops! Something went wrong
              </h3>
              <p className="mb-6 text-red-600">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-red-600 to-red-700 rounded-xl hover:from-red-700 hover:to-red-800 hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrids;
