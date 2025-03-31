import React from "react";

interface CategoryFilterProps {
  // Add any necessary props here
}

const CategoryFilter: React.FC<CategoryFilterProps> = () => {
  return (
    <div className="flex flex-col grow max-md:mt-8">
      <div className="flex overflow-hidden relative flex-col items-start pt-9 pr-16 pb-32 pl-8 mt-2.5 w-full text-black aspect-[1.01] max-md:px-5 max-md:pb-24">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcacc3e9e92cbfc1ec8e0f5a3c567d86e1a6a41dd5c9324957eee907c517ab9f?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-2xl font-bold leading-7 text-white">
          OKODo <span className="font-medium text-white">hero 11+</span>
          <br />
          <span className="font-medium text-white">5K wireless</span>
        </div>
        <div className="relative mt-11 text-xs leading-relaxed text-white uppercase max-md:mt-10">
          from
        </div>
        <div className="text-white relative mt-4 mb-0 text-3xl leading-tight max-md:mb-2.5">
          $169
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
