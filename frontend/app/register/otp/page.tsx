/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import React, { useState } from "react";

// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
const page = () => {
  // const [value, setValue] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/verify-mfa",
        {
          otp,
        }
      );
      if (data.status == "successfully") {
        window.location.href = "/login";
        console.log(data);
      } else {
        console.log(data.message);
      }
      // setMessage(response.data.message);
      // setError("");

      // router.push("/login");
      return data;
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };
  return (
    // <div className="flex justify-center items-center w-full h-44">
    //   <div className="space-y-2">
    //     <InputOTP
    //       maxLength={6}
    //       value={value}
    //       onChange={(value) => setValue(value)}
    //     >
    //       <InputOTPGroup>
    //         <InputOTPSlot index={0} />
    //         <InputOTPSlot index={1} />
    //         <InputOTPSlot index={2} />
    //         <InputOTPSlot index={3} />
    //         <InputOTPSlot index={4} />
    //         <InputOTPSlot index={5} />
    //       </InputOTPGroup>
    //     </InputOTP>
    //     <div className="text-sm text-center">
    //       {value === "" ? (
    //         <>Enter your one-time password.</>
    //       ) : (
    //         <>You entered: {value}</>
    //       )}
    //     </div>
    //   </div>
    // </div>
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
          >
            Verify
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default page;
