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
  onCategoryClick: (category: string) => void;
  selectedCategory: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onCategoryClick,
  selectedCategory,
  searchTerm,
  setSearchTerm,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch<AppDispatch>();
  const user_info = useSelector(
    (state: RootState) => state.userLogin.user?.user_info.user
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const getAllOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/getorder";
  };
  const getAllUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = "/getuser";
  };

  return (
    <div className="p-4 md:p-6">
      {/* Top Bar */}
      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <div className="flex gap-2 items-center">
          <div className="bg-[#EBEEF6] py-2 px-4 text-xs rounded-lg text-center">
            Hotline 24/7
          </div>
          <span className="text-xs font-bold">8968 476 5358</span>
        </div>
        <div className="flex gap-4 items-center">
          <div className="hidden gap-4 md:flex">
            <div className="text-xs">Sell on SWoo</div>
            <div className="text-xs">Order Tracking</div>
          </div>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="USD" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Currency</SelectLabel>
                  <SelectItem value="usd">USD</SelectItem>
                  <SelectItem value="eur">EUR</SelectItem>
                  <SelectItem value="gbp">GBP</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-24">
                <SelectValue placeholder="ENG" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Language</SelectLabel>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Image
            src={logo}
            width={161}
            height={50}
            alt="logo"
            className="w-auto h-8 md:h-12"
          />
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg menu-button md:hidden hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden gap-6 md:flex">
          <Link href="/" className="text-base font-bold hover:text-[#1ABA1A]">
            Home
          </Link>
          <Link
            href="/about"
            className="text-base font-bold hover:text-[#1ABA1A]"
          >
            About
          </Link>
          <Link
            href="/products"
            className="text-base font-bold hover:text-[#1ABA1A]"
          >
            Product
          </Link>
          <Link
            href="/contact"
            className="text-base font-bold hover:text-[#1ABA1A]"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu ${
            isMenuOpen ? "block" : "hidden"
          } md:hidden absolute top-24 right-4 w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg z-50`}
        >
          <div className="p-4 space-y-4">
            <Link
              href="/"
              className="block text-base font-bold hover:text-[#1ABA1A]"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block text-base font-bold hover:text-[#1ABA1A]"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/products"
              className="block text-base font-bold hover:text-[#1ABA1A]"
              onClick={() => setIsMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="/contact"
              className="block text-base font-bold hover:text-[#1ABA1A]"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="my-2 border-t border-gray-200"></div>
            {user_info?.role === "user" ? (
              <>
                <Link
                  href="/profile"
                  className="flex gap-2 items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <AiFillProfile className="w-6 h-6" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : user_info?.role === "admin" ? (
              <>
                <button
                  onClick={() => {
                    getAllOrder(new MouseEvent("click") as any);
                    setIsMenuOpen(false);
                  }}
                  className="text-left"
                >
                  All Orders
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex gap-2 items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <RiLoginBoxFill className="w-6 h-6" />
                  <span>Login</span>
                </Link>
                <Link
                  href="/register"
                  className="flex gap-2 items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaRegistered className="w-6 h-6" />
                  <span>Register</span>
                </Link>
              </>
            )}
            <Link
              href="/cart"
              className="flex relative gap-2 items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {cartItems.length > 0 && (
                <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
              )}
              <FaCartArrowDown className="w-6 h-6" />
              <span>Cart ({cartItems.length})</span>
            </Link>
          </div>
        </div>

        {/* Desktop User Actions */}
        <div className="hidden gap-4 items-center md:flex">
          {user_info?.role === "user" ? (
            <div className="flex gap-4 items-center">
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
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Link href="/profile" className="flex gap-2 items-center">
                <AiFillProfile className="w-6 h-6" />
                <span>Profile</span>
              </Link>
              <Link href="/cart" className="relative">
                {cartItems.length > 0 && (
                  <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
                )}
                <div className="flex gap-2 items-center">
                  <FaCartArrowDown className="w-6 h-6" />
                  <span>Cart ({cartItems.length})</span>
                </div>
              </Link>
            </div>
          ) : user_info?.role === "admin" ? (
            <div className="flex gap-4 items-center">
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
                    <SelectLabel>
                      <button onClick={getAllOrder} className="px-3 text-base">
                        All Orders
                      </button>
                    </SelectLabel>
                    <SelectLabel>
                      <button onClick={getAllUser} className="px-3 text-base">
                        All Users
                      </button>
                    </SelectLabel>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <Link href="/login" className="flex gap-2 items-center">
                <RiLoginBoxFill className="w-6 h-6" />
                <span>Login</span>
              </Link>
              <Link href="/register" className="flex gap-2 items-center">
                <FaRegistered className="w-6 h-6" />
                <span>Register</span>
              </Link>
              <Link href="/cart" className="relative">
                {cartItems.length > 0 && (
                  <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
                )}
                <div className="flex gap-2 items-center">
                  <FaCartArrowDown className="w-6 h-6" />
                  <span>Cart ({cartItems.length})</span>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-[#1ABA1A] p-4 rounded-xl">
        <div className="flex flex-col gap-4 justify-between items-center md:flex-row">
          <div className="flex flex-col gap-4 items-center w-full md:flex-row md:w-auto">
            <Select onValueChange={onCategoryClick} value={selectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
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
            <div className="flex items-center w-full md:w-auto">
              <Input
                type="text"
                placeholder="Search anything..."
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="ml-4 text-white" />
            </div>
          </div>
          <div className="hidden gap-6 text-white md:flex">
            <div>free shipping over $199</div>
            <div>30 days money back</div>
            <div>100% secure payment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// "use client";
// import React, { useEffect, useState } from "react";
// import logo from "../public/logo.png";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import Image from "next/image";
// import { RiLoginBoxFill } from "react-icons/ri";
// import { FaRegistered } from "react-icons/fa";
// import { FaCartArrowDown } from "react-icons/fa";
// import { AiFillProfile } from "react-icons/ai";
// import { Input } from "./ui/input";
// import { FaSearch } from "react-icons/fa";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { selectCartItems } from "@/redux/cart/cartSlice";
// import { FaExclamationCircle } from "react-icons/fa";
// import { AppDispatch, RootState } from "@/redux/store";
// import { logout } from "@/redux/user/loginSlice";
// import axios from "axios";

// interface Category {
//   id: number;
//   name: string;
// }

// interface NavbarProps {
//   onCategoryClick: (category: string) => void;
//   selectedCategory?: string;
//   searchTerm?: string;
//   setSearchTerm?: (term: string) => void;
// }

// const Navbar: React.FC<NavbarProps> = ({
//   onCategoryClick,
//   selectedCategory = "",
//   searchTerm = "",
//   setSearchTerm = () => {},
// }) => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const cartItems = useSelector(selectCartItems);
//   const dispatch = useDispatch<AppDispatch>();
//   const user_info = useSelector(
//     (state: RootState) => state.userLogin.user?.user_info.user
//   );
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

//   // Handle search term changes
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newTerm = e.target.value;
//     setLocalSearchTerm(newTerm);
//     setSearchTerm(newTerm);
//   };

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;
//       if (!target.closest(".mobile-menu") && !target.closest(".menu-button")) {
//         setIsMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/categories");
//         setCategories(response.data);
//       } catch (error) {
//         console.error("Failed to fetch categories", error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Update local search term when prop changes
//   useEffect(() => {
//     setLocalSearchTerm(searchTerm);
//   }, [searchTerm]);

//   const handleLogout = () => {
//     dispatch(logout());
//     window.location.href = "/";
//   };

//   const navigateTo = (path: string) => {
//     window.location.href = path;
//   };

//   return (
//     <div className="p-4 md:p-6">
//       {/* Top Bar */}
//       <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
//         <div className="flex gap-2 items-center">
//           <div className="bg-[#EBEEF6] py-2 px-4 text-xs rounded-lg text-center">
//             Hotline 24/7
//           </div>
//           <span className="text-xs font-bold">8968 476 5358</span>
//         </div>
//         <div className="flex gap-4 items-center">
//           <div className="hidden gap-4 md:flex">
//             <div className="text-xs">Sell on SWoo</div>
//             <div className="text-xs">Order Tracking</div>
//           </div>
//           <div className="flex gap-2">
//             <Select>
//               <SelectTrigger className="w-24">
//                 <SelectValue placeholder="USD" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Currency</SelectLabel>
//                   <SelectItem value="usd">USD</SelectItem>
//                   <SelectItem value="eur">EUR</SelectItem>
//                   <SelectItem value="gbp">GBP</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             <Select>
//               <SelectTrigger className="w-24">
//                 <SelectValue placeholder="ENG" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectLabel>Language</SelectLabel>
//                   <SelectItem value="en">English</SelectItem>
//                   <SelectItem value="es">Spanish</SelectItem>
//                   <SelectItem value="fr">French</SelectItem>
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="flex flex-col gap-4 justify-between items-center mb-4 md:flex-row">
//         <div className="flex justify-between items-center w-full md:w-auto">
//           <Link href="/">
//             <Image
//               src={logo}
//               width={161}
//               height={50}
//               alt="logo"
//               className="w-auto h-8 md:h-12"
//             />
//           </Link>
//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="p-2 rounded-lg menu-button md:hidden hover:bg-gray-100"
//             aria-label="Toggle menu"
//             aria-expanded={isMenuOpen}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               {isMenuOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="hidden gap-6 md:flex">
//           <Link href="/" className="text-base font-bold hover:text-[#1ABA1A]">
//             Home
//           </Link>
//           <Link
//             href="/about"
//             className="text-base font-bold hover:text-[#1ABA1A]"
//           >
//             About
//           </Link>
//           <Link
//             href="/products"
//             className="text-base font-bold hover:text-[#1ABA1A]"
//           >
//             Product
//           </Link>
//           <Link
//             href="/contact"
//             className="text-base font-bold hover:text-[#1ABA1A]"
//           >
//             Contact
//           </Link>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`mobile-menu ${
//             isMenuOpen ? "block" : "hidden"
//           } md:hidden absolute top-24 right-4 w-[calc(100%-2rem)] bg-white rounded-lg shadow-lg z-50`}
//           aria-hidden={!isMenuOpen}
//         >
//           <div className="p-4 space-y-4">
//             <Link
//               href="/"
//               className="block text-base font-bold hover:text-[#1ABA1A]"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Home
//             </Link>
//             <Link
//               href="/about"
//               className="block text-base font-bold hover:text-[#1ABA1A]"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               About
//             </Link>
//             <Link
//               href="/products"
//               className="block text-base font-bold hover:text-[#1ABA1A]"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Product
//             </Link>
//             <Link
//               href="/contact"
//               className="block text-base font-bold hover:text-[#1ABA1A]"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               Contact
//             </Link>
//             <div className="my-2 border-t border-gray-200"></div>
//             {user_info?.role === "user" ? (
//               <>
//                 <Link
//                   href="/profile"
//                   className="flex gap-2 items-center"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <AiFillProfile className="w-6 h-6" />
//                   <span>Profile</span>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-left text-red-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : user_info?.role === "admin" ? (
//               <>
//                 <button
//                   onClick={() => {
//                     navigateTo("/getorder");
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-left"
//                 >
//                   All Orders
//                 </button>
//                 <button
//                   onClick={() => {
//                     navigateTo("/getuser");
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-left"
//                 >
//                   All Users
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="text-left text-red-600"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   href="/login"
//                   className="flex gap-2 items-center"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <RiLoginBoxFill className="w-6 h-6" />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="flex gap-2 items-center"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <FaRegistered className="w-6 h-6" />
//                   <span>Register</span>
//                 </Link>
//               </>
//             )}
//             <Link
//               href="/cart"
//               className="flex relative gap-2 items-center"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {cartItems.length > 0 && (
//                 <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
//               )}
//               <FaCartArrowDown className="w-6 h-6" />
//               <span>Cart ({cartItems.length})</span>
//             </Link>
//           </div>
//         </div>

//         {/* Desktop User Actions */}
//         <div className="hidden gap-4 items-center md:flex">
//           {user_info?.role === "user" ? (
//             <div className="flex gap-4 items-center">
//               <Select>
//                 <SelectTrigger className="w-[180px] bg-red-600 text-white">
//                   <SelectValue placeholder={user_info?.email} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>
//                       <button onClick={handleLogout} className="px-3 text-base">
//                         Logout
//                       </button>
//                     </SelectLabel>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//               <Link href="/profile" className="flex gap-2 items-center">
//                 <AiFillProfile className="w-6 h-6" />
//                 <span>Profile</span>
//               </Link>
//               <Link href="/cart" className="relative">
//                 {cartItems.length > 0 && (
//                   <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
//                 )}
//                 <div className="flex gap-2 items-center">
//                   <FaCartArrowDown className="w-6 h-6" />
//                   <span>Cart ({cartItems.length})</span>
//                 </div>
//               </Link>
//             </div>
//           ) : user_info?.role === "admin" ? (
//             <div className="flex gap-4 items-center">
//               <Select>
//                 <SelectTrigger className="w-[180px] bg-red-600 text-white">
//                   <SelectValue placeholder={user_info?.email} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>
//                       <button onClick={handleLogout} className="px-3 text-base">
//                         Logout
//                       </button>
//                     </SelectLabel>
//                     <SelectLabel>
//                       <button
//                         onClick={() => navigateTo("/getorder")}
//                         className="px-3 text-base"
//                       >
//                         All Orders
//                       </button>
//                     </SelectLabel>
//                     <SelectLabel>
//                       <button
//                         onClick={() => navigateTo("/getuser")}
//                         className="px-3 text-base"
//                       >
//                         All Users
//                       </button>
//                     </SelectLabel>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           ) : (
//             <div className="flex gap-4 items-center">
//               <Link href="/login" className="flex gap-2 items-center">
//                 <RiLoginBoxFill className="w-6 h-6" />
//                 <span>Login</span>
//               </Link>
//               <Link href="/register" className="flex gap-2 items-center">
//                 <FaRegistered className="w-6 h-6" />
//                 <span>Register</span>
//               </Link>
//               <Link href="/cart" className="relative">
//                 {cartItems.length > 0 && (
//                   <FaExclamationCircle className="absolute -top-2 -right-2 text-white bg-red-500 rounded-full" />
//                 )}
//                 <div className="flex gap-2 items-center">
//                   <FaCartArrowDown className="w-6 h-6" />
//                   <span>Cart ({cartItems.length})</span>
//                 </div>
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="bg-[#1ABA1A] p-4 rounded-xl">
//         <div className="flex flex-col gap-4 justify-between items-center md:flex-row">
//           <div className="flex flex-col gap-4 items-center w-full md:flex-row md:w-auto">
//             <Select
//               onValueChange={onCategoryClick}
//               value={selectedCategory}
//               defaultValue=""
//             >
//               <SelectTrigger className="w-full md:w-[180px]">
//                 <SelectValue placeholder="All Categories" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectGroup>
//                   <SelectItem value="">All Categories</SelectItem>
//                   {categories.map((category) => (
//                     <SelectItem key={category.id} value={category.name}>
//                       {category.name}
//                     </SelectItem>
//                   ))}
//                 </SelectGroup>
//               </SelectContent>
//             </Select>
//             <div className="flex items-center w-full md:w-auto">
//               <Input
//                 type="text"
//                 placeholder="Search anything..."
//                 className="w-full"
//                 value={localSearchTerm}
//                 onChange={handleSearchChange}
//                 aria-label="Search products"
//               />
//               <button className="ml-4 text-white" aria-label="Search">
//                 <FaSearch />
//               </button>
//             </div>
//           </div>
//           <div className="hidden gap-6 text-white md:flex">
//             <div>free shipping over $199</div>
//             <div>30 days money back</div>
//             <div>100% secure payment</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
