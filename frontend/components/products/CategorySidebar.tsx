// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// interface Category {
//   id: string;
//   name: string;
// }

// interface CategorySidebarProps {
//   onCategoryClick: (category: string) => void;
// }

// const CategorySidebar: React.FC<CategorySidebarProps> = ({
//   onCategoryClick,
// }) => {
//   const [activeCategory, setActiveCategory] = useState<number | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     };

//     fetchCategories();
//   }, []);
//   const handleCategoryClick = (categoryName: string) => {
//     setActiveCategory(categoryName);
//     onCategoryClick(categoryName);
//   };
//   return (
//     <div className="flex flex-col max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col items-start w-full pl-8 pr-16 mx-auto text-sm text-black bg-gray-100 py-9 rounded-xl max-md:px-5 max-md:mt-8">
//         <div className="text-lg font-bold leading-tight uppercase">
//           categories
//         </div>
//         <div className="px-9 py-3 mt-6 max-w-full text-xs font-bold bg-white rounded-lg w-[137px] max-md:pl-5">
//           All Categories
//         </div>
//         {categories.map((category) => (
//           <button
//             key={category.id}
//             onClick={() => handleCategoryClick(category.name)}
//             className={`p-4 text-left w-full ${
//               activeCategory === category.name
//                 ? "bg-green-600 text-white"
//                 : "bg-white"
//             } hover:bg-green-100 transition-colors`}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategorySidebar;

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Layers, ChevronRight, Grid, Sparkles, Star } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface CategorySidebarProps {
  onCategoryClick: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  onCategoryClick,
}) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName === activeCategory ? null : categoryName);
    onCategoryClick(categoryName === activeCategory ? "" : categoryName);
  };

  const handleAllCategoriesClick = () => {
    setActiveCategory(null);
    onCategoryClick("");
  };

  // Category icons mapping (you can expand this)
  const getCategoryIcon = (categoryName: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      Electronics: "📱",
      Clothing: "👕",
      Books: "📚",
      Sports: "⚽",
      Beauty: "💄",
      Home: "🏠",
      Garden: "🌱",
      Toys: "🧸",
      Automotive: "🚗",
      Food: "🍕",
    };
    return iconMap[categoryName] || "📦";
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Categories</h2>
              <p className="text-sm text-blue-100">Browse by category</p>
            </div>
          </div>
        </div>

        {/* Categories List */}
        <div className="p-6 space-y-3">
          {/* All Categories Button */}
          <button
            onClick={handleAllCategoriesClick}
            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
              activeCategory === null
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`p-2 rounded-lg ${
                  activeCategory === null ? "bg-white/20" : "bg-white shadow-sm"
                }`}
              >
                <Grid
                  className={`w-5 h-5 ${
                    activeCategory === null ? "text-white" : "text-blue-500"
                  }`}
                />
              </div>
              <div className="text-left">
                <div className="font-semibold">All Categories</div>
                <div
                  className={`text-xs ${
                    activeCategory === null ? "text-blue-100" : "text-gray-500"
                  }`}
                >
                  View all products
                </div>
              </div>
            </div>
            <div
              className={`flex items-center space-x-2 ${
                activeCategory === null ? "text-white" : "text-gray-400"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <ChevronRight className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" />
            </div>
          </button>

          {/* Loading State */}
          {isLoading && (
            <div className="space-y-3">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-16 bg-gray-100 rounded-xl animate-pulse"
                >
                  <div className="flex items-center p-4 space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                      <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Category Items */}
          {!isLoading &&
            categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 transform hover:scale-105 group ${
                  activeCategory === category.name
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                    : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:shadow-md"
                }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg text-xl ${
                      activeCategory === category.name
                        ? "bg-white/20"
                        : "bg-white shadow-sm"
                    }`}
                  >
                    {getCategoryIcon(category.name)}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold capitalize">
                      {category.name}
                    </div>
                    <div
                      className={`text-xs ${
                        activeCategory === category.name
                          ? "text-green-100"
                          : "text-gray-500"
                      }`}
                    >
                      Browse {category.name.toLowerCase()}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    activeCategory === category.name
                      ? "text-white"
                      : "text-gray-400"
                  }`}
                >
                  {activeCategory === category.name && (
                    <Star className="w-4 h-4 fill-current" />
                  )}
                  <ChevronRight className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}

          {/* Empty State */}
          {!isLoading && categories.length === 0 && (
            <div className="py-8 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                <Layers className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No Categories
              </h3>
              <p className="text-sm text-gray-500">
                Categories will appear here when available
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium">
              {categories.length} Categories Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
