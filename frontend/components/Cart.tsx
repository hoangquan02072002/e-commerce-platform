"use client";

import Image, { StaticImageData } from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface Props {
  Imagesrc: StaticImageData;
  name: string;
  description?: string;
  price?: number;
  stock?: string;
  button: string;
  id: number;
}

const Cart: React.FC<Props> = ({
  Imagesrc,
  name,
  price,
  stock,
  description,
  button,
  id,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products/${id}`);
    console.log("id", id);
  };
  return (
    <div className="w-[224px] h-[500px] ml-4">
      <Image
        className="pt-4"
        src={Imagesrc}
        alt="product"
        width={230}
        height={250}
        objectFit="cover"
      />

      <div className="ml-4">
        <h3 className="mt-3 text-base font-bold">{name}</h3>
        <p className="my-2 text-base font-bold">${price}</p>
        <p className="my-2 text-base">{description}</p>
        <Button
          onClick={handleClick}
          className="text-[#1ABA1A] my-2"
          variant="outline"
        >
          {button}
        </Button>
        <p className="text-gray-600">{stock}</p>
      </div>
    </div>
  );
};

export default Cart;
