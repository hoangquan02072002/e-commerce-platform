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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
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
              className="w-full p-2 border rounded-md"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded-md"
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

// "use client";

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { verifyOTP } from "@/redux/user/userSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import { IoShieldCheckmark, IoKeypad } from "react-icons/io5";

// const VerifyLogin = () => {
//   const [otp, setOtp] = useState("");
//   const dispatch = useDispatch<AppDispatch>();

//   const { loading, error } = useSelector((state: RootState) => state.user);
//   const token = useSelector(
//     (state: RootState) => state.userLogin.user?.user_info.access_token
//   );

//   useEffect(() => {
//     // Redirect if token exists
//     if (token) {
//       window.location.href = "/";
//     }
//   }, [token]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const resultAction = await dispatch(verifyOTP({ otp }));

//       if (verifyOTP.fulfilled.match(resultAction)) {
//         // If verification was successful, the token will be stored in Redux and localStorage
//         // The useEffect above will handle redirection
//         window.location.href = "/";
//         console.log("OTP verification successful");
//       }
//     } catch (error) {
//       console.error("OTP verification failed:", error);
//     }
//   };

//   // Handle OTP input with strict number validation
//   const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Only allow numbers and limit to 6 digits
//     const numericValue = value.replace(/\D/g, "").slice(0, 6);
//     setOtp(numericValue);
//   };

//   // Handle paste events to ensure only numbers are pasted
//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData("text");
//     const numericValue = pastedText.replace(/\D/g, "").slice(0, 6);
//     setOtp(numericValue);
//   };

//   // Handle keydown to prevent non-numeric input - FIXED VERSION
//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const key = e.key;

//     // Allow navigation keys
//     const allowedKeys = [
//       "Backspace",
//       "Delete",
//       "Tab",
//       "Escape",
//       "Enter",
//       "Home",
//       "End",
//       "ArrowLeft",
//       "ArrowRight",
//       "ArrowUp",
//       "ArrowDown",
//     ];

//     // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
//     if (e.ctrlKey && ["a", "c", "v", "x"].includes(key.toLowerCase())) {
//       return;
//     }

//     // Allow navigation keys
//     if (allowedKeys.includes(key)) {
//       return;
//     }

//     // Only allow numeric keys (0-9)
//     if (!/^[0-9]$/.test(key)) {
//       e.preventDefault();
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
//       <div className="w-full max-w-md">
//         {/* Main Card */}
//         <div className="relative p-8 overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
//           {/* Decorative Background Elements */}
//           <div className="absolute top-0 left-0 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400/20 to-indigo-400/20 blur-xl"></div>
//           <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl"></div>

//           {/* Header Section */}
//           <div className="relative z-10 mb-8 text-center">
//             <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-indigo-500">
//               <IoShieldCheckmark className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="mb-2 text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
//               Verify MFA
//             </h2>
//             <p className="font-medium text-gray-600">
//               Enter the verification code sent to your device
//             </p>
//             <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="relative z-10 p-4 mb-6 border border-red-200 bg-red-50 rounded-xl">
//               <p className="text-sm font-medium text-center text-red-600">
//                 {error}
//               </p>
//             </div>
//           )}

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
//             {/* OTP Input */}
//             <div className="group">
//               <label
//                 htmlFor="otp"
//                 className="block mb-3 text-sm font-semibold text-gray-700"
//               >
//                 <div className="flex items-center space-x-2">
//                   <IoKeypad className="w-4 h-4 text-gray-500" />
//                   <span>Verification Code</span>
//                 </div>
//               </label>
//               <input
//                 type="text"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 id="otp"
//                 name="otp"
//                 className="block w-full px-4 py-4 font-mono text-lg font-semibold tracking-widest text-center placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
//                 placeholder="000000"
//                 value={otp}
//                 onChange={handleOtpChange}
//                 onPaste={handlePaste}
//                 onKeyDown={handleKeyDown}
//                 onInput={(e) => {
//                   // Additional layer of protection
//                   const target = e.target as HTMLInputElement;
//                   const numericValue = target.value
//                     .replace(/\D/g, "")
//                     .slice(0, 6);
//                   if (target.value !== numericValue) {
//                     target.value = numericValue;
//                     setOtp(numericValue);
//                   }
//                 }}
//                 maxLength={6}
//                 autoComplete="one-time-code"
//                 required
//               />
//               <p className="mt-2 text-xs text-center text-gray-500">
//                 Enter the 6-digit code from your authenticator app
//               </p>
//             </div>

//             {/* Verify Button */}
//             <button
//               type="submit"
//               disabled={loading || otp.length !== 6}
//               className="w-full py-4 px-6 font-semibold text-white rounded-xl
//                        bg-gradient-to-r from-blue-500 to-indigo-500
//                        hover:from-blue-600 hover:to-indigo-600
//                        focus:ring-4 focus:ring-blue-200
//                        disabled:opacity-50 disabled:cursor-not-allowed
//                        transition-all duration-200 transform hover:scale-[1.02]
//                        shadow-lg hover:shadow-xl
//                        disabled:hover:scale-100"
//             >
//               {loading ? (
//                 <div className="flex items-center justify-center space-x-2">
//                   <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
//                   <span>Verifying...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center space-x-2">
//                   <IoShieldCheckmark className="w-5 h-5" />
//                   <span>VERIFY CODE</span>
//                 </div>
//               )}
//             </button>
//           </form>

//           {/* Help Text */}
//           <div className="relative z-10 mt-8 text-center">
//             <p className="text-sm text-gray-500">
//               Didn't receive the code?{" "}
//               <button className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline">
//                 Resend Code
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Security Notice */}
//         <div className="p-4 mt-6 border bg-blue-50/50 backdrop-blur-sm rounded-xl border-blue-200/50">
//           <div className="flex items-center space-x-3">
//             <IoShieldCheckmark className="flex-shrink-0 w-5 h-5 text-blue-600" />
//             <p className="text-sm text-blue-700">
//               <span className="font-semibold">Security Notice:</span> This
//               additional verification step helps protect your account from
//               unauthorized access.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyLogin;
