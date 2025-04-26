"use client";
import React from "react";
import slide3 from "../../public/slider3.png";
import anh from "../../public/anh.png";
import anh1 from "../../public/anh1.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import anh2 from "../../public/anh2.png";
import anh3 from "../../public/anh3.png";
import logo1 from "../../public/logo1.png";
import logo2 from "../../public/logo2.png";
import logo3 from "../../public/logo3.png";
import logo4 from "../../public/logo4.png";
import logo5 from "../../public/logo5.png";
import logo6 from "../../public/logo6.png";
import logo7 from "../../public/logo7.png";
import logo8 from "../../public/logo8.png";
import logo9 from "../../public/logo9.png";
import prod1 from "../../public/prod1.png";
import prod2 from "../../public/prod2.png";
import prod3 from "../../public/prod3.png";
import prod4 from "../../public/prod4.png";
import logo10 from "../../public/logo10.png";
import Iphone from "../../public/iphone.png";
import product from "../../public/product.png";
import product1 from "../../public/product1.png";
import Cart from "@/components/Cart";
import product3 from "../../public/product3.png";
import product4 from "../../public/product4.png";
import product5 from "../../public/product5.png";
import product6 from "../../public/product6.png";
import product7 from "../../public/product7.png";
import brand from "../../public/brand.png";
import brand1 from "../../public/brand1.png";
import brand2 from "../../public/brand2.png";
import brand3 from "../../public/brand3.png";
import cellphone from "../../public/cellphone.png";
import cellphone1 from "../../public/cellphone1.png";
import cellphone2 from "../../public/cellphone2.png";
import cellphone3 from "../../public/cellphone3.png";
import cellphone4 from "../../public/cellphone4.png";
import cellphone5 from "../../public/cellphone5.png";
import cellphone6 from "../../public/cellphone6.png";
import cellphone7 from "../../public/cellphone7.png";
import cellphone8 from "../../public/cellphone8.png";
import cellphone9 from "../../public/cellphone9.png";
import cellphone10 from "../../public/cellphone10.png";
import pc0 from "../../public/pc.png";
import pc1 from "../../public/pc1.png";
import pc3 from "../../public/pc3.png";
import pc4 from "../../public/pc4.png";
import pc5 from "../../public/pc5.png";
import pc6 from "../../public/pc6.png";
import pc7 from "../../public/pc7.png";
import pc8 from "../../public/pc8.png";
import pc9 from "../../public/pc9.png";
import pc10 from "../../public/pc10.png";
import came from "../../public/came.png";
import came1 from "../../public/came1.png";
import came2 from "../../public/came2.png";
import came3 from "../../public/came3.png";
import came4 from "../../public/came4.png";
import pc11 from "../../public/pc11.png";
import gam from "../../public/gam.png";
import gam1 from "../../public/gam1.png";
import gam2 from "../../public/gam2.png";
import gam3 from "../../public/gam3.png";
import gam4 from "../../public/gam4.png";
import office0 from "../../public/office.png";
import office1 from "../../public/office1.png";
import office2 from "../../public/office2.png";
import office3 from "../../public/office3.png";
import office4 from "../../public/office4.png";
const products = [
  {
    id: 1,
    Imagesrc: product3,
    name: "BOSO 2 Wireless On Ear Headphone",
    price: 358,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 2,
    Imagesrc: product4,
    name: "OPod Pro 12.9 Inch M1 2023,64GB + Wifi, GPS",
    price: 569.0,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 3,
    Imagesrc: product5,
    name: "uLosk Mini case 2.0, Xenoni10 / 32GB / SSD 512GB /VGA 8GB",
    price: 1729.0,
    stock: " Out of stock",
    button: "FREE SHIPPING",
  },
  {
    id: 4,
    Imagesrc: product6,
    name: "Opplo Watch Series 8 GPS +Cellular Stainless Steel Case with Milanese Loop",
    price: 979.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
  {
    id: 5,
    Imagesrc: product7,
    name: "iSmart 24V Charger",
    price: 9.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
];

const Brand = [
  {
    id: 1,
    Imagesrc: brand,
    name: "Zumac Steel Computer Case",
    description: "And an option to upgrade every three years",
    button: "SHOW NOW",
  },
  {
    id: 2,
    Imagesrc: brand1,
    name: "Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.",
    description: "Limited time offer. Hurry up",
    button: "SHOW NOW",
  },
  {
    id: 3,
    Imagesrc: brand2,
    name: "Summer Sale with Sale up to 50% OFF for Foam Gaming Chair.",
    description: "Limited time offer. Hurry up",
    button: "SHOW NOW",
  },
  {
    id: 4,
    Imagesrc: brand3,
    name: "iPed Pro Mini 6 - Powerful l in hand",
    description:
      "From $19.99/month for 36 months. $280.35 final payment due in month 37",
    button: "SHOW NOW",
  },
  {
    id: 5,
    Imagesrc: brand3,
    name: "iPed Pro Mini 6 - Powerful l in hand",
    description:
      "From $19.99/month for 36 months. $280.35 final payment due in month 37",
    button: "SHOW NOW",
  },
];

const iphone = [
  {
    id: 1,
    imgurl: cellphone,
    name: "iPhone 14 Pro Max",
    count: "74 items",
  },
  {
    id: 2,
    imgurl: cellphone1,
    name: "Android",
    count: "35 items",
  },
  {
    id: 3,
    imgurl: cellphone2,
    name: "5G Support",
    count: "12 items",
  },
  {
    id: 4,
    imgurl: cellphone3,
    name: "Gaming",
    count: "9 items",
  },
  {
    id: 5,
    imgurl: cellphone4,
    name: "Xiaomi",
    count: "52 items",
  },
  {
    id: 6,
    imgurl: cellphone5,
    name: "Accessories",
    count: "29 items",
  },
];
const iphoneTablet = [
  {
    id: 1,
    Imagesrc: cellphone6,
    name: "SROK Smart Phone 128GB,Oled Retina",
    price: 579.0,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 2,
    Imagesrc: cellphone7,
    name: "aPod Pro Tablet 2023 LTE + Wifi, GPS Cellular 12.9 Inch,512GB",
    price: 979.0,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 3,
    Imagesrc: cellphone8,
    name: "OPod Pro 12.9 Inch M1 2023,64GB + Wifi, GPS",
    price: 659.0,
    stock: " Out of stock",
    button: "FREE SHIPPING",
  },
  {
    id: 4,
    Imagesrc: cellphone9,
    name: "Xiamoi Redmi Note 5, 64GB",
    price: 1239.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
  {
    id: 5,
    Imagesrc: cellphone10,
    name: "Microsute Alpha Ultra S5 Surface 128GB 2022, Sliver",
    price: 1729.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
];

const Laptop = [
  {
    id: 1,
    imgurl: pc0,
    name: "Macbook",
    count: "74 items",
  },
  {
    id: 2,
    imgurl: pc1,
    name: "Gaming PC",
    count: "35 items",
  },
  {
    id: 3,
    imgurl: pc3,
    name: "Laptop Office",
    count: "12 items",
  },
  {
    id: 4,
    imgurl: pc4,
    name: "Laptop 15",
    count: "9 items",
  },
  {
    id: 5,
    imgurl: pc5,
    name: "M1 2023",
    count: "52 items",
  },
  {
    id: 6,
    imgurl: pc6,
    name: "Secondhand",
    count: "29 items",
  },
];
const cameras = [
  {
    id: 1,
    imgurl: came1,
    name: "Speaker",
    count: "74 items",
  },
  {
    id: 2,
    imgurl: came2,
    name: "DSLR Camera",
    count: "35 items",
  },
  {
    id: 3,
    imgurl: came3,
    name: "Earbuds",
    count: "12 items",
  },
  {
    id: 4,
    imgurl: came4,
    name: "Microphone",
    count: "9 items",
  },
];
const gaming = [
  {
    id: 1,
    imgurl: gam1,
    name: "Monitors",
    count: "74 items",
  },
  {
    id: 2,
    imgurl: gam2,
    name: "Chair",
    count: "35 items",
  },
  {
    id: 3,
    imgurl: gam3,
    name: "Controller",
    count: "12 items",
  },
  {
    id: 4,
    imgurl: gam4,
    name: "Keyboards",
    count: "9 items",
  },
];

const office = [
  {
    id: 1,
    imgurl: office1,
    name: "Printers",
    count: "74 items",
  },
  {
    id: 2,
    imgurl: office2,
    name: "Network",
    count: "35 items",
  },
  {
    id: 3,
    imgurl: office3,
    name: "Security",
    count: "12 items",
  },
  {
    id: 4,
    imgurl: office4,
    name: "Projectors",
    count: "9 items",
  },
];
const pc = [
  {
    id: 1,
    Imagesrc: pc7,
    name: "Pineapple Macbook Pro 2022 M1 / 512 GB",
    price: 579.0,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 2,
    Imagesrc: pc8,
    name: "C&O Bluetooth Speaker",
    price: 979.0,
    stock: "In Stock",
    button: "FREE SHIPPING",
  },
  {
    id: 3,
    Imagesrc: pc9,
    name: "Gigaby Custome Case, i7/ 16GB / SSD 256GB",
    price: 659.0,
    stock: " Out of stock",
    button: "FREE SHIPPING",
  },
  {
    id: 4,
    Imagesrc: pc10,
    name: "BEOS PC Gaming Case",
    price: 1239.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
  {
    id: 5,
    Imagesrc: pc11,
    name: "aMoc All-in-one Computer M1",
    price: 1729.0,
    stock: "PRE - ORDER",
    button: "FREE SHIPPING",
  },
];
const HomePage = () => {
  return (
    <div className="bg-[#EBEEF6] p-4 md:p-6">
      {/* Main Layout */}
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Categories Sidebar */}
        <div className="bg-white w-full lg:w-[310px] p-4 lg:p-6 rounded-3xl">
          <ul className="space-y-2">
            <li className="p-1 text-sm text-red-600">SALE 40% OFF</li>
            <li className="p-1 text-xl font-semibold">Laptops</li>
            <li className="p-1 text-xl font-semibold">PC & Computers</li>
            <li className="p-1 text-xl font-semibold">Cell Phones</li>
            <li className="p-1 text-xl font-semibold">Tablets</li>
            <li className="p-1 text-xl font-semibold">Gaming & VR</li>
            <li className="p-1 text-xl font-semibold">Networking</li>
            <li className="p-1 text-xl font-semibold">Cameras</li>
            <li className="p-1 text-xl font-semibold">Sounds</li>
            <li className="p-1 text-xl font-semibold">Office</li>
            <li className="p-1 text-xl font-semibold">Storage, USB</li>
            <li className="p-1 text-xl font-semibold">Accessories</li>
            <li className="p-1 text-xl font-semibold">Clearance</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Hero Section */}
          <div className="relative mb-4">
            <div className="w-full">
              <Image
                className="w-full h-auto rounded-3xl"
                src={slide3}
                width={800}
                height={310}
                alt="slide"
              />
            </div>
            <div className="absolute top-4 left-4 md:top-7 md:left-20">
              <h1 className="text-2xl font-bold text-white md:text-3xl">
                Noise Cancelling
              </h1>
              <div className="text-sm font-light text-white md:text-2xl">
                Headphone
              </div>
              <div className="p-2 mt-4 md:p-3 md:mt-6">
                <div className="text-sm text-white">
                  Boso Over-Ear Headphone
                </div>
                <div className="py-2 text-sm; text-white md:py-3">
                  Wifi, Voice Assistant,
                </div>
                <div className="text-sm text-white">Low latency game mode</div>
              </div>
              <Button className="mt-2 md:mt-3" variant="outline">
                Buy Now
              </Button>
            </div>
          </div>

          {/* Promo Banners */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Image
                className="w-full h-auto rounded-2xl"
                src={anh}
                width={410}
                height={120}
                alt="anh"
              />
              <div className="absolute top-4 left-4">
                <div className="font-medium text-black">Sono Playgo 5</div>
                <div className="text-black">
                  from <span className="text-[#1ABA1A]">$569</span>
                </div>
              </div>
            </div>
            <div className="relative flex-1">
              <Image
                className="w-full h-auto rounded-2xl"
                src={anh1}
                width={410}
                height={120}
                alt="anh1"
              />
              <div className="absolute top-4 left-4">
                <div className="font-medium text-white">Logitek Bluetooth</div>
                <div className="text-[#FFC107]">Keyboard</div>
                <div className="pt-2 text-white md:pt-4">
                  Best for all device
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Brands and Categories */}
      <div className="flex flex-col gap-4 mt-4 lg:flex-row">
        <div className="bg-white w-full lg:w-[710px] p-4 rounded-2xl">
          <div className="p-2 text-base font-bold md:p-5">FEATURED BRANDS</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <Image src={logo1} width={97} height={33} alt="brand" />
            <Image src={logo2} width={97} height={33} alt="brand" />
            <Image src={logo3} width={97} height={33} alt="brand" />
            <Image src={logo4} width={97} height={33} alt="brand" />
            <Image src={logo5} width={97} height={33} alt="brand" />
            <Image src={logo6} width={97} height={33} alt="brand" />
            <Image src={logo7} width={97} height={33} alt="brand" />
            <Image src={logo8} width={97} height={33} alt="brand" />
            <Image src={logo9} width={97} height={33} alt="brand" />
            <Image src={logo10} width={97} height={33} alt="brand" />
          </div>
        </div>

        <div className="bg-white w-full lg:w-[770px] p-4 rounded-2xl">
          <div className="p-2 text-base font-bold md:p-5">TOP CATEGORIES</div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <Image src={prod1} width={114} height={60} alt="category" />
              <h1 className="p-2 font-semibold md:p-5">Laptops</h1>
            </div>
            <div className="text-center">
              <Image src={prod2} width={114} height={60} alt="category" />
              <h1 className="p-2 font-semibold md:p-5">PC Gaming</h1>
            </div>
            <div className="text-center">
              <Image src={prod3} width={114} height={60} alt="category" />
              <h1 className="p-2 font-semibold md:p-5">Headphones</h1>
            </div>
            <div className="text-center">
              <Image src={prod4} width={114} height={60} alt="category" />
              <h1 className="p-2 font-semibold md:p-5">Monitors</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4 mt-4 bg-white rounded-2xl">
        <ul className="flex flex-wrap gap-4 p-2 font-semibold md:p-6">
          <li>BESTSELLER</li>
          <li>NEW IN</li>
          <li>POPULAR</li>
        </ul>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <Cart
              key={product.id}
              Imagesrc={product.Imagesrc}
              name={product.name}
              price={product.price}
              stock={product.stock}
              button={product.button}
              id={product.id}
            />
          ))}
        </div>
      </div>

      {/* Brand New Section */}
      <div className="p-4 mt-4 bg-white rounded-2xl">
        <div className="p-2 font-semibold md:p-6">BRAND NEW FOR YOU</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Brand.map((items) => (
            <Cart
              key={items.id}
              Imagesrc={items.Imagesrc}
              name={items.name}
              description={items.description}
              button={items.button}
              id={items.id}
            />
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="flex flex-col gap-4 mt-4 lg:flex-row">
        <div className="p-4 w-full bg-white rounded-2xl lg:w-1/3">
          <div className="p-2 font-semibold md:p-6">AUDIO & CAMERAS</div>
          <Image
            className="w-full h-auto rounded-2xl"
            src={came}
            alt="camera"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {cameras.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <Image
                  src={item.imgurl}
                  alt="camera"
                  className="object-cover w-20 h-20"
                />
                <div className="text-center">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 w-full bg-white rounded-2xl lg:w-1/3">
          <div className="p-2 font-semibold md:p-6">GAMING</div>
          <Image className="w-full h-auto rounded-2xl" src={gam} alt="gaming" />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {gaming.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <Image
                  src={item.imgurl}
                  alt="gaming"
                  className="object-cover w-20 h-20"
                />
                <div className="text-center">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 w-full bg-white rounded-2xl lg:w-1/3">
          <div className="p-2 font-semibold md:p-6">OFFICE EQUIPMENT</div>
          <Image
            className="w-full h-auto rounded-2xl"
            src={office0}
            alt="office"
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            {office.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                <Image
                  src={item.imgurl}
                  alt="office"
                  className="object-cover w-20 h-20"
                />
                <div className="text-center">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
