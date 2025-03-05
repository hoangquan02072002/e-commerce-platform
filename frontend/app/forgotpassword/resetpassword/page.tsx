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
      <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Forget Password</h2>
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
              value={token}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Enter New Password
            </label>
            <input
              type="password"
              id="password"
              name="newPassword"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your password"
              value={newPassword}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Enter confirm password
            </label>
            <input
              type="ConfirmPassword"
              id="ConfirmPassword"
              name="confirmPassword"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your ConfirmPassword"
              value={confirmPassword}
              onChange={handleChange}
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

export default ResetPassword;
