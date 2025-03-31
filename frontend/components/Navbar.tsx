"use client";
import React, { useEffect, useState } from "react";
import logo from "../public/logo.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Image from "next/image";
import { RiLoginBoxFill } from "react-icons/ri";
import { FaRegistered } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { AiFillProfile } from "react-icons/ai";
import { Input } from "./ui/input";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "@/redux/cart/cartSlice";
import { FaExclamationCircle } from "react-icons/fa";
import { AppDispatch, RootState } from "@/redux/store";
import { logout } from "@/redux/user/loginSlice";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}
interface NavbarProps {
  // searchTerm: string;
  // setSearchTerm: (term: string) => void;
  // onSearch: () => void;
  onCategoryClick: (category: string) => void;
}
const Navbar: React.FC<NavbarProps> = ({
  // searchTerm,
  // setSearchTerm,
  // onSearch,
  onCategoryClick,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch<AppDispatch>();
  const user_info = useSelector(
    (state: RootState) => state.userLogin.user?.user
  );
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);
  console.log("uan", categories);
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="ml-4">
      {/* navbar1  */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="w-24 bg-[#EBEEF6] py-2 text-xs rounded-lg text-center">
            Hotline 24/7
          </div>
          <span className="pl-3 text-xs font-bold">8968 476 5358</span>
        </div>
        <div className="flex py-2 mr-6">
          <div className="flex mt-4">
            <div className="px-3 text-xs">Sell on SWoo</div>
            <div className="text-xs">Order Tracki</div>
          </div>

          <div className="flex">
            <div className="mx-4">
              <Select>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="USD" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="ENG" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* navbar2 */}
      <div className="flex justify-between items-center">
        <div className="flex">
          <div className="mr-10">
            <Image src={logo} width={161} height={50} alt="logo" />
          </div>
          <div className="flex mt-3">
            <Link href="/" className="px-6 text-base font-bold">
              Home
            </Link>
            <Link href="/about" className="text-base font-bold">
              About
            </Link>
            <Link href="/products" className="px-6 text-base font-bold">
              Product
            </Link>
            <Link href="/contact" className="text-base font-bold">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex justify-center items-center mt-3 mr-14">
          {user_info ? (
            <div className="flex justify-center items-center">
              <Select>
                <SelectTrigger className="w-[180px] bg-red-600 text-white">
                  <SelectValue placeholder={user_info?.email} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>
                      <button onClick={handleLogout} className="px-3 text-base">
                        Logout
                      </button>
                    </SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Link href="profile" className="px-3 text-base">
                <div className="flex px-8">
                  <AiFillProfile className="w-[30px] h-[30px] rounded-sm" />
                  Profile
                </div>
              </Link>
              <div className="flex gap-2 justify-center items-center">
                {cartItems.length > 0 && (
                  // <FaExclamationCircle className="relative right-5 bg-red-500" />
                  <div className="relative">
                    <FaExclamationCircle className="absolute right-[-20px] top-1 text-white bg-red-500 rounded-full" />
                  </div>
                )}
                <div>
                  <Link href="/cart" className="text-base">
                    <div className="flex gap-2 justify-center items-center">
                      <FaCartArrowDown className="w-[30px] h-[30px] rounded-sm" />
                      <span className="">Cart</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex gap-3 justify-center items-center">
              <Link href="/login" className="text-base">
                <div className="flex gap-2 justify-center items-center">
                  <RiLoginBoxFill className="w-[30px] h-[30px] rounded-sm" />
                  <span className="text-base">Login</span>
                </div>
              </Link>
              <Link href="register" className="text-base">
                <div className="flex gap-2 justify-center items-center">
                  <FaRegistered className="w-[30px] h-[30px] rounded-sm" />
                  <span className="text-base">Register</span>
                </div>
              </Link>
              <div className="flex gap-2 justify-center items-center">
                {cartItems.length > 0 && (
                  // <FaExclamationCircle className="relative right-5 bg-red-500" />
                  <div className="relative">
                    <FaExclamationCircle className="absolute right-[-20px] top-1 text-white bg-red-500 rounded-full" />
                  </div>
                )}
                <div>
                  <Link href="/cart" className="text-base">
                    <div className="flex gap-2 justify-center items-center">
                      <FaCartArrowDown className="w-[30px] h-[30px] rounded-sm" />
                      <span className="">Cart</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {/* <div className="flex px-3">
            <RiLoginBoxFill className="w-[30px] h-[30px] rounded-sm" />
            <Link href="/login" className="px-3 text-base">
              Login
            </Link>
          </div>
          <div className="flex px-8">
            <FaRegistered className="w-[30px] h-[30px] rounded-sm" />
            <Link href="register" className="px-3 text-base">
              Register
            </Link>
          </div> */}
          {/* <div className="flex ml-10">
            {cartItems.length > 0 && (
              // <FaExclamationCircle className="relative right-5 bg-red-500" />
              <div className="relative">
                <FaExclamationCircle className="absolute right-[-65px] top-11 text-white bg-red-500 rounded-full" />
              </div>
            )}
            <div>
              <Link href="/cart" className="px-3 text-base">
                <div className="flex items-center px-8">
                  <FaCartArrowDown className="w-[30px] h-[30px] rounded-sm" />
                  <span className="ml-2">Cart</span>
                </div>
              </Link>
            </div>
          </div> */}
          {/* <Link href="profile" className="px-3 text-base">
            <div className="flex px-8">
              <AiFillProfile className="w-[30px] h-[30px] rounded-sm" />
              Profile
            </div>
          </Link> */}
        </div>
      </div>
      {/* navbar 3 */}
      <div className="bg-[#1ABA1A] flex justify-around py-6 rounded-xl mt-4">
        <div className="flex rounded-3xl bg-[#FFFFFF]">
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectGroup key={category.id}>
                    <SelectItem value={category.name}>
                      {category.name}
                    </SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Input
              type="text"
              placeholder="Search anything..."
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="mx-7" />
          </div>
        </div>
        <div>free shipping over $199</div>
        <div>30 days money back</div>
        <div>100% secure payment</div>
      </div>
    </div>
  );
};
// header

{
  /* <div className="flex flex-col px-8 py-5 w-full bg-white rounded-xl max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-5 justify-between w-full text-black max-md:max-w-full">
        <div className="flex gap-5 text-xs">
          <div className="px-6 py-2.5 bg-violet-100 rounded-md max-md:pl-5">
            Hotline 24/7
          </div>
          <div className="my-auto font-bold basis-auto">(025) 3886 25 16</div>
        </div>
        <div className="flex gap-2.5 items-center self-start">
          <div className="self-stretch my-auto text-sm grow">
            Sell on Swoo
          </div>
          <div className="self-stretch my-auto text-sm">Order Tracki</div>
          <div className="flex gap-3.5 self-stretch px-5 py-1.5 border-r border-neutral-400 border-opacity-60">
            <div className="text-sm"> USD </div>
            <div className="self-start text-xs font-black leading-none">

            </div>
          </div>
          <div className="flex gap-1 self-start mt-1.5 text-sm">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/633837e6e503dcde6bf7b0241a7ea5c70a30432a92ba6b1a6d00a85a235e677e?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
              className="object-contain shrink-0 aspect-square w-[15px]"
              alt=""
            />
            <div> Eng </div>
          </div>
          <div className="self-stretch my-auto text-xs font-black leading-none">

          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-5 justify-between mt-8 w-full max-md:max-w-full">
        <div className="flex gap-8 items-center self-start text-black uppercase max-md:max-w-full">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c21b8cfe5461cee589a3946b547fab08cb069dc629b4754835f303bda5558c09?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
            className="object-contain shrink-0 self-stretch max-w-full aspect-[4.03] w-[161px]"
            alt="Company logo"
          />
          <div className="flex gap-2 self-stretch my-auto">
            <div className="text-sm font-bold">Homes </div>
            <div className="my-auto text-xs font-black leading-none"></div>
          </div>
          <div className="flex gap-2 self-stretch my-auto">
            <div className="text-sm font-bold">Pages </div>
            <div className="my-auto text-xs font-black leading-none"></div>
          </div>
          <div className="flex gap-2 self-stretch my-auto">
            <div className="text-sm font-bold grow">Products </div>
            <div className="my-auto text-xs font-black leading-none"></div>
          </div>
          <div className="self-stretch my-auto text-sm font-bold">
            Contact
          </div>
        </div>
        <div className="flex gap-9">
          <div className="flex flex-auto gap-3.5 self-start text-black uppercase">
            <div className="flex w-10 h-10 bg-violet-100 rounded-3xl shrink-0" />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd80928cc314859f0ffc20b65a40df149324b3115ffdfc91ab4668052f83957c?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
              className="object-contain w-10 rounded-3xl shrink-0 aspect-square"
              alt="User avatar"
            />
            <div className="flex w-10 h-10 bg-violet-100 rounded-3xl shrink-0" />
            <div className="flex flex-col my-auto">
              <div className="self-start text-xs">welcome</div>
              <div className="mt-2.5 text-sm font-bold">
                log in / Register
              </div>
            </div>
          </div>
          <div className="flex gap-3 whitespace-nowrap">
            <div className="flex flex-col items-center px-2.5 pt-6 text-xs leading-loose text-center text-black bg-violet-100 rounded-3xl h-[45px] w-[45px]">
              <div className="px-1.5 w-5 h-5 bg-green-600 rounded-xl">5</div>
            </div>
            <div className="flex flex-col my-auto text-black uppercase">
              <div className="self-start text-xs">cart</div>
              <div className="mt-2.5 text-sm font-bold">$1,689.00</div>
            </div>
          </div>
        </div>
      </div>
    </div> */
}

// navbar
// <div className="flex flex-wrap gap-10 px-10 py-4 w-full bg-green-600 rounded-xl max-md:px-5 max-md:max-w-full">
//   <div className="flex flex-wrap flex-auto">
//     <div className="flex gap-8 px-3 py-4 text-sm font-bold text-black bg-white rounded">
//       <div>All Categories</div>
//       <img
//         loading="lazy"
//         src="https://cdn.builder.io/api/v1/image/assets/TEMP/82e401cec80ea1d484263949286f19795514b2dd8643b988355edda9cf43d6f3?placeholderIfAbsent=true&apiKey=dfc6300964eb4cd79769d82dbaf65b6d"
//         className="object-contain self-start w-3 shrink-0 aspect-square"
//         alt="Dropdown icon"
//       />
//     </div>
//     <div className="flex flex-auto gap-10 px-3 py-4 bg-white">
//       <div className="text-sm text-black">Search anything...</div>
//       <div className="text-sm font-black leading-none text-center text-black"></div>
//     </div>
//   </div>
//   <div className="flex flex-wrap flex-auto gap-10 my-auto text-sm font-medium text-center text-black uppercase max-md:max-w-full">
//     <div className="basis-auto">free shipping over $199</div>
//     <div className="basis-auto">30 days money back</div>
//     <div className="basis-auto">100% secure payment</div>
//   </div>
// </div>

export default Navbar;
