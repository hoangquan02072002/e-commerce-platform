"use client";
import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  // description: string;
  stock: number;
  category: Category;
}
const ProductGrids = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        setProducts(response.data);
        console.log(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const filteredProducts_Cameras = products.filter(
    (product) => product.category.name === "Cameras"
  );
  const filteredProducts_CellPhones = products.filter(
    (product) => product.category.name === "Cell Phones"
  );
  const filteredProducts_Gaming = products.filter(
    (product) => product.category.name === "Gaming"
  );
  const filteredProducts_HeadPhone = products.filter(
    (product) => product.category.name === "HeadPhone"
  );
  const filteredProducts_Ipad = products.filter(
    (product) => product.category.name === "Ipad"
  );
  const filteredProducts_Store = products.filter(
    (product) => product.category.name === "Storage, USB"
  );
  return (
    <>
      <div className="ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP CAMERAS
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_Cameras.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
      <div className="my-12 ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP CELLPHONES
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_CellPhones.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
      <div className="my-12 ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP GAMING
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_Gaming.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
      <div className="my-12 ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP HEADPHONES
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_HeadPhone.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
      <div className="my-12 ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP IPAD
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_Ipad.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
      <div className="my-12 ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP STORAGE, USB
        </div>
        <div className="grid grid-cols-4 gap-32 max-md:flex-col">
          {filteredProducts_Store.map((product, index) => (
            <ProductCards key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductGrids;
