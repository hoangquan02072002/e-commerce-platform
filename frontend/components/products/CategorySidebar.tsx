"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);
  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    onCategoryClick(categoryName);
  };
  return (
    <div className="flex flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start py-9 pr-16 pl-8 mx-auto w-full text-sm text-black bg-gray-100 rounded-xl max-md:px-5 max-md:mt-8">
        <div className="text-lg font-bold leading-tight uppercase">
          categories
        </div>
        <div className="px-9 py-3 mt-6 max-w-full text-xs font-bold bg-white rounded-lg w-[137px] max-md:pl-5">
          All Categories
        </div>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            className={`p-4 text-left w-full ${
              activeCategory === category.name
                ? "bg-green-600 text-white"
                : "bg-white"
            } hover:bg-green-100 transition-colors`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
