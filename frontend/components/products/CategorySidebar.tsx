import React from "react";

interface CategorySidebarProps {}

const CategorySidebar: React.FC<CategorySidebarProps> = () => {
  const categories = [
    "All",
    "Iphone",
    "Samsung",
    "Xiaomi",
    "Asus",
    "Oppo",
    "Gaming Smartphone",
    "Ipad",
    "Window Tablets",
    "eReader",
    "Smartphone Chargers",
    "5G Support Smartphone",
    "Smartphone Accessories",
    "Tablets Accessories",
  ];

  return (
    <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col items-start py-9 pr-16 pl-8 mx-auto w-full text-sm text-black bg-gray-100 rounded-xl max-md:px-5 max-md:mt-8">
        <div className="text-lg font-bold leading-tight uppercase">
          categories
        </div>
        <div className="px-9 py-3 mt-6 max-w-full text-xs font-bold bg-white rounded-lg w-[137px] max-md:pl-5">
          All Categories
        </div>
        <div className="mt-6 font-bold leading-tight">
          Cell Phones & Tablets
        </div>
        {categories.map((category, index) => (
          <div key={index} className="mt-3.5 ml-5 max-md:ml-2.5">
            {category}
          </div>
        ))}
        <div className="flex gap-5 mt-4 ml-5 max-md:ml-2.5">
          <div>Cell Phones </div>
          <div> $200</div>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
