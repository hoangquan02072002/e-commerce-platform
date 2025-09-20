// // import CategoryFilter from "@/components/products/CategoryFilter";
// import Pagination from "@/components/products/Pagination";
// // import CategorySidebar from "@/components/products/CategorySidebar";
// // import Pagination from "@/components/products/Pagination";
// import ProductGrids from "@/components/products/ProductGrids";
// import React from "react";
// const page = () => {
//   return (
//     <div className="container px-4 py-6 mx-auto md:px-6 lg:px-8">
//       {/* Product Grid Section */}
//       <div className="mb-8">
//         <div className="w-full">
//           <ProductGrids />
//         </div>
//       </div>
//       {/* Pagination Section */}
//       <div className="w-full">
//         <div className="flex justify-center">
//           <div className="w-full max-w-4xl">
//             <Pagination />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";

import Pagination from "@/components/products/Pagination";
import ProductGrids from "@/components/products/ProductGrids";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-4 py-16 mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white md:text-6xl lg:text-7xl">
              Our Products
            </h1>

            <div className="flex justify-center mt-8">
              <div className="w-24 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 -translate-x-16 -translate-y-16 bg-white rounded-full opacity-10"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-20 translate-y-20 bg-white rounded-full opacity-10"></div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-12 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Product Grid Section */}
        <div className="mb-12">
          <ProductGrids />
        </div>

        {/* Pagination Section */}
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
