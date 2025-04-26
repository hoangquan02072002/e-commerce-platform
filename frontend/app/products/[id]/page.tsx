"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { FcMinus } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BsThreadsFill } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface ProductDetail {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  stock: number;
  category: Category;
}

interface ProductPageProps {
  params: { id: number };
}
const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
        setTotalPrice(Number(response.data.price));
      } catch (error) {
        console.error("Failed to fetch products");
      }
    };
    fetchProduct();
  }, [id]);

  const handleIncrease = () => {
    setCount(count + 1);
    setTotalPrice((prevTotalPrice) =>
      Number(
        (prevTotalPrice + (product ? Number(product.price) : 0)).toFixed(2)
      )
    );
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
      setTotalPrice((prevTotalPrice) =>
        Number(
          (prevTotalPrice - (product ? Number(product.price) : 0)).toFixed(2)
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-xl md:p-6 lg:p-8">
      {/* Product Image and Details */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <div className="overflow-hidden relative rounded-lg aspect-square">
            <Image
              src={product?.image || "/path/to/default/image.jpg"}
              alt={product?.name || "Default Product Name"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 w-full lg:w-1/2">
          <div className="space-y-1">
            <div className="text-xs text-gray-500">(5)</div>
            <h1 className="text-xl font-bold md:text-2xl">{product?.name}</h1>
            <div className="text-base text-gray-600 md:text-lg">
              {product?.category.name}
            </div>
            <div className="text-2xl font-semibold text-green-600 md:text-3xl">
              {product?.price} RUB
            </div>
          </div>

          <div className="text-sm text-gray-600">{product?.description}</div>

          <div className="flex flex-wrap gap-2">
            <Button className="px-3 py-1.5 text-xs font-bold text-red-600 bg-green-100 rounded-md">
              FREE SHIPPING
            </Button>
            <Button className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-100 rounded-md">
              FREE GIFT
            </Button>
          </div>

          {/* Promotion Banner */}
          <div className="p-3 bg-green-50 rounded-xl">
            <p className="text-xs italic font-bold text-center">
              Promotion will expires in: 9h00pm, 25/5/2024
            </p>
          </div>
        </div>
      </div>

      {/* Price and Actions */}
      <div className="flex flex-col gap-4">
        <div className="p-4 space-y-3 bg-gray-50 rounded-xl">
          <div className="space-y-1">
            <div className="text-xs text-gray-600 uppercase">Total Price:</div>
            <div className="text-2xl font-bold md:text-3xl">
              {totalPrice} RUB
            </div>
            <div className="flex gap-2 items-center pb-3 text-xs text-gray-600 border-b">
              <span className="font-bold text-red-600">$49/m</span>
              <span>in 12 months.</span>
              <span className="text-blue-600 underline">See more</span>
            </div>
          </div>

          <div className="flex gap-2 items-center text-xs">
            <span>In stock: {product?.stock}</span>
          </div>

          {/* Quantity Selector */}
          <div className="flex gap-3 justify-center items-center p-3 bg-white rounded-xl border">
            <Button
              onClick={handleDecrease}
              variant="outline"
              className="p-0 w-8 h-8"
            >
              <FcMinus className="w-4 h-4" />
            </Button>
            <div className="text-lg font-bold">{count}</div>
            <Button
              onClick={handleIncrease}
              variant="outline"
              className="p-0 w-8 h-8"
            >
              <FaPlus className="w-4 h-4" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2">
            <Button className="py-2 w-full text-xs font-medium text-white uppercase bg-green-500 rounded-xl">
              Add To Cart
            </Button>
            <Button className="py-2 w-full text-xs font-medium text-white uppercase bg-yellow-500 rounded-xl">
              BUY WITH Paypal <FaCcPaypal className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Additional Actions */}
          <div className="flex justify-between items-center pt-3 text-xs text-gray-600 border-t">
            <span>Wishlist added</span>
            <span>Compare</span>
          </div>
        </div>

        {/* Quick Order */}
        <div className="p-4 space-y-3 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="inline-block px-3 py-1.5 text-xs uppercase bg-gray-800 text-white rounded-lg">
              Quick Order 24/7
            </div>
            <div className="mt-2 text-xl font-bold">(025) 3886 25 16</div>
          </div>
          <div className="text-xs text-gray-600">
            <span>Ships from </span>
            <span className="font-bold">United States</span>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="flex gap-3 justify-center">
        <div className="flex gap-2">
          <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <FaTwitter className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <FaFacebook className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <FaInstagramSquare className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <FaYoutube className="w-4 h-4 text-gray-600" />
          </div>
          <div className="flex justify-center items-center w-8 h-8 bg-gray-200 rounded-full">
            <BsThreadsFill className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
