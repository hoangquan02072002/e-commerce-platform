/* eslint-disable @next/next/no-img-element */
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
    <div className="bg-[#EBEEF6]">
      <div className="flex">
        <ul className="bg-white w-[310px] h-[500px] p-6 ml-5 rounded-3xl">
          <li className="p-1 text-sm text-red-600"> SALE 40% OFF</li>
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
        <div>
          <div className="relative">
            <div className="ml-7">
              <Image
                className="rounded-3xl"
                src={slide3}
                width={800}
                height={310}
                alt="slide"
              />
            </div>
            <div className="absolute top-7 left-20">
              <h1 className="text-3xl font-bold text-white">
                Noise Cancelling
              </h1>
              <div className="text-2xl font-light text-[#FFFFFF]">
                Headphone
              </div>
              <div className="p-3 mt-6">
                <div className="text-sm text-white">
                  Boso Over-Ear Headphone
                </div>
                <div className="py-3 text-sm text-white">
                  Wifi, Voice Assistant,
                </div>
                <div className="text-sm text-white">Low latency game mde</div>
              </div>
              <Button className="mt-3" variant="outline">
                Buy Now
              </Button>
            </div>
          </div>
          <div className="flex mt-3 ml-7">
            <div className="relative pr-4">
              <div>
                <Image src={anh} width={410} height={120} alt="anh" />
              </div>
              <div className="absolute top-4 left-4">
                <div className="font-medium text-black">Sono Playgo 5</div>
                <div className="text-black">
                  from <span className="text-[#1ABA1A]"> $569</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div>
                <Image src={anh1} width={410} height={120} alt="anh1" />
              </div>
              <div className="absolute top-4 left-4">
                <div className="font-medium text-white">Logitek Bluetooth</div>
                <div className="text-[#FFC107]">Keyboard</div>
                <div className="pt-4 text-white">Best for all device</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative ml-2">
          <div className="">
            <Image
              className="rounded-2xl"
              src={anh2}
              width={400}
              height={400}
              alt="anh2"
            />
          </div>
          <div className="absolute top-4 right-4">
            <div className="font-extrabold text-black">xomia</div>
            <div className="font-semibold">Sport Water</div>
            <div className="font-semibold">Resistance</div>
            <div className="font-semibold">Watch</div>
            <Button className="mt-3">Shop Now</Button>
          </div>
          <div className="relative mt-3">
            <div>
              <Image
                className="rounded-2xl"
                src={anh3}
                width={400}
                height={400}
                alt="anh3"
              />
            </div>
            <div className="absolute top-4 left-4">
              <div className="text-2xl font-bold text-white">OKODo</div>
              <div className="text-2xl font-bold text-white">hero 11+</div>
              <div className="text-2xl font-bold text-white">black</div>
              <div className="font-bold text-white">from</div>
              <div className="font-bold text-[#1ABA1A]"> $169</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="bg-white w-[710px] h-[227px] mt-5 ml-5 rounded-2xl">
          <div className="p-5 text-base font-bold"> FEATURED BRANDS</div>
          <div className="grid grid-rows-2 grid-flow-col gap-5 pl-5">
            <Image src={logo1} width={97} height={33} alt="anh3" />
            <Image src={logo2} width={97} height={33} alt="anh3" />
            <Image src={logo3} width={97} height={33} alt="anh3" />
            <Image src={logo4} width={97} height={33} alt="anh3" />
            <Image src={logo5} width={97} height={33} alt="anh3" />
            <Image src={logo6} width={97} height={33} alt="anh3" />
            <Image src={logo7} width={97} height={33} alt="anh3" />
            <Image src={logo8} width={97} height={33} alt="anh3" />
            <Image src={logo9} width={97} height={33} alt="anh3" />
            <Image src={logo10} width={97} height={33} alt="anh3" />
          </div>
        </div>
        <div className="mt-5 ml-4 bg-white rounded-2xl w-[770px]">
          <div className="p-5 text-base font-bold">TOP CATEGORIES</div>
          <div className="flex justify-around items-center">
            <div>
              <Image src={prod1} width={114} height={60} alt="product" />
              <h1 className="p-5 font-semibold"> Laptops</h1>
            </div>
            <div>
              <Image src={prod2} width={114} height={60} alt="product" />
              <h1 className="p-5 font-semibold"> PC Gaming</h1>
            </div>
            <div>
              <Image src={prod3} width={114} height={60} alt="product" />
              <h1 className="p-5 font-semibold"> Headphones</h1>
            </div>
            <div>
              <Image src={prod4} width={114} height={60} alt="product" />
              <h1 className="p-5 font-semibold"> Monitors</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex ml-4">
        <div>
          <div className="mt-4 rounded-xl p-4 w-[1090px] h-[62px] bg-[#1ABA1A]">
            <div className="text-base font-bold text-white">
              DEALS OF THE DAY
            </div>
          </div>
          <div className="flex bg-white w-[1090px] rounded-2xl">
            <div className="ml-4">
              <Image src={Iphone} width={441} height={400} alt="iphone" />
            </div>
            <div className="mt-10 ml-10">
              <div className="text-base font-bold">
                Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
              </div>
              <div className="font-semibold text-[#F1352B] py-4 text-2xl">
                $569.00{" "}
                <span className="font-semibold text-[#666666]">$759.00</span>
              </div>
              <div className="">
                <div>
                  {" "}
                  Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
                </div>
                <div className="py-3">
                  {" "}
                  DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory
                </div>
                <div>
                  {" "}
                  Commanding Power Design: Twin 16+1+2 Phases Digital VRM
                </div>
                <div>
                  <span>
                    <Button
                      className="mx-3 mt-3 text-[#1ABA1A]"
                      variant="secondary"
                    >
                      FREE SHIPPING
                    </Button>
                    <Button className="text-[#F1352B]" variant="secondary">
                      FREE GIFT
                    </Button>
                  </span>
                </div>
                <div className="flex gap-4 justify-center items-center">
                  <div className="mt-4 text-base font-bold">
                    <div>HURRY UP </div>
                    <div>PROMOTION WILL</div>
                    <div>EXPIRES IN</div>
                  </div>
                  <div className="">
                    <Button className="" variant="secondary">
                      -162 day
                    </Button>
                    <Button className="mx-2" variant="secondary">
                      -9 H
                    </Button>
                    <Button variant="secondary">-3 M 2 </Button>
                    <Button className="ml-2" variant="secondary">
                      -3 S 4
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ml-6">
          <Image
            className="my-4"
            src={product}
            width={400}
            height={175}
            alt="product"
          />
          <Image src={product1} width={400} height={175} alt="product" />
        </div>
      </div>

      <div className="ml-4 bg-white rounded-2xl">
        <ul className="flex gap-4 p-6 font-semibold">
          <li>BESTSELLER </li>
          <li>NEW IN</li>
          <li>POPULAR</li>
        </ul>
        <div className="flex gap-4 justify-evenly items-center">
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
      <div className="mt-4 ml-4 bg-white rounded-2xl">
        <div className="p-6 font-semibold">BRAND NEW FOR YOU</div>

        <div className="flex gap-4 justify-evenly items-center">
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

      <div className="mt-4 ml-4 bg-white rounded-2xl">
        <div className=" h-[225px]">
          <div className="p-6 font-semibold">TOP CELLPHONES & TABLETS</div>
          <div className="flex justify-between items-center">
            <div className="ml-10">
              <div className="text-xl font-bold text-black">
                REDMI NODE 12 PRO+ 5G
              </div>
              <div className="text-[#666666] py-5">Rise to the challenge</div>
              <Button className="my-2 text-white">SHOW NOW</Button>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-6 mr-5">
              {iphone.map((phone) => (
                <div
                  key={phone.id}
                  className="flex gap-4 justify-center items-center"
                >
                  <div className="">
                    <h1 className="font-bold">{phone.name}</h1>
                    <p>{phone.count}</p>
                  </div>
                  <Image
                    objectFit="cover"
                    width={60}
                    height={62}
                    src={phone.imgurl}
                    alt="iphone"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#EBEEF6",
              margin: "20px 0",
            }}
          />
        </div>
        <div className="flex gap-4 justify-evenly items-center">
          {iphoneTablet.map((product) => (
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
      <div className="mt-4 ml-4 bg-white rounded-2xl">
        <div className=" h-[225px]">
          <div className="p-6 font-semibold">Best Laptops & Computers</div>
          <div className="flex justify-between items-center">
            <div className="ml-10">
              <div className="text-xl font-bold text-black">MACBOOK PRO</div>
              <div className="text-[#666666] py-5">Rise to the challenge</div>
              <Button className="my-2 text-white">SHOW NOW</Button>
            </div>

            <div className="grid grid-cols-3 grid-rows-2 gap-6 mr-5">
              {Laptop.map((phone) => (
                <div
                  key={phone.id}
                  className="flex gap-4 justify-center items-center"
                >
                  <div className="">
                    <h1 className="font-bold">{phone.name}</h1>
                    <p>{phone.count}</p>
                  </div>
                  <Image
                    objectFit="cover"
                    width={60}
                    height={62}
                    src={phone.imgurl}
                    alt="iphone"
                  />
                </div>
              ))}
            </div>
          </div>

          <hr
            style={{
              border: "none",
              height: "2px",
              backgroundColor: "#EBEEF6",
              margin: "20px 0",
            }}
          />
        </div>
        <div className="flex gap-4 justify-evenly items-center">
          {pc.map((product) => (
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
      <div className="flex mt-4 ml-4 rounded-2xl">
        <div className="bg-white w-[500px] rounded-2xl">
          <div className="p-6 font-semibold">AUDIO & CAMERAS</div>
          <Image
            className="mx-auto rounded-2xl"
            objectFit="cover"
            width={368}
            height={190}
            src={came}
            alt="camera"
          />
          <div className="grid grid-cols-2 grid-rows-2 gap-5 mx-auto mt-10">
            {cameras.map((item) => (
              <div className="mx-auto" key={item.id}>
                <Image
                  objectFit="cover"
                  width={120}
                  height={120}
                  src={item.imgurl}
                  alt="camera"
                />
                <div className="pl-4">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-4 bg-white w-[500px] rounded-2xl">
          <div className="p-6 font-semibold">GAMING</div>
          <Image
            className="mx-auto rounded-2xl"
            objectFit="cover"
            width={368}
            height={190}
            src={gam}
            alt="camera"
          />
          <div className="grid grid-cols-2 grid-rows-2 gap-5 mt-10">
            {gaming.map((item) => (
              <div className="mx-auto" key={item.id}>
                <Image
                  className="mx-auto"
                  objectFit="cover"
                  width={120}
                  height={120}
                  src={item.imgurl}
                  alt="camera"
                />
                <div className="pl-4">
                  <h1 className="font-bold">{item.name}</h1>
                  <p>{item.count}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white w-[500px] rounded-2xl">
          <div className="p-6 font-semibold"> OFFICE EQUIPMENT</div>
          <Image
            className="mx-auto rounded-2xl"
            objectFit="cover"
            width={368}
            height={190}
            src={office0}
            alt="camera"
          />
          <div className="grid grid-cols-2 grid-rows-2 gap-5 mx-auto mt-10">
            {office.map((item) => (
              <div className="mx-auto" key={item.id}>
                <Image
                  objectFit="cover"
                  width={120}
                  height={120}
                  src={item.imgurl}
                  alt="camera"
                />
                <div className="pl-4">
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
