// "use client";
// import axios from "axios";
// import React, { useState, FormEvent, ChangeEvent } from "react";

// const ForgetPassword: React.FC = () => {
//   const [email, setEmail] = useState("");

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/auth/forgot-password",
//         {
//           email,
//         }
//       );
//       if (data.status == "token sent to email successfully") {
//         window.location.href = "/forgotpassword/resetpassword";
//         console.log(data);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 mx-4 bg-white shadow-md rounded-xl md:mx-0">
//         <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Forgot Password
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="email"
//               className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter your email"
//               value={email}
//               onChange={handleEmailChange}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full px-6 py-3 text-sm font-medium text-white uppercase transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgetPassword;

"use client";
import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  Mail,
  ArrowLeft,
  Shield,
  KeyRound,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Lock,
  Eye,
  Clock,
  Send,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/forgot-password",
        { email }
      );

      if (data.status === "token sent to email successfully") {
        toast.success("Reset link sent to your email!");
        window.location.href = "/forgotpassword/resetpassword";
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-blue-400 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bg-purple-400 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-indigo-400 rounded-full top-1/2 left-1/2 w-96 h-96 mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/login">
            <button className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 shadow-lg hover:text-gray-900 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </button>
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden border shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl border-white/20">
          {/* Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
            <div className="absolute transform -translate-x-1/2 -bottom-8 left-1/2">
              <div className="flex items-center justify-center w-16 h-16 bg-white shadow-xl rounded-2xl">
                <KeyRound className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pt-12 pb-8">
            {/* Title Section */}
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                Forgot Password?
              </h1>
              <p className="leading-relaxed text-gray-600">
                Don't worry! Enter your email address and we'll send you a link
                to reset your password.
              </p>
            </div>

            {/* Info Cards */}
            <div className="mb-6 space-y-3">
              <div className="flex items-start p-4 space-x-3 border border-blue-200 bg-blue-50 rounded-2xl">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-900">
                    Secure Process
                  </h3>
                  <p className="text-xs text-blue-700">
                    Your account security is our top priority
                  </p>
                </div>
              </div>

              <div className="flex items-start p-4 space-x-3 border border-green-200 bg-green-50 rounded-2xl">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-900">
                    Quick Recovery
                  </h3>
                  <p className="text-xs text-green-700">
                    Reset link will arrive within minutes
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Address</span>
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl transition-all duration-300 focus:ring-4 focus:ring-blue-500/20 ${
                      email === ""
                        ? "border-gray-200 focus:border-blue-500"
                        : isEmailValid
                        ? "border-green-300 focus:border-green-500 bg-green-50/30"
                        : "border-red-300 focus:border-red-500 bg-red-50/30"
                    }`}
                    placeholder="Enter your registered email address"
                    required
                    autoComplete="email"
                  />

                  {/* Email Icon */}
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />

                  {/* Validation Icon */}
                  {email && (
                    <div className="absolute transform -translate-y-1/2 right-4 top-1/2">
                      {isEmailValid ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>

                {/* Email validation message */}
                {email && !isEmailValid && (
                  <div className="flex items-center space-x-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Please enter a valid email address</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !isEmailValid || !email}
                className="w-full py-4 font-bold text-white transition-all duration-300 transform shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Sending Reset Link...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>SEND RESET LINK</span>
                  </div>
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="space-y-4 text-center">
                <p className="text-sm text-gray-600">Remember your password?</p>

                <Link href="/login">
                  <button className="w-full py-3 font-semibold text-blue-600 transition-all duration-300 border-2 border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-2xl hover:border-blue-300">
                    Back to Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="p-6 mt-8 border shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Need Help?</span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Check your spam/junk folder if you don't receive the email
                </span>
              </div>
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Make sure you're using the correct email address
                </span>
              </div>
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Contact support if you continue having issues
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <Link href="/contact">
                <button className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700">
                  Contact Support →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 space-x-2 text-xs text-white rounded-full bg-gray-800/80 backdrop-blur-sm">
            <Lock className="w-3 h-3" />
            <span>Your data is protected with enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
