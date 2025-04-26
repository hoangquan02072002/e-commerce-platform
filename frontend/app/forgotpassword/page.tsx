"use client";
import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        {
          email,
        }
      );
      if (data.status == "token sent to email successfully") {
        window.location.href = "/forgotpassword/resetpassword";
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 mx-4 w-full max-w-md bg-white rounded-xl shadow-md md:mx-0">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 w-full text-sm font-medium text-white uppercase bg-green-600 rounded-lg transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
