/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="mt-10 text-gray-700 bg-white">
        <div className="px-4 py-8 mx-auto max-w-[1400px] md:flex md:justify-between md:items-start">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <h2 className="text-lg font-bold">
              SWOO - 1ST NYC TECH ONLINE MARKET
            </h2>
            <p className="mt-2 text-sm">HOTLINE 24/7</p>
            <p className="text-2xl font-bold text-green-600">
              (025) 3686 25 16
            </p>
            <p className="mt-2 text-sm">
              257 Thatcher Road St, Brooklyn, Manhattan, NY 10092
            </p>
            <p className="text-sm">contact@swootechmart.com</p>
            <div className="flex items-center mt-4 space-x-4 text-gray-500">
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" aria-label="Pinterest">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3 md:w-1/2">
            <div>
              <h3 className="font-bold">TOP CATEGORIES</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Laptops
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    PC & Computers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Cell Phones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Tablets
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gaming & VR
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Networks
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">COMPANY</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    About Swoo
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Career
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Sitemap
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Store Locations
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold">HELP CENTER</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Customer Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Track Order
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Product Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-8 md:mt-0 md:w-1/3">
            <h3 className="font-bold">
              SUBSCRIBE & GET 10% OFF FOR YOUR FIRST ORDER
            </h3>
            <form className="mt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-2 w-full text-sm rounded-md border border-gray-300"
              />
              <button
                type="submit"
                className="block px-4 py-2 mt-2 w-full text-sm font-bold text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                SUBSCRIBE
              </button>
            </form>
            <p className="mt-2 text-xs">
              By subscribing, you're accepting our{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Policy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
