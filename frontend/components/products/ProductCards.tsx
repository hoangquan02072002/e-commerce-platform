import Image from "next/image";
import React from "react";
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
  // description: string;
  stock: number;
  category: Category;
  id: number;
}

const ProductCards: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  // description,
  stock,
  category,
  id,
}) => {
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
    <div className="flex flex-col max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full max-md:mt-10">
        <Image loading="lazy" src={image} alt={name} width={188} height={195} />

        <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
          {name}
        </div>
        {/* <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
          {description}
        </div> */}
        <div className="mt-3.5 text-sm font-bold leading-4 text-black max-md:mr-1.5">
          {category.name}
        </div>
        <div className="flex gap-1.5 self-start mt-6 font-semibold leading-tight">
          <div className="text-lg text-black grow">Price: {price} </div>
        </div>
        <div className="flex gap-1 self-start mt-3.5 text-xs">
          <div className="text-lg leading-relaxed text-black">
            {" "}
            {stock > 0 ? `In Stock: ${stock}` : "Out of Stock"}
          </div>
        </div>
        <Button
          onClick={() =>
            handleAddToCart({ id, name, price, image, stock, category })
          }
          className="text-[#1ABA1A] my-2"
          // variant="outline"
        >
          Add to cart
        </Button>
        <Button
          onClick={handleClick}
          className="text-[#1ABA1A] my-2"
          // variant="outline"
        >
          Detail product
        </Button>
      </div>
    </div>
  );
};

export default ProductCards;
