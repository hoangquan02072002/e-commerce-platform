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
      <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Forget Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
