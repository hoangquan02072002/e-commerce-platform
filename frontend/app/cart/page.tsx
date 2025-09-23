"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  selectCartItems,
} from "@/redux/cart/cartSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowLeft,
  Gift,
  Truck,
  Shield,
  CreditCard,
  Tag,
  Heart,
  ShoppingBag,
  Sparkles,
  Clock,
} from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category?: {
    id: number;
    name: string;
  };
}

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("🛒 Cart cleared successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleRemoveItem = (id: number, name: string) => {
    dispatch(removeFromCart(id));
    toast.warn(`🗑️ "${name}" removed from cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  // const handleUpdateQuantity = (id: number, newQuantity: number) => {
  //   if (newQuantity >= 1) {
  //     dispatch(updateQuantity({ id, quantity: newQuantity }));
  //   }
  // };

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const shipping = cartItems.length > 0 ? (subtotal > 1000 ? 0 : 600) : 0;
  const tax = subtotal * 0.1; // 10% tax
  const orderTotal = subtotal + shipping + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      router.push("/checkout");
    }, 1000);
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleContinueShopping}
                className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 bg-white shadow-md hover:text-gray-900 rounded-xl hover:shadow-lg"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                Shopping Cart
              </h1>
            </div>

            {cartItems.length > 0 && (
              <div className="flex items-center px-4 py-2 space-x-2 text-blue-700 bg-blue-100 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
                <span className="font-semibold">{cartItems.length} items</span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
              style={{ width: cartItems.length > 0 ? "33%" : "0%" }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span
              className={
                cartItems.length > 0 ? "text-blue-600 font-medium" : ""
              }
            >
              Cart
            </span>
            <span>Checkout</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-6 lg:col-span-2">
            {cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="p-12 text-center bg-white border border-gray-100 shadow-xl rounded-3xl">
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-100 to-gray-200">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">
                  Your cart is empty
                </h2>
                <p className="max-w-md mx-auto mb-8 text-gray-600">
                  Looks like you haven't added any items to your cart yet. Start
                  shopping to fill it up!
                </p>
                <Button
                  onClick={handleContinueShopping}
                  className="px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl hover:shadow-xl hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Shopping
                </Button>
              </div>
            ) : (
              /* Cart Items */
              <div className="space-y-4">
                {cartItems.map((product: CartItem, index) => (
                  <div
                    key={product.id}
                    className="p-6 transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-6">
                      {/* Product Image */}
                      <div className="relative w-full h-32 overflow-hidden md:w-32 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 128px"
                        />
                        {product.category && (
                          <div className="absolute px-2 py-1 text-xs font-medium rounded-md top-2 left-2 bg-white/90 backdrop-blur-sm">
                            {product.category.name}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                              {product.name}
                            </h3>
                            <div className="flex items-center mt-2 space-x-2">
                              <div className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                In Stock
                              </div>
                              <button className="text-gray-400 transition-colors hover:text-red-500">
                                <Heart className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              handleRemoveItem(product.id, product.name)
                            }
                            className="p-2 text-gray-400 transition-all duration-200 rounded-lg hover:text-red-500 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                          {/* Price */}
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-green-600">
                              {product.price} RUB
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              {(product.price * 1.2).toFixed(0)} RUB
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center p-2 space-x-3 bg-gray-50 rounded-xl">
                              <button
                                // onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)}
                                disabled={product.quantity <= 1}
                                className="flex items-center justify-center w-8 h-8 transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <Minus className="w-4 h-4" />
                              </button>

                              <div className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                                {product.quantity}
                              </div>

                              <button
                                // onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                className="flex items-center justify-center w-8 h-8 transition-all duration-200 bg-white rounded-lg shadow-md hover:shadow-lg"
                              >
                                <Plus className="w-4 h-4 text-green-600" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                              <div className="text-lg font-bold text-gray-900">
                                {(product.price * product.quantity).toFixed(2)}{" "}
                                RUB
                              </div>
                              <div className="text-sm text-gray-500">
                                {product.price} × {product.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleClearCart}
                    variant="outline"
                    className="px-6 py-3 text-red-600 transition-all duration-300 border-2 border-red-200 hover:bg-red-50 hover:border-red-300 rounded-xl"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Items
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-8">
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order Summary
                  </h2>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span className="font-semibold">
                      {subtotal.toFixed(2)} RUB
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4" />
                      <span>Shipping:</span>
                    </div>
                    <div className="text-right">
                      {shipping === 0 ? (
                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      ) : (
                        <span className="font-semibold">
                          {shipping.toFixed(2)} RUB
                        </span>
                      )}
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="flex items-center p-3 space-x-2 bg-blue-50 rounded-xl">
                      <Gift className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700">
                        Add {(1000 - subtotal).toFixed(2)} RUB more for FREE
                        shipping!
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-700">
                    <div className="flex items-center space-x-2">
                      <Tag className="w-4 h-4" />
                      <span>Tax (10%):</span>
                    </div>
                    <span className="font-semibold">{tax.toFixed(2)} RUB</span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total:</span>
                      <span className="text-green-600">
                        {orderTotal.toFixed(2)} RUB
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0 || isLoading}
                  className="w-full py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:shadow-xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Proceed to Checkout</span>
                    </div>
                  )}
                </Button>

                {/* Security Badge */}
                <div className="flex items-center justify-center p-3 space-x-2 bg-gray-50 rounded-xl">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Secure checkout with SSL encryption
                  </span>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="p-6 text-white shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl">
              <div className="space-y-4">
                <h3 className="flex items-center space-x-2 text-lg font-bold">
                  <Sparkles className="w-5 h-5" />
                  <span>Why Shop With Us?</span>
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-4 h-4 text-blue-200" />
                    <span className="text-sm">
                      Free shipping on orders over 1000 RUB
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-blue-200" />
                    <span className="text-sm">30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-blue-200" />
                    <span className="text-sm">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
