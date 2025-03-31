/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useState } from "react";
import { getToken } from "@/utils/getToken";
import axios from "axios";
const page = () => {
  const [otp, setOtp] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const token = getToken();
      const { data } = await axios.post(
        "http://localhost:5000/change-password/verify-change-password",
        {
          otp,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == "success") {
        window.location.href = "/";
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Enter Token
            </label>
            <input
              type="token"
              id="token"
              name="token"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your token"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
