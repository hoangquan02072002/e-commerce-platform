import React from "react";
import FilterSection from "./FilterSection";

interface CategoryFilterProps {
  // Add any necessary props here
}

const CategoryFilter: React.FC<CategoryFilterProps> = () => {
  return (
    <div className="flex flex-col grow max-md:mt-8">
      <div className="flex flex-col px-4 py-8 w-full bg-gray-100 rounded-xl">
        <div className="flex gap-5 justify-between self-center max-w-full text-black w-[236px]">
          <div className="text-lg font-bold leading-tight uppercase">
            categories
          </div>
          <div className="text-sm"> Reset All</div>
        </div>
        <div className="flex gap-2 mt-7 ml-3 max-w-full text-sm text-black w-[223px] max-md:ml-2.5">
          <div className="px-2 py-2.5 bg-white rounded-md max-md:pr-5">
            Min: $45.00{" "}
          </div>
          <div className="px-2 py-2.5 bg-white rounded-md max-md:pr-5">
            10.9 inch{" "}
          </div>
        </div>
        <div className="flex gap-2 mt-2 ml-3 max-w-full text-sm text-black w-[199px] max-md:ml-2.5">
          <div className="px-2 py-2.5 bg-white rounded-md max-md:pr-5">
            Color: Red{" "}
          </div>
          <div className="px-2 py-2.5 bg-white rounded-md max-md:pr-5">
            128GB{" "}
          </div>
        </div>
        <FilterSection title="By Brands" />
        <FilterSection title="By Price" />
        <FilterSection title="By Rating" />
        <FilterSection title="By Screen Size" />
        <FilterSection title="By Color" />
        <FilterSection title="By Memory" />
        <FilterSection title="By Conditions" />
      </div>
      <div className="flex overflow-hidden relative flex-col items-start pt-9 pr-16 pb-32 pl-8 mt-2.5 w-full text-black aspect-[1.01] max-md:px-5 max-md:pb-24">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/dcacc3e9e92cbfc1ec8e0f5a3c567d86e1a6a41dd5c9324957eee907c517ab9f?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
          alt=""
          className="object-cover absolute inset-0 size-full"
        />
        <div className="relative text-2xl font-bold leading-7">
          OKODo <span className="font-medium">hero 11+</span>
          <br />
          <span className="font-medium">5K wireless</span>
        </div>
        <div className="relative mt-11 text-xs leading-relaxed uppercase max-md:mt-10">
          from
        </div>
        <div className="relative mt-4 mb-0 text-3xl leading-tight text-black max-md:mb-2.5">
          $169
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
