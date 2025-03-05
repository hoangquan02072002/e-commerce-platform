import React from "react";

interface ProductCardProps {
  product: {
    image: string;
    rating?: string;
    title: string;
    price: string;
    oldPrice?: string;
    status: string;
    statusColor: string;
  };
  isFirst: boolean;
  isLast: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFirst,
  isLast,
}) => {
  return (
    <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
      <div className="flex grow gap-4 max-md:mt-8">
        {isFirst && (
          <div className="px-4 py-7 my-auto text-xs leading-3 text-black whitespace-nowrap rounded-md bg-slate-100">
            prev
          </div>
        )}
        <div className="flex flex-col">
          <img
            loading="lazy"
            src={product.image}
            alt={product.title}
            className="object-contain aspect-[0.9] w-[185px]"
          />
          {product.rating && (
            <div className="self-center mt-5 text-sm text-black">
              {product.rating}
            </div>
          )}
          <div className="mt-3.5 text-sm font-bold leading-4 text-black">
            {product.title}
          </div>
          <div className="flex gap-1.5 self-start mt-6 font-semibold leading-tight">
            <div className="grow text-lg text-black">{product.price}</div>
            {product.oldPrice && (
              <div className="text-sm text-black line-through">
                {product.oldPrice}
              </div>
            )}
          </div>
          <div
            className={`flex shrink-0 mt-5 ${product.statusColor} rounded-md h-[21px] w-[93px]`}
          />
          <div className="flex gap-1 self-start mt-3 text-xs">
            <div className="font-black leading-none text-black"></div>
            <div className="leading-relaxed text-black">{product.status}</div>
          </div>
        </div>
        {isLast && (
          <div className="px-5 py-7 my-auto text-xs leading-3 text-black whitespace-nowrap rounded-md bg-slate-100">
            next
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
