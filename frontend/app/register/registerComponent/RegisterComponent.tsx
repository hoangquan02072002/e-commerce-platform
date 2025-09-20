/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import Image from "next/image";
// import React, { useState } from "react";
// import register from "../../../public/login.png";
// import Link from "next/link";
// import { IoEyeOff } from "react-icons/io5";

// // import axios, { AxiosError } from "axios";
// // import { useRouter } from "next/navigation";
// import { AppDispatch } from "@/redux/store";
// import { registerUser } from "@/redux/user/userSlice";
// import getVisitorId from "@/utils/client";

// interface RegisterComponentProps {
//   registerUserApiRequest: (
//     name: string,
//     email: string,
//     password: string
//     // confirmpassword: string
//   ) => Promise<{ success: string; createdAt: string }>;
//   reduxDispatch: AppDispatch;
//   setReduxUserState: typeof registerUser;
// }
// const RegisterComponent: React.FC<RegisterComponentProps> = ({
//   registerUserApiRequest,
//   reduxDispatch,
//   setReduxUserState,
// }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [registerUserResponseState, setRegisterUserResponseState] = useState({
//     success: "",
//     error: "",
//     loading: false,
//   });
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();

//     try {
//       setRegisterUserResponseState({ loading: true, success: "", error: "" });
//       const data = await registerUserApiRequest(name, email, password);
//       console.log(data);
//       setRegisterUserResponseState({
//         success: data.success,
//         error: "",
//         loading: false,
//       });
//       reduxDispatch(
//         setReduxUserState({
//           name,
//           email,
//           password,
//           // confirmpassword: confirmPassword,
//         })
//       );
//     } catch (error: any) {
//       console.log(error);
//       setRegisterUserResponseState({
//         success: "",
//         error:
//           error.response?.data?.message ||
//           "An error occurred. Please try again later.",
//         loading: false,
//       });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#EBEEF6]">
//       <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg">
//         {/* Left Section: Illustration */}
//         <div className="items-center justify-center hidden w-1/2 p-8 bg-blue-50 md:flex">
//           <Image src={register} alt="Illustration" className="w-3/4 h-auto" />
//         </div>

//         {/* Right Section: Registration Form */}
//         <div className="w-full p-8 md:w-1/2">
//           <h2 className="text-2xl font-bold text-green-600">Register</h2>
//           <p className="mt-2 text-sm text-gray-500">JOIN TO US</p>
//           <form className="mt-6" onSubmit={handleSubmit}>
//             {/* Name Field */}
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="nguyen le"
//                 className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               />
//             </div>

//             {/* Email Field */}
//             <div className="mb-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Example@gmail.com"
//                 className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//               />
//             </div>

//             {/* Password Field */}
//             <div className="mb-4">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="••••••••"
//                   className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 flex items-center text-gray-500 right-3"
//                 >
//                   <IoEyeOff />
//                 </button>
//               </div>
//             </div>
//             {/* Register Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="w-full py-2 font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
//                 disabled={registerUserResponseState.loading}
//               >
//                 {registerUserResponseState.loading
//                   ? "Registering..."
//                   : "REGISTER"}
//               </button>
//               {registerUserResponseState.error && (
//                 <p className="text-red-500">
//                   {registerUserResponseState.error}
//                 </p>
//               )}
//               {registerUserResponseState.success && (
//                 <p className="text-green-500">
//                   {registerUserResponseState.success}
//                 </p>
//               )}
//             </div>
//           </form>

//           {/* Login Link */}
//           <p className="mt-6 text-sm text-center text-gray-500">
//             ALREADY USER?{" "}
//             <Link
//               href="/login"
//               className="font-medium text-blue-500 hover:underline"
//             >
//               LOGIN
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterComponent;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import register from "../../../public/login.png";
import Link from "next/link";
import { IoEyeOff, IoEye } from "react-icons/io5";

// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/user/userSlice";
import getVisitorId from "@/utils/client";

interface RegisterComponentProps {
  registerUserApiRequest: (
    name: string,
    email: string,
    password: string
    // confirmpassword: string
  ) => Promise<{ success: string; createdAt: string }>;
  reduxDispatch: AppDispatch;
  setReduxUserState: typeof registerUser;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({
  registerUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setRegisterUserResponseState({ loading: true, success: "", error: "" });
      const data = await registerUserApiRequest(name, email, password);
      console.log(data);
      setRegisterUserResponseState({
        success: data.success,
        error: "",
        loading: false,
      });
      reduxDispatch(
        setReduxUserState({
          name,
          email,
          password,
          // confirmpassword: confirmPassword,
        })
      );
    } catch (error: any) {
      console.log(error);
      setRegisterUserResponseState({
        success: "",
        error:
          error.response?.data?.message ||
          "An error occurred. Please try again later.",
        loading: false,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex w-full max-w-6xl overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
        {/* Left Section: Illustration */}
        <div className="relative items-center justify-center hidden w-1/2 p-12 overflow-hidden bg-gradient-to-br from-emerald-400 to-cyan-400 lg:flex">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <Image
              src={register}
              alt="Registration Illustration"
              className="w-4/5 h-auto transition-transform duration-300 transform drop-shadow-2xl hover:scale-105"
            />
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Join Our Community
              </h3>
              <p className="text-lg leading-relaxed text-white/90">
                Create your account and start your amazing journey with us
                today.
              </p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-white/10 blur-xl"></div>
          <div className="absolute w-32 h-32 rounded-full bottom-10 right-10 bg-white/10 blur-xl"></div>
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-full p-8 lg:w-1/2 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text">
                Create Account
              </h2>
              <p className="mt-3 font-medium text-gray-600">
                JOIN OUR COMMUNITY
              </p>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="group">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="block w-full px-4 py-3 placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="block w-full px-4 py-3 placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="group">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full px-4 py-3 pr-12 placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showPassword ? (
                      <IoEye className="w-5 h-5" />
                    ) : (
                      <IoEyeOff className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error/Success Messages */}
              {registerUserResponseState.error && (
                <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                  <p className="text-sm font-medium text-red-600">
                    {registerUserResponseState.error}
                  </p>
                </div>
              )}

              {registerUserResponseState.success && (
                <div className="p-4 border bg-emerald-50 border-emerald-200 rounded-xl">
                  <p className="text-sm font-medium text-emerald-600">
                    {registerUserResponseState.success}
                  </p>
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={registerUserResponseState.loading}
                className="w-full py-3 px-6 font-semibold text-white rounded-xl
                         bg-gradient-to-r from-emerald-500 to-cyan-500
                         hover:from-emerald-600 hover:to-cyan-600
                         focus:ring-4 focus:ring-emerald-200
                         disabled:opacity-70 disabled:cursor-not-allowed
                         transition-all duration-200 transform hover:scale-[1.02]
                         shadow-lg hover:shadow-xl"
              >
                {registerUserResponseState.loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "CREATE ACCOUNT"
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold transition-colors duration-200 text-emerald-600 hover:text-emerald-700 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
