"use client";

// import CategoryFilter from "@/components/products/CategoryFilter";
import Pagination from "@/components/products/Pagination";
// import CategorySidebar from "@/components/products/CategorySidebar";
// import Pagination from "@/components/products/Pagination";
import ProductGrids from "@/components/products/ProductGrids";
import React from "react";
const page = () => {
  return (
    <div className="container px-4 py-6 mx-auto md:px-6 lg:px-8">
      {/* Product Grid Section */}
      <div className="mb-8">
        <div className="w-full">
          <ProductGrids />
        </div>
      </div>
      {/* Pagination Section */}
      <div className="w-full">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
