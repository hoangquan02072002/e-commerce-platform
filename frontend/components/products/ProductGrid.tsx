import React from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {}

const ProductGrid: React.FC<ProductGridProps> = () => {
  const products = [
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c8bd28004fe1f157d0557be87f9758c13ee1c20e2cf2a4e390c8e608e71221e4?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
      rating: "(8)",
      title: "uLosk Mini case 2.0, Xenon i10 / 32GB / SSD 512GB / VGA 8GB",
      price: "$1,729.00",
      oldPrice: "$2,119.00",
      status: "Out of stock",
      statusColor: "bg-green-600",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2d2156180812056d48ad235f0ecfe6d736ea3eeb314bd9783c13fc91f0d6a1d0?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
      title:
        "Opplo Watch Series 8 GPS + Cellular Stainless Steel Case with Milanese Loop",
      price: "$979.00 - $1,259.00",
      status: "PRE - ORDER",
      statusColor: "bg-neutral-800",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ff8c225a97c876f06e08d696ab61d4e4c143113bc6ca0be151b381bf9f2f7d2f?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
      rating: "(9)",
      title: "iSmart 24V Charger",
      price: "$9.00",
      oldPrice: "$12.00",
      status: "Contact",
      statusColor: "bg-neutral-800",
    },
    {
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4ece1e7f09a5e9d66095eb24efe61dca3cecaae672b9a3905a2b9fa15433d896?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d",
      rating: "(152)",
      title: "OPod Pro 12.9 Inch M1 2023, 64GB + Wifi, GPS",
      price: "$569.00",
      oldPrice: "$759.00",
      status: "In stock",
      statusColor: "bg-green-600",
    },
  ];

  return (
    <div className="flex flex-col ml-5 w-[76%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col pt-1 pr-2.5 pb-32 w-full border-b border-stone-300 max-md:pb-24 max-md:mt-8 max-md:max-w-full">
        <div className="self-start text-lg font-bold leading-tight text-black uppercase">
          Best seller in this category
        </div>
        <div className="mt-12 ml-2.5 w-full max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                isFirst={index === 0}
                isLast={index === products.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
