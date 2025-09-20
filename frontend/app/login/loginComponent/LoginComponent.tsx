// "use client";

// import React, { useState } from "react";
// import login from "../../../public/login.png";
// import Image from "next/image";
// import Link from "next/link";
// import { IoEyeOff } from "react-icons/io5";
// import { AppDispatch } from "@/redux/store";
// import { loginUser } from "@/redux/user/loginSlice";
// import getVisitorId from "@/utils/client";
// import { useRouter } from "next/navigation";

// interface LoginComponentProps {
//   loginUserApiRequest: (
//     email: string,
//     password: string,
//     visitorId: string
//   ) => Promise<any>;
//   reduxDispatch: AppDispatch;
//   setReduxUserState: typeof loginUser;
// }

// const LoginComponent: React.FC<LoginComponentProps> = ({
//   loginUserApiRequest,
//   reduxDispatch,
//   setReduxUserState,
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const [loginUserResponseState, setLoginUserResponseState] = useState({
//     success: "",
//     error: "",
//     loading: false,
//     message: "",
//   });

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();

//     // Reset error state
//     setLoginUserResponseState({
//       loading: true,
//       success: "",
//       error: "",
//       message: "",
//     });

//     try {
//       const visitorId = await getVisitorId();

//       try {
//         const data = await loginUserApiRequest(email, password, visitorId);
//         console.log("Response data:", data);

//         setLoginUserResponseState({
//           success: data.success,
//           message: data.message || "",
//           error: "",
//           loading: false,
//         });

//         if (data.success === "mfa success") {
//           router.push("/login/verifyLogin");
//         } else if (data.success === "login success") {
//           // Handle the nested structure from the backend
//           if (data.user_info) {
//             const { access_token } = data.user_info;
//             const userId = data.user_info.user?.id;

//             console.log("Extracted token:", access_token);
//             console.log("Extracted userId:", userId);

//             if (access_token && userId) {
//               // Dispatch to Redux with the correct data structure
//               await reduxDispatch(
//                 setReduxUserState({
//                   email,
//                   password,
//                   visitorId,
//                   // Pass the complete user_info object to Redux
//                   user_info: data.user_info,
//                 })
//               );
//               router.push("/");
//             } else {
//               console.error("Missing access_token or userId in response", data);
//               setLoginUserResponseState({
//                 loading: false,
//                 success: "",
//                 error:
//                   "Login successful but missing user data. Please try again.",
//                 message: "",
//               });
//             }
//           } else {
//             console.error("Missing user_info in response", data);
//             setLoginUserResponseState({
//               loading: false,
//               success: "",
//               error:
//                 "Login successful but missing user data. Please try again.",
//               message: "",
//             });
//           }
//         }
//       } catch (error: any) {
//         console.error("Login error:", error);

//         // Extract error message from the response
//         const errorMessage =
//           error.response?.data?.message ||
//           "Invalid email or password. Please try again.";

//         setLoginUserResponseState({
//           loading: false,
//           success: "",
//           error: errorMessage,
//           message: "",
//         });
//       }
//     } catch (error) {
//       console.error("Client error:", error);
//       setLoginUserResponseState({
//         loading: false,
//         success: "",
//         error: "An error occurred. Please try again later.",
//         message: "",
//       });
//     }
//   };

//   // Rest of the component remains the same
//   return (
//     <div className="mt-8 flex items-center justify-center bg-[#EBEEF6]">
//       <div className="flex w-full max-w-5xl overflow-hidden bg-white rounded-lg shadow-lg">
//         {/* Left Section: Illustration */}
//         <div className="items-center justify-center hidden w-1/2 p-8 bg-blue-50 md:flex">
//           <Image src={login} alt="login" className="w-3/4 h-auto" />
//         </div>
//         {/* Right Section: Login Form */}
//         <div className="w-full p-8 md:w-1/2">
//           <h2 className="text-2xl font-bold text-green-600">Welcome Back</h2>
//           <p className="mt-2 text-sm text-gray-500">LOGIN TO CONTINUE</p>

//           {/* Error message display */}
//           {loginUserResponseState.error && (
//             <div className="p-3 mt-4 text-sm text-white bg-red-500 rounded-md">
//               {loginUserResponseState.error}
//             </div>
//           )}

//           <form className="mt-6" onSubmit={handleSubmit}>
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
//                 required
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
//                   required
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 flex items-center text-gray-500 right-3"
//                 >
//                   <IoEyeOff />
//                 </button>
//               </div>
//             </div>

//             {/* Forget Password */}
//             <div className="mb-4 text-right">
//               <Link
//                 href="/forgotpassword"
//                 className="text-sm text-blue-500 hover:underline"
//               >
//                 Forget Password?
//               </Link>
//             </div>
//             {/* Login Button */}
//             <div>
//               <button
//                 type="submit"
//                 disabled={loginUserResponseState.loading}
//                 className={`py-2 w-full font-medium text-white ${
//                   loginUserResponseState.loading
//                     ? "bg-green-400 cursor-not-allowed"
//                     : "bg-green-600 hover:bg-green-700"
//                 } rounded-lg transition`}
//               >
//                 {loginUserResponseState.loading ? "LOGGING IN..." : "LOGIN"}
//               </button>
//             </div>
//           </form>

//           {/* Sign Up Link */}
//           <p className="mt-6 text-sm text-center text-gray-500">
//             NEW USER?{" "}
//             <Link
//               href="/register"
//               className="font-medium text-blue-500 hover:underline"
//             >
//               SIGN UP
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;

"use client";

import React, { useState } from "react";
import login from "../../../public/login.png";
import Image from "next/image";
import Link from "next/link";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/loginSlice";
import getVisitorId from "@/utils/client";
import { useRouter } from "next/navigation";

interface LoginComponentProps {
  loginUserApiRequest: (
    email: string,
    password: string,
    visitorId: string
  ) => Promise<any>;
  reduxDispatch: AppDispatch;
  setReduxUserState: typeof loginUser;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
  loginUserApiRequest,
  reduxDispatch,
  setReduxUserState,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [loginUserResponseState, setLoginUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Reset error state
    setLoginUserResponseState({
      loading: true,
      success: "",
      error: "",
      message: "",
    });

    try {
      const visitorId = await getVisitorId();

      try {
        const data = await loginUserApiRequest(email, password, visitorId);
        console.log("Response data:", data);

        setLoginUserResponseState({
          success: data.success,
          message: data.message || "",
          error: "",
          loading: false,
        });

        if (data.success === "mfa success") {
          router.push("/login/verifyLogin");
        } else if (data.success === "login success") {
          // Handle the nested structure from the backend
          if (data.user_info) {
            const { access_token } = data.user_info;
            const userId = data.user_info.user?.id;

            console.log("Extracted token:", access_token);
            console.log("Extracted userId:", userId);

            if (access_token && userId) {
              // Dispatch to Redux with the correct data structure
              await reduxDispatch(
                setReduxUserState({
                  email,
                  password,
                  visitorId,
                  // Pass the complete user_info object to Redux
                  user_info: data.user_info,
                })
              );
              router.push("/");
            } else {
              console.error("Missing access_token or userId in response", data);
              setLoginUserResponseState({
                loading: false,
                success: "",
                error:
                  "Login successful but missing user data. Please try again.",
                message: "",
              });
            }
          } else {
            console.error("Missing user_info in response", data);
            setLoginUserResponseState({
              loading: false,
              success: "",
              error:
                "Login successful but missing user data. Please try again.",
              message: "",
            });
          }
        }
      } catch (error: any) {
        console.error("Login error:", error);

        // Extract error message from the response
        const errorMessage =
          error.response?.data?.message ||
          "Invalid email or password. Please try again.";

        setLoginUserResponseState({
          loading: false,
          success: "",
          error: errorMessage,
          message: "",
        });
      }
    } catch (error) {
      console.error("Client error:", error);
      setLoginUserResponseState({
        loading: false,
        success: "",
        error: "An error occurred. Please try again later.",
        message: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="flex w-full max-w-6xl overflow-hidden border shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
        {/* Left Section: Illustration */}
        <div className="relative items-center justify-center hidden w-1/2 p-12 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-400 lg:flex">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <Image
              src={login}
              alt="Login Illustration"
              className="w-4/5 h-auto transition-transform duration-300 transform drop-shadow-2xl hover:scale-105"
            />
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Welcome Back
              </h3>
              <p className="text-lg leading-relaxed text-white/90">
                Sign in to your account and continue your journey with us.
              </p>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute w-20 h-20 rounded-full top-10 left-10 bg-white/10 blur-xl"></div>
          <div className="absolute w-32 h-32 rounded-full bottom-10 right-10 bg-white/10 blur-xl"></div>
        </div>

        {/* Right Section: Login Form */}
        <div className="w-full p-8 lg:w-1/2 lg:p-12">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text">
                Welcome Back
              </h2>
              <p className="mt-3 font-medium text-gray-600">
                LOGIN TO CONTINUE
              </p>
              <div className="w-20 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            </div>

            {/* Error message display */}
            {loginUserResponseState.error && (
              <div className="p-4 mb-6 border border-red-200 bg-red-50 rounded-xl">
                <p className="text-sm font-medium text-red-600">
                  {loginUserResponseState.error}
                </p>
              </div>
            )}

            {/* Success message display */}
            {loginUserResponseState.success && (
              <div className="p-4 mb-6 border border-blue-200 bg-blue-50 rounded-xl">
                <p className="text-sm font-medium text-blue-600">
                  {loginUserResponseState.message ||
                    loginUserResponseState.success}
                </p>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
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
                  className="block w-full px-4 py-3 placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
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
                    className="block w-full px-4 py-3 pr-12 placeholder-gray-400 transition-all duration-200 border border-gray-200 shadow-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent group-hover:border-gray-300 bg-gray-50/50 focus:bg-white"
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

              {/* Forget Password */}
              <div className="text-right">
                <Link
                  href="/forgotpassword"
                  className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loginUserResponseState.loading}
                className="w-full py-3 px-6 font-semibold text-white rounded-xl
                         bg-gradient-to-r from-blue-500 to-indigo-500
                         hover:from-blue-600 hover:to-indigo-600
                         focus:ring-4 focus:ring-blue-200
                         disabled:opacity-70 disabled:cursor-not-allowed
                         transition-all duration-200 transform hover:scale-[1.02]
                         shadow-lg hover:shadow-xl"
              >
                {loginUserResponseState.loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "SIGN IN"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
