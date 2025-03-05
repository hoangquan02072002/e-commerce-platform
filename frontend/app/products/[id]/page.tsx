"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect } from "react";
import ProductDetail from "../../../public/productdetail.png";
import { Button } from "@/components/ui/button";
import ProductDetail1 from "../../../public/productdetail1.png";
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
        console.log(response.data);
      } catch (err) {
        console.log("Failed to fetch products");
      }
    };
    // if (id) {
    fetchProduct();
    // }
  }, [id]);
  console.log("product", product);
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
    <div
      className={`flex flex-col gap-y-5 w-full bg-white rounded-[10px] p-[30px] tracking-[0px]`}
    >
      <div className="font-inter flex flex-grow flex-wrap items-center justify-center gap-x-[30px] gap-y-[30px] min-[1350px]:flex-nowrap">
        <div className="flex flex-col flex-grow gap-y-5 self-stretch">
          <div className="flex flex-grow flex-wrap justify-center gap-x-[30px] gap-y-[30px] min-[1350px]:flex-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-full h-full overflow-clip">
                <div className="flex flex-wrap gap-y-3 gap-x-96 justify-end items-center max-w-full max-h-full">
                  <div className="rounded-[5px] w-[524px] h-[550px] px-2 pb-[4.5px] pt-[3.5px] text-center text-[10px] uppercase leading-[15px] text-white">
                    <Image
                      src={product?.image || "/path/to/default/image.jpg"}
                      alt={product?.name || "Default Product Name"}
                      width={500}
                      height={550}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-grow flex-col items-start gap-y-[4.4px] [max-width:413px]">
              <div className="px-[70px] text-[13px] leading-5 text-[dimgray]">
                (5)
              </div>
              <div className="w-96 font-bold leading-[19px]">
                <span>
                  <p>{product?.name}</p>
                  <p>{product?.category.name}</p>
                </span>
              </div>
              <div className="flex items-end pt-4">
                <div className="text-[22px] font-semibold leading-[26px]">
                  {product?.price} RUB
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-2 pt-2.5 min-[1350px]:flex-nowrap">
                <div className="text-xs leading-[22px]">
                  <div>
                    <span className="whitespace-pre-wrap">
                      {product?.description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-x-[8.9px] gap-y-[8.9px] pt-4 min-[1350px]:flex-nowrap">
                <Button className="P-3 text-red-600 font-bold rounded-md bg-[#32cd320c]">
                  FREE SHIPPING
                </Button>
                <Button className=" P-3 rounded-md text-red-600 font-bold bg-[#ff00000c]">
                  FREE GIFT
                </Button>
              </div>
              {/* <div className="flex flex-col justify-end items-center pt-4">
                <div className="flex flex-col items-start justify-center gap-y-2.5 border-y border-solid border-x-[lightgray] border-y-[lightgray] pb-6 pr-2.5 pt-5">
                  <div className="flex h-6 flex-shrink-0 flex-wrap items-center gap-x-[3.6px] gap-y-[3.6px] text-sm leading-6 min-[1350px]:flex-nowrap">
                    <div className="mt-[0.2px] flex h-6 flex-col items-center pb-[0.8px]">
                      <div className="font-bold uppercase">Color:</div>
                    </div>
                    <div className="text-[dimgray]">Midnight Blue</div>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2.5 text-xs leading-[14px] min-[1350px]:flex-nowrap">
                    <div className="flex gap-7 justify-center items-center">
                      <div className="flex justify-center items-center">
                        <Image
                          src={ProductDetail1}
                          alt="ProductDetail"
                          width={46}
                          height={35}
                        />
                        <div>
                          <div className="text-sm">Midnight Blue</div>
                          <div className="text-sm font-bold">$569.00</div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <Image
                          src={ProductDetail1}
                          alt="ProductDetail"
                          width={46}
                          height={35}
                        />
                        <div>
                          <div className="text-sm">Midnight Blue</div>
                          <div className="text-sm font-bold">$569.00</div>
                        </div>
                      </div>

                      <div className="flex justify-center items-center">
                        <Image
                          src={ProductDetail1}
                          alt="ProductDetail"
                          width={46}
                          height={35}
                        />
                        <div>
                          <div className="text-sm">Midnight Blue</div>
                          <div className="text-sm font-bold">$569.00</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex h-[34px] flex-shrink-0 flex-wrap items-center gap-x-[3.6px] gap-y-[3.6px] pt-2.5 text-sm leading-6 min-[1350px]:flex-nowrap">
                    <div className="mt-[0.2px] flex flex-col items-center pb-[0.8px]">
                      <div className="font-bold uppercase">Memory size:</div>
                    </div>
                    <div className="text-[dimgray]">128GB</div>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-1 gap-y-1 pt-[3px] text-center text-xs font-bold leading-[18px] min-[1350px]:flex-nowrap">
                    <div className="flex items-center justify-center rounded-lg border border-solid border-x-[lightgray] border-y-[lightgray] px-[15px] py-[7.5px]">
                      <div className="text-center">64GB</div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg border border-solid border-x-[limegreen] border-y-[limegreen] py-[7.5px] pl-[15px] pr-3.5">
                      <div className="text-center">128GB</div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg border border-solid border-x-[lightgray] border-y-[lightgray] py-[7.5px] pl-[15px] pr-3.5">
                      <div className="text-center">256GB</div>
                    </div>
                    <div className="flex items-center justify-center rounded-lg border border-solid border-x-[lightgray] border-y-[lightgray] py-[7.5px] pl-[15px] pr-3.5">
                      <div className="text-center">512GB</div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div className="pt-4">
                <div className=" rounded-[10px] bg-green-50 p-9 ">
                  <div className="text-xs italic font-bold leading-5 text-center">
                    Promotion will expires in: 9h00pm, 25/5/2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-2.5">
          <div className="flex flex-col items-start justify-center rounded-[10px] bg-[ghostwhite] px-[30px] pb-[30px] pt-8">
            <div className="text-xs uppercase leading-[18px] text-[dimgray]">
              Total Price:
            </div>
            <div className="flex items-end pt-2">
              <div className="text-3xl font-bold leading-9">
                {totalPrice} RUB
              </div>
            </div>
            <div className="flex items-end gap-x-[3.6px] border-b border-solid border-gray-200 py-4 pr-[9.2px] text-xs leading-3">
              <div className="w-[51px] flex-shrink-0 font-bold text-[crimson]">
                $49/m
              </div>
              <div className="flex flex-col items-center pb-[0.5px]">
                <span>
                  in 12 months.
                  <span className="text-[royalblue] underline">See more</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-[3.7px] pt-[15px] text-xs">
              <div className="leading-5">
                <span className="whitespace-pre-wrap">
                  {" In stock"}: {product?.stock}
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-end items-center pt-5">
              <div className="flex items-center justify-center gap-x-20 rounded-[10px] border border-solid border-neutral-400/20 bg-white px-5 pb-[15px] pt-3.5 text-sm">
                <Button
                  onClick={handleDecrease}
                  variant="outline"
                  className="font-font-awesome-5pro font-black leading-[14px]"
                >
                  <FcMinus />
                </Button>
                <div className="flex flex-col items-center pt-px">
                  <div className="font-bold leading-[21px]">{count}</div>
                </div>
                <Button
                  onClick={handleIncrease}
                  variant="outline"
                  className="font-font-awesome-5pro font-black leading-[14px]"
                >
                  <FaPlus />
                </Button>
              </div>
            </div>
            <div className="pt-3 m-auto">
              <Button className="rounded-[10px] bg-[limegreen] px-20 py-4 text-center text-xs font-medium uppercase leading-[18px] text-white">
                Add To Cart
              </Button>
            </div>
            <div className="m-auto pt-2.5 ">
              <Button className="text-xs font-medium uppercase leading-[18px] bg-yellow-500">
                BUY WITH Paypal <FaCcPaypal className="w-44" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-x-6 border-b border-solid border-gray-200 pb-4 pr-[5.5px] pt-[15px] text-[13px] leading-5 text-[dimgray]">
              <div className="flex flex-col items-center pt-[0.5px]">
                <div className="flex items-center gap-x-[3.7px] border-r border-solid border-gray-200 pb-[0.75px] pr-6">
                  <div>
                    <span className="whitespace-pre-wrap">
                      {" Wishlist added"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-x-[3.7px]">
                <div className="flex flex-col items-center pb-px">
                  <div>
                    <span className="whitespace-pre-wrap">{" Compare"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-[15px]">
            <div className="flex flex-col items-center justify-center gap-y-4 rounded-[10px] bg-[ghostwhite] p-7">
              <div className="rounded-lg bg-neutral-800 p-4 text-center text-xs leading-[18px] text-white">
                Quick Order 24/7
              </div>
              <div className="text-[22px] font-bold leading-[26px]">
                (025) 3886 25 16
              </div>
            </div>
            <div className="flex gap-x-3 items-center text-sm">
              <div className="leading-6">
                <span>
                  <span className="text-[dimgray]">{"Ships from "}</span>
                  <span className="font-bold">United States</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="flex justify-end items-center pl-16">
          <div className="font-font-awesome-5brands flex items-center justify-center gap-x-3.5 text-sm leading-[14px]">
            <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-full bg-gray-200 p-[13px]">
              <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center">
                <FaTwitter />
              </div>
            </div>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 py-[13px] pl-4 pr-[15px] text-center">
              <FaFacebook />
            </div>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 px-3.5 py-[13px] text-center">
              <FaInstagramSquare />
            </div>
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 px-3 py-[13px] text-center">
              <FaYoutube />
            </div>
            <div className="flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-full bg-gray-200 p-[13px]">
              <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center">
                <BsThreadsFill />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
