"use client";
import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "token") {
      setToken(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          token,
          newPassword,
          confirmPassword,
        }
      );
      if (data.status == "Password reset successfully") {
        window.location.href = "/login";
        console.log(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 mx-4 w-full max-w-md bg-white rounded-xl shadow-md md:mx-0">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="token"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter Token
            </label>
            <input
              type="text"
              id="token"
              name="token"
              className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your token"
              value={token}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleChange}
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

export default ResetPassword;
