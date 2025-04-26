"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ProductCards from "./ProductCards";
import axios from "axios";
import { throttle, debounce } from "lodash";
import CategorySidebar from "./CategorySidebar";
import Spinner from "../Spinner";

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
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
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
    throttle((node: HTMLDivElement | null) => {
      if (loading || !hasMore || !node) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      observer.current.observe(node);
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
    setPage(1);
    setHasMore(true);
    fetchProducts(selectedCategory, 1, searchTerm, null, null);
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Category Sidebar - Hidden on mobile, visible on desktop */}
      <div className="hidden w-64 lg:block">
        <CategorySidebar onCategoryClick={handleCategoryClick} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 rounded border border-gray-300"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-white bg-blue-500 rounded transition-colors hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-6 text-lg font-bold text-center text-black uppercase">
          TOP PRODUCTS
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              ref={index === products.length - 1 ? lastProductRef : null}
            >
              <ProductCards {...product} />
            </div>
          ))}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <div className="flex justify-center mt-4">
            <Spinner />
          </div>
        )}
        {!hasMore && (
          <div className="mt-4 text-center text-gray-500">
            No more products to load
          </div>
        )}
        {error && <div className="mt-4 text-center text-red-500">{error}</div>}
      </div>
    </div>
  );
};

export default ProductGrids;
