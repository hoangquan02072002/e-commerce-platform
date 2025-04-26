/* eslint-disable react/display-name */
// import Image from "next/image";
// import React from "react";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";
// import { addToCart } from "@/redux/cart/cartSlice";
// import { AppDispatch } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";

// interface Category {
//   id: number;
//   name: string;
// }

// interface ProductCardProps {
//   name: string;
//   price: string;
//   image: string;
//   // description: string;
//   stock: number;
//   category: Category;
//   id: number;
// }

// const ProductCards: React.FC<ProductCardProps> = ({
//   name,
//   price,
//   image,
//   // description,
//   stock,
//   category,
//   id,
// }) => {
//   const router = useRouter();
//   const dispatch = useDispatch<AppDispatch>();
//   const handleAddToCart = (product: ProductCardProps) => {
//     dispatch(
//       addToCart({ ...product, price: Number(product.price), quantity: 1 })
//     );
//     toast.success("Product added to cart!");
//   };
//   const handleClick = () => {
//     router.push(`/products/${id}`);
//     console.log("id", id);
//   };
//   return (
//     <div className="flex flex-col max-md:ml-0 max-md:w-full">
//       <div className="flex flex-col max-md:mt-10">
//         <Image loading="lazy" src={image} alt={name} width={188} height={195} />

//         <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
//           {name}
//         </div>
//         {/* <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
//           {description}
//         </div> */}
//         <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
//           {category.name}
//         </div>
//         <div className="flex gap-1.5 self-start mt-6 font-semibold leading-tight">
//           <div className="text-lg text-black grow">Price: {price} </div>
//         </div>
//         <div className="flex gap-1 self-start mt-3.5 text-xs">
//           <div className="text-lg leading-relaxed text-black">
//             {" "}
//             {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
//           </div>
//         </div>
//         <Button
//           onClick={() =>
//             handleAddToCart({ id, name, price, image, stock, category })
//           }
//           className="text-[#1ABA1A] my-2"
//           // variant="outline"
//         >
//           Add to cart
//         </Button>
//         <Button
//           onClick={handleClick}
//           className="text-[#1ABA1A] my-2"
//           // variant="outline"
//         >
//           Detail product
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCards;

import Image from "next/image";
import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/cart/cartSlice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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

    const handleAddToCart = (product: ProductCardProps) => {
      dispatch(
        addToCart({ ...product, price: Number(product.price), quantity: 1 })
      );
      toast.success("Product added to cart!");
    };

    const handleClick = () => {
      router.push(`/products/${id}`);
    };

    return (
      <div
        ref={ref}
        className="flex flex-col h-full bg-white rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
      >
        {/* Product Image */}
        <div className="overflow-hidden relative w-full rounded-t-lg aspect-square">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col flex-grow p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-gray-900 line-clamp-2">
              {name}
            </h3>
            <p className="text-xs text-gray-500">{category.name}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                {price} RUB
              </span>
              <span
                className={`text-xs ${
                  stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() =>
                handleAddToCart({ id, name, price, image, stock, category })
              }
              className="py-2 w-full text-sm font-medium text-white bg-green-500 transition-colors hover:bg-green-600"
              disabled={stock === 0}
            >
              Add to cart
            </Button>
            <Button
              onClick={handleClick}
              className="py-2 w-full text-sm font-medium text-green-500 bg-white border border-green-500 transition-colors hover:bg-green-50"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ProductCards.displayName = "ProductCards";

export default ProductCards;
