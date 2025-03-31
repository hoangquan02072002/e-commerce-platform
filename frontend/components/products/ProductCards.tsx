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
      console.log("id", id);
    };

    return (
      <div ref={ref} className="flex flex-col max-md:ml-0 max-md:w-full">
        <div className="flex flex-col w-64 h-[550px] bg-gray-300 border-4 border-gray-600 border-double max-md:mt-10">
          <Image
            loading="lazy"
            src={image}
            alt={name}
            width={256}
            height={100}
            objectFit="cover"
          />
          <div className=" text-sm font-bold leading-4 text-black max-md:mr-1.5 px-3 pt-3">
            {name}
          </div>
          <div className=" text-sm font-bold leading-4 text-black max-md:mr-1.5 p-3">
            {category.name}
          </div>
          <div className="flex self-start px-3 font-semibold leading-tight">
            <div className="text-lg text-black grow">Price: {price} </div>
          </div>
          <div className="flex self-start text-xs">
            <div className="p-3 text-lg leading-relaxed text-black">
              {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
            </div>
          </div>
          <div className="flex gap-2 justify-center items-center">
            <Button
              onClick={() =>
                handleAddToCart({ id, name, price, image, stock, category })
              }
              className="text-[#1ABA1A] my-2"
            >
              Add to cart
            </Button>
            <Button onClick={handleClick} className="text-[#1ABA1A] my-2">
              Detail product
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCards;
