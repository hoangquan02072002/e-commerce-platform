"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  FaPlus,
  FaStar,
  FaTwitter,
  FaFacebook,
  FaInstagramSquare,
  FaYoutube,
  FaShippingFast,
  FaGift,
  FaHeart,
  FaShare,
  FaShieldAlt,
} from "react-icons/fa";
import { FcMinus } from "react-icons/fc";
import { BsThreadsFill } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa6";
import {
  ShoppingCart,
  Clock,
  Phone,
  MapPin,
  Award,
  Check,
  Eye,
  MessageCircle,
  ThumbsUp,
  Sparkles,
  ZoomIn,
} from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/getToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

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

interface User {
  id: number;
  name: string;
  email: string;
}

interface Review {
  id: number;
  rating: number;
  comment?: string;
  title?: string;
  createdAt: string;
  user: User;
  productId: number;
}

interface ProductPageProps {
  params: { id: number };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageZoomed, setImageZoomed] = useState(false);
  const user_info = useSelector((state: RootState) => state.userLogin.user);
  const user_info_Id = user_info?.userId;
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: "",
    comment: "",
    userId: user_info_Id,
  });
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:5000/product/${id}`);
        setProduct(response.data);
        setTotalPrice(Number(response.data.price));
      } catch (error) {
        console.error("Failed to fetch products");
        toast.error("Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const token = getToken();
        const { data } = await axios.get(
          `http://localhost:5000/reviews/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews");
      }
    };

    fetchProduct();
    fetchReviews();
  }, [id]);

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

  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newReview.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    try {
      const token = getToken();
      const reviewData = {
        ...newReview,
        productId: Number(id),
      };

      await axios.post(`http://localhost:5000/reviews`, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("🌟 Review submitted successfully!");

      setNewReview({
        rating: 0,
        title: "",
        comment: "",
        userId: user_info_Id,
      });
      setShowReviewForm(false);

      const { data } = await axios.get(
        `http://localhost:5000/reviews/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReviews(data);
    } catch (error) {
      console.error("Failed to submit review");
      toast.error("Failed to submit review. Please try again.");
    }
  };

  const renderStars = (
    rating: number,
    interactive = false,
    size = "w-4 h-4"
  ) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`${size} ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        } ${
          interactive
            ? "cursor-pointer hover:text-yellow-400 transition-colors"
            : ""
        }`}
        onClick={() => interactive && handleStarClick(index + 1)}
      />
    ));
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50/30">
        <div className="flex items-center justify-center min-h-screen">
          <div className="space-y-4 text-center">
            <div className="w-20 h-20 mx-auto border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-gray-700">
                Loading product details...
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/30">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Enhanced Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 transition-colors cursor-pointer hover:text-blue-600">
              Home
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-500 transition-colors cursor-pointer hover:text-blue-600">
              Products
            </span>
            <span className="text-gray-300">/</span>
            <span className="px-3 py-1 text-xs font-semibold text-gray-900 rounded-full bg-blue-50">
              {product?.name}
            </span>
          </div>
        </div>

        {/* Main Product Section - New Compact Layout */}
        <div className="p-8 mb-16 border border-gray-100 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Smaller Product Image */}
            <div className="lg:col-span-1">
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 transition-all duration-500 cursor-pointer group ${
                  imageZoomed ? "aspect-[4/3]" : "aspect-square"
                }`}
                onClick={() => setImageZoomed(!imageZoomed)}
              >
                {imageLoading && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                )}

                <Image
                  src={product?.image || "/path/to/default/image.jpg"}
                  alt={product?.name || "Product"}
                  fill
                  className={`object-contain transition-all duration-700 group-hover:scale-105 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority
                  onLoad={() => setImageLoading(false)}
                />

                {/* Stock Badge */}
                <div className="absolute top-2 left-2">
                  {product && product.stock > 0 ? (
                    <div className="px-2 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-green-500 to-emerald-500">
                      In Stock
                    </div>
                  ) : (
                    <div className="px-2 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-red-500 to-pink-500">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Discount Badge */}
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
                    20% OFF
                  </div>
                </div>
              </div>

              {/* Mini Thumbnails */}
              <div className="flex mt-4 space-x-2 overflow-x-auto">
                {[1, 2, 3].map((thumb) => (
                  <div
                    key={thumb}
                    className="flex-shrink-0 w-12 h-12 overflow-hidden transition-colors bg-gray-100 border-2 border-transparent rounded-lg cursor-pointer hover:border-blue-500"
                  >
                    <Image
                      src={product?.image || "/path/to/default/image.jpg"}
                      alt={`Thumbnail ${thumb}`}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info & Price on Same Line */}
            <div className="lg:col-span-3">
              {/* Header Section with Title and Price on Same Line */}
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
                {/* Left: Product Info */}
                <div className="flex-1 space-y-4">
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(Math.round(averageRating))}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        ({reviews.length} reviews)
                      </span>
                    </div>
                    <div className="px-3 py-1 text-xs font-bold text-purple-700 bg-purple-100 rounded-full">
                      BESTSELLER
                    </div>
                  </div>

                  {/* Product Title */}
                  <h1 className="text-2xl font-bold leading-tight text-gray-900 lg:text-3xl">
                    {product?.name}
                  </h1>

                  {/* Category and Verified */}
                  <div className="flex flex-wrap items-center space-x-3">
                    <span className="px-3 py-1 text-sm font-semibold text-blue-700 bg-blue-100 rounded-full">
                      {product?.category.name}
                    </span>
                    <span className="flex items-center px-3 py-1 space-x-2 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      <Award className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  {/* Description */}
                  <div className="p-4 border border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-xl">
                    <p className="text-sm leading-relaxed text-gray-700">
                      {product?.description}
                    </p>
                  </div>
                </div>

                {/* Right: Price Section */}
                <div className="flex-shrink-0 lg:ml-8">
                  <div className="p-6 text-center border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl">
                    <div className="mb-2 text-xs font-bold tracking-wide text-green-600 uppercase">
                      Total Price
                    </div>
                    <div className="mb-2 text-3xl font-bold text-green-700 lg:text-4xl">
                      {totalPrice.toLocaleString()} RUB
                    </div>
                    <div className="mb-3">
                      <span className="text-lg text-gray-500 line-through">
                        {product &&
                          (parseFloat(product.price) * 1.2).toFixed(0)}{" "}
                        RUB
                      </span>
                    </div>
                    <div className="text-xs text-green-600">
                      <span className="font-semibold">$49/month</span> in 12
                      installments
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6 lg:grid-cols-4">
                <div className="flex items-center p-3 space-x-2 transition-shadow border border-green-100 bg-green-50 rounded-xl hover:shadow-md">
                  <FaShippingFast className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-xs font-bold text-green-800">
                      FREE SHIPPING
                    </div>
                    <div className="text-xs text-green-600">On orders $50+</div>
                  </div>
                </div>
                <div className="flex items-center p-3 space-x-2 transition-shadow border border-purple-100 bg-purple-50 rounded-xl hover:shadow-md">
                  <FaGift className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-xs font-bold text-purple-800">
                      FREE GIFT
                    </div>
                    <div className="text-xs text-purple-600">
                      Every purchase
                    </div>
                  </div>
                </div>
                <div className="flex items-center p-3 space-x-2 transition-shadow border border-blue-100 bg-blue-50 rounded-xl hover:shadow-md">
                  <FaShieldAlt className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-xs font-bold text-blue-800">
                      WARRANTY
                    </div>
                    <div className="text-xs text-blue-600">2 years</div>
                  </div>
                </div>
                <div className="flex items-center p-3 space-x-2 transition-shadow border border-orange-100 bg-orange-50 rounded-xl hover:shadow-md">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="text-xs font-bold text-orange-800">
                      24/7 SUPPORT
                    </div>
                    <div className="text-xs text-orange-600">Always here</div>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
                {/* Quantity and Buttons */}
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div>
                    <label className="block mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
                      Quantity
                    </label>
                    <div className="flex items-center justify-center p-3 space-x-4 border border-gray-200 bg-gray-50 rounded-xl">
                      <Button
                        onClick={handleDecrease}
                        disabled={count <= 1}
                        className="w-10 h-10 transition-all duration-200 bg-white rounded-full shadow-md hover:shadow-lg disabled:opacity-50 hover:scale-105"
                        variant="outline"
                      >
                        <FcMinus className="w-4 h-4" />
                      </Button>

                      <div className="text-xl font-bold text-gray-900 min-w-[3rem] text-center">
                        {count}
                      </div>

                      <Button
                        onClick={handleIncrease}
                        className="w-10 h-10 transition-all duration-200 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-105"
                        variant="outline"
                      >
                        <FaPlus className="w-4 h-4 text-green-600" />
                      </Button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full py-3 text-sm font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:shadow-xl hover:scale-[1.02]">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      ADD TO CART
                    </Button>

                    <Button className="w-full py-3 text-sm font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-xl hover:shadow-xl hover:scale-[1.02]">
                      <FaCcPaypal className="w-4 h-4 mr-2" />
                      BUY WITH PAYPAL
                    </Button>
                  </div>
                </div>

                {/* Quick Order Card */}
                <div className="p-6 text-white border border-gray-700 shadow-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl">
                  <div className="space-y-4 text-center">
                    <div className="inline-flex items-center px-4 py-2 space-x-2 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
                      <Phone className="w-4 h-4" />
                      <span className="text-xs font-bold tracking-wide uppercase">
                        Quick Order 24/7
                      </span>
                    </div>

                    <div className="text-2xl font-bold">(025) 3886 25 16</div>

                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span>
                        Ships from{" "}
                        <strong className="text-white">United States</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promotion Banner */}
              <div className="relative p-4 mt-6 overflow-hidden text-center bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-1 space-x-2 text-white">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                    <span className="font-bold">Limited Time Offer!</span>
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <p className="text-xs font-medium text-white/95">
                    Promotion expires:{" "}
                    <span className="font-bold">9h00pm, 25/5/2024</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="p-8 border border-gray-100 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl">
          <div className="space-y-8">
            {/* Reviews Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-bold text-gray-900">
                  Customer Reviews
                </h2>
                <div className="flex items-center px-4 py-2 space-x-2 rounded-full bg-blue-50">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">
                    {reviews.length} Reviews
                  </span>
                </div>
              </div>

              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl hover:shadow-xl"
              >
                <FaStar className="w-4 h-4 mr-2" />
                {showReviewForm ? "Cancel Review" : "Write Review"}
              </Button>
            </div>

            {/* Review Summary */}
            {reviews.length > 0 && (
              <div className="grid grid-cols-1 gap-6 p-6 border border-blue-200 md:grid-cols-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                <div className="text-center">
                  <div className="mb-2 text-5xl font-bold text-blue-600">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(Math.round(averageRating), false, "w-6 h-6")}
                  </div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-green-600">
                    {reviews.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>

                <div className="text-center">
                  <div className="mb-2 text-3xl font-bold text-purple-600">
                    {Math.round(
                      (reviews.filter((r) => r.rating >= 4).length /
                        reviews.length) *
                        100
                    )}
                    %
                  </div>
                  <div className="text-sm text-gray-600">Recommended</div>
                </div>
              </div>
            )}

            {/* Review Form */}
            {showReviewForm && (
              <div className="p-8 border border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <h3 className="flex items-center space-x-2 text-xl font-bold text-gray-900">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span>Share Your Experience</span>
                  </h3>

                  {/* Rating */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        {renderStars(newReview.rating, true, "w-8 h-8")}
                      </div>
                      <span className="text-sm font-medium text-gray-600">
                        {newReview.rating > 0
                          ? `${newReview.rating} star${
                              newReview.rating > 1 ? "s" : ""
                            }`
                          : "Click to rate"}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Review Title
                    </label>
                    <input
                      type="text"
                      value={newReview.title}
                      onChange={(e) =>
                        setNewReview({ ...newReview, title: e.target.value })
                      }
                      className="w-full p-4 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Give your review a catchy title..."
                    />
                  </div>

                  {/* Comment */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Your Review
                    </label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) =>
                        setNewReview({ ...newReview, comment: e.target.value })
                      }
                      rows={5}
                      className="w-full p-4 transition-all duration-300 border-2 border-gray-200 resize-none rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Tell others about your experience with this product..."
                    />
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      className="px-8 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:shadow-xl"
                    >
                      <FaStar className="w-4 h-4 mr-2" />
                      Submit Review
                    </Button>

                    <Button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setNewReview({
                          rating: 0,
                          title: "",
                          comment: "",
                          userId: user_info_Id,
                        });
                      }}
                      className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-gray-500 shadow-lg hover:bg-gray-600 rounded-xl hover:shadow-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={review.id}
                    className="p-6 transition-shadow duration-300 bg-white border-2 border-gray-100 shadow-sm rounded-2xl hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="mb-1 font-semibold text-gray-900">
                            {review.user.name}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button className="p-2 text-gray-400 transition-colors hover:text-blue-500">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                    </div>

                    {review.title && (
                      <h4 className="mb-3 text-lg font-semibold text-gray-900">
                        {review.title}
                      </h4>
                    )}

                    {review.comment && (
                      <p className="leading-relaxed text-gray-700">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-16 text-center border-2 border-gray-300 border-dashed bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-200 rounded-full">
                    <MessageCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">
                    No reviews yet
                  </h3>
                  <p className="mb-6 text-gray-600">
                    Be the first to share your thoughts about this product!
                  </p>
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="px-6 py-3 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:shadow-xl"
                  >
                    <FaStar className="w-4 h-4 mr-2" />
                    Write First Review
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="py-12 text-center">
          <h3 className="mb-8 text-xl font-bold text-gray-900">
            Share this product with friends
          </h3>
          <div className="flex justify-center space-x-6">
            {[
              {
                icon: FaTwitter,
                color: "bg-blue-400 hover:bg-blue-500",
                name: "Twitter",
              },
              {
                icon: FaFacebook,
                color: "bg-blue-600 hover:bg-blue-700",
                name: "Facebook",
              },
              {
                icon: FaInstagramSquare,
                color:
                  "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
                name: "Instagram",
              },
              {
                icon: FaYoutube,
                color: "bg-red-500 hover:bg-red-600",
                name: "YouTube",
              },
              {
                icon: BsThreadsFill,
                color: "bg-gray-800 hover:bg-gray-900",
                name: "Threads",
              },
            ].map((social, index) => (
              <button
                key={index}
                className={`w-14 h-14 ${social.color} text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110`}
                title={`Share on ${social.name}`}
              >
                <social.icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
