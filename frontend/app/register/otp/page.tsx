/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import getVisitorId from "@/utils/client";
import getIpAddress from "@/utils/getIpAddress";
import axios from "axios";
import React, { useState } from "react";
import {
  IoShieldCheckmark,
  IoKeypad,
  IoCheckmarkCircle,
} from "react-icons/io5";

const OTPVerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      // Generate visitorId
      const visitorId = await getVisitorId();
      const ipAddress = await getIpAddress();
      console.log("ip", ipAddress);

      const { data } = await axios.post(
        "http://localhost:5000/auth/verify-mfa",
        {
          otp,
          visitorId,
        },
        {
          headers: {
            "x-test-ip": ipAddress,
          },
        }
      );

      if (data.status === "successfully") {
        setMessage("Verification successful! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        console.log(data);
      } else {
        setError(data.message || "Verification failed");
        console.log(data.message);
      }

      return data;
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="w-full max-w-md">
        {/* Main Card */}
        <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-xl"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-400/20 blur-xl"></div>

          {/* Header Section */}
          <div className="relative z-10 mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-r from-emerald-500 to-teal-500">
              <IoShieldCheckmark className="w-8 h-8 text-white" />
            </div>
            <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
              Complete Registration
            </h2>
            <p className="font-medium text-gray-600">
              Enter the verification code to activate your account
            </p>
            <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"></div>
          </div>

          {/* Success Message */}
          {message && (
            <div className="relative z-10 p-4 mb-6 border bg-emerald-50 border-emerald-200 rounded-xl">
              <div className="flex items-center space-x-3">
                <IoCheckmarkCircle className="flex-shrink-0 w-5 h-5 text-emerald-600" />
                <p className="text-sm font-medium text-emerald-700">
                  {message}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="relative z-10 p-4 mb-6 border border-red-200 bg-red-50 rounded-xl">
              <p className="text-sm font-medium text-center text-red-600">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            {/* OTP Input */}
            <div className="group">
              <label
                htmlFor="otp"
                className="block mb-3 text-sm font-semibold text-gray-700"
              >
                <div className="flex items-center space-x-2">
                  <IoKeypad className="w-4 h-4 text-gray-500" />
                  <span>Verification Code</span>
                </div>
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                className="block w-full px-4 py-4 font-mono text-lg font-semibold tracking-widest text-center placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                maxLength={6}
                required
                disabled={loading}
              />
              <p className="mt-2 text-xs text-center text-gray-500">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-4 px-6 font-semibold text-white rounded-xl
                       bg-gradient-to-r from-emerald-500 to-teal-500
                       hover:from-emerald-600 hover:to-teal-600
                       focus:ring-4 focus:ring-emerald-200
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-200 transform hover:scale-[1.02]
                       shadow-lg hover:shadow-xl
                       disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                  <span>Verifying...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <IoCheckmarkCircle className="w-5 h-5" />
                  <span>VERIFY & COMPLETE</span>
                </div>
              )}
            </button>
          </form>

          {/* Help Text */}
          <div className="relative z-10 mt-8 text-center">
            <p className="text-sm text-gray-500">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="font-medium transition-colors duration-200 text-emerald-600 hover:text-emerald-700 hover:underline"
                disabled={loading}
              >
                Resend Code
              </button>
            </p>
          </div>
        </div>

        {/* Registration Progress */}
        <div className="p-4 mt-6 border bg-emerald-50/50 backdrop-blur-sm rounded-xl border-emerald-200/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-emerald-700">
              Registration Progress
            </span>
            <span className="text-sm font-bold text-emerald-600">
              Step 2 of 2
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-emerald-200">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="mt-2 text-xs text-emerald-600">
            Almost done! Complete verification to activate your account.
          </p>
        </div>

        {/* Security Notice */}
        <div className="p-4 mt-4 border bg-gray-50/50 backdrop-blur-sm rounded-xl border-gray-200/50">
          <div className="flex items-center space-x-3">
            <IoShieldCheckmark className="flex-shrink-0 w-5 h-5 text-gray-600" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Security:</span> This verification
              ensures your email address is valid and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
