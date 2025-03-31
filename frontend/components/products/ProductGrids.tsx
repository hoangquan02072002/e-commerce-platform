/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
// "use client";
// import React, { useEffect, useState, useRef, useCallback } from "react";
// import ProductCards from "./ProductCards";
// import axios from "axios";
// import { throttle } from "lodash";
// import CategorySidebar from "./CategorySidebar";

// interface Category {
//   id: number;
//   name: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   price: string;
//   image: string;
//   stock: number;
//   category: Category;
// }

// const ProductGrids: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);

//   const fetchProducts = async (category: string | null, page: number) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/product/search1`,
//         {
//           params: {
//             category,
//             page,
//             limit: 4,
//           },
//         }
//       );
//       if (response.data.length === 0) {
//         setHasMore(false);
//       } else {
//         if (page === 1) {
//           setProducts(response.data);
//         } else {
//           setProducts((prevProducts) => [...prevProducts, ...response.data]);
//         }
//       }
//     } catch (err) {
//       if (err.response && err.response.status === 404) {
//         setHasMore(false);
//       } else {
//         setError("Failed to fetch products");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (hasMore) {
//       fetchProducts(selectedCategory, page);
//     }
//   }, [selectedCategory, page]);

//   const lastProductRef = useCallback(
//     throttle((node: Element) => {
//       if (loading || !hasMore) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     }, 1000),
//     [loading, hasMore]
//   );

//   if (loading && page === 1) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   const handleCategoryClick = (category: string) => {
//     setProducts([]);
//     setPage(1);
//     setSelectedCategory(category);
//     setLoading(true);
//     setHasMore(true);
//   };

//   return (
//     <div className="flex justify-between">
//       <CategorySidebar onCategoryClick={handleCategoryClick} />
//       <div className="ml-4 max-md:max-w-full">
//         <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
//           TOP PRODUCTS
//         </div>
//         <div className="grid grid-cols-4 gap-10 max-md:flex-col">
//           {products.map((product, index) => (
//             <ProductCards
//               key={`${product.id}-${index}`}
//               {...product}
//               ref={index === products.length - 1 ? lastProductRef : null}
//             />
//           ))}
//         </div>
//       </div>
//       {loading && <div>Loading more products...</div>}
//     </div>
//   );
// };

// export default ProductGrids;

"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import { throttle, debounce, set } from "lodash";
import CategorySidebar from "./CategorySidebar";
import Spinner from "../Spinner"; // Import the Spinner component

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  stock: number;
  category: Category;
}

const ProductGrids: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchProducts = async (
    category: string | null,
    page: number,
    search: string | null,
    desc: string | null,
    price: string | null
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/product/search`, {
        params: {
          search,
          category,
          price,
          desc,
          page,
          limit: 4,
        },
      });
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        if (page === 1) {
          setProducts(response.data);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...response.data]);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setHasMore(false);
      } else {
        setError("Failed to fetch products");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchProducts(selectedCategory, page, searchTerm, null, null);
    }
  }, [selectedCategory, page, searchTerm]);

  const lastProductRef = useCallback(
    throttle((node: Element) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    }, 1000),
    [loading, hasMore]
  );

  const handleCategoryClick = useCallback(
    debounce((category: string) => {
      setProducts([]);
      setPage(1);
      setSelectedCategory(category);
      setHasMore(true);
    }, 300),
    []
  );
  const handleSearch = () => {
    setPage(1); // Reset to the first page on search
    setHasMore(true); // Reset hasMore to true for new search
    fetchProducts(selectedCategory, 1, searchTerm, null, null);
    // setSearchTerm("");
  };

  return (
    <div className="flex justify-center">
      <CategorySidebar onCategoryClick={handleCategoryClick} />
      <div className="ml-4 max-md:max-w-full">
        <div className="self-start mb-10 text-lg font-bold leading-tight text-center text-black uppercase">
          TOP PRODUCTS
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded border border-gray-300"
          />
          <button
            onClick={handleSearch}
            className="p-2 ml-2 text-white bg-blue-500 rounded"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-4 gap-10 max-md:flex-col">
          {products.map((product, index) => (
            <ProductCards
              key={`${product.id}-${index}`}
              {...product}
              ref={index === products.length - 1 ? lastProductRef : null}
            />
          ))}
        </div>
        {loading && <Spinner />}
        {!hasMore && (
          <div className="mt-4 text-center">No more products to load</div>
        )}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default ProductGrids;
