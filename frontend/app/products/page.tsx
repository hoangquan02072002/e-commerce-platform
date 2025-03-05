import CategoryFilter from "@/components/products/CategoryFilter";
import { CategoryItemProps } from "@/components/products/Categoryitem";
import CategorySidebar from "@/components/products/CategorySidebar";
import Pagination from "@/components/products/Pagination";
import PopularCategories from "@/components/products/PopularCategory";
import ProductGrid from "@/components/products/ProductGrid";
import ProductGrids from "@/components/products/ProductGrids";
import React from "react";

const categories: CategoryItemProps[] = [
  {
    name: "iPhone (iOS)",
    itemCount: 74,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/992b514cbc160d391ab08f58e10975269a23ab60ea478208692ea31d6b52c184?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Gaming",
    itemCount: 9,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/15f8a8f3f5d6e48da174c2b85383d13d01270d623c6db856bff552c03bdb373e?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Android",
    itemCount: 35,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/15f8a8f3f5d6e48da174c2b85383d13d01270d623c6db856bff552c03bdb373e?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Xiaomi",
    itemCount: 52,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/15f8a8f3f5d6e48da174c2b85383d13d01270d623c6db856bff552c03bdb373e?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "5G Support",
    itemCount: 12,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/c1135da744f886b3a592172daaafb309acb4a8e5c3a13923a193030b4fee8965?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Accessories",
    itemCount: 29,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/3e50ea4e59d74c21ec763f0c778e444e6e506861d475b6a8546e0076435085af?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Apple Tablets",
    itemCount: 22,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/baa9abf8d8944db47d809bb26555d68d586ff07eddb4846f0ee97a1d191732f5?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Samsung Tablets",
    itemCount: 26,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/38647d0e46f01694504f64bbd45f163b122b6865fdbc9beb960bddbd4a9b5005?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "Smartphone Chargers",
    itemCount: 33,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/704cb4d45d75bb730992b911f9088fcbc1f9b2cff1c75134c73df60751d80811?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
  {
    name: "eReader",
    itemCount: 5,
    imageSrc:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/8e81838d6e5dabf422218f6e99fb26cc22dcc09361a43818db9085f68f9b73ca?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
  },
];

const page = () => {
  return (
    <div className="">
      <PopularCategories categories={categories} />
      <div className="max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <CategorySidebar />
          <ProductGrid />
        </div>
      </div>
      <div className="self-start mt-1.5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="flex flex-col w-[24%] max-md:ml-0 max-md:w-full">
            <CategoryFilter />
          </div>
          <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-4 w-full max-md:mt-10 max-md:max-w-full">
              <ProductGrids />
              <Pagination />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
