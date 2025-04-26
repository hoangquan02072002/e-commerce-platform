"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/redux/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store"; // You'll need to create this type

const VerifyLogin = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.user);
  const token = useSelector(
    (state: RootState) => state.userLogin.user?.user_info.access_token
  );

  useEffect(() => {
    // Redirect if token exists
    if (token) {
      window.location.href = "/";
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(verifyOTP({ otp }));

      if (verifyOTP.fulfilled.match(resultAction)) {
        // If verification was successful, the token will be stored in Redux and localStorage
        // The useEffect above will handle redirection
        window.location.href = "/";
        console.log("OTP verification successful");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Verify MFA</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 w-full text-white bg-blue-500 rounded-md"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyLogin;
