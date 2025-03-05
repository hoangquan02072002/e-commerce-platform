"use client";
import React from "react";
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

const App = () => {
  const cartItems = useSelector(selectCartItems);
  console.log(cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Product clear to cart!");
  };
  const handleRemoveCart = (id: number) => {
    dispatch(removeFromCart(id));
    toast.warn("Product removed to cart!");
  };
  const orderTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
  return (
    <div className="bg-[#EBEEF6] container mx-auto p-6 lg:flex-row lg:space-x-6">
      <div className="flex-1">
        <h1 className="mb-4 text-2xl font-bold">Cart items</h1>
        {/* <ProductList /> */}
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="flex flex-col space-y-4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col p-4 bg-white rounded-lg border shadow-md lg:flex-row lg:justify-between"
                >
                  <div className="flex space-x-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="rounded w-30 h-30"
                      width={180}
                      height={180}
                    />
                    <div className="flex flex-col justify-between">
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-lg font-semibold">{product.price}</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <button className="px-2 py-1 bg-gray-200 rounded">
                          -
                        </button>
                        <span>{product.quantity}</span>
                        <button className="px-2 py-1 bg-gray-200 rounded">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveCart(product.id)}
                    className="my-2 text-white p-auto"
                    variant="destructive"
                  >
                    Remove Cart
                  </Button>
                </div>
              ))}
              <Button
                onClick={handleClearCart}
                className="text-[#1ABA1A] my-2 p-auto"
                // variant="outline"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-8 text-center lg:w-1/3">
        {/* <OrderSummary /> */}
        <div className="p-6 w-full bg-white rounded-lg border shadow-md">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <div className="flex justify-between mt-4">
            <span>Sub Total:</span>
            <span>{orderTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping estimate:</span>
            <span>$600.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax estimate:</span>
            <span>$137.00</span>
          </div>
          <div className="mt-4 border-t"></div>
          <div className="flex justify-between mt-3 font-bold">
            <span>ORDER TOTAL:</span>
            <span>{orderTotal.toFixed(2)}</span>
          </div>
          <button className="py-2 mt-4 w-full text-white bg-green-500 rounded-lg hover:bg-green-600">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
