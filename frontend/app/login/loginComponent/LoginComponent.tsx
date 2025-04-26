// "use client";

// import React, { useState } from "react";
// import login from "../../../public/login.png";
// import Image from "next/image";
// import Link from "next/link";
// import { IoEyeOff } from "react-icons/io5";
// import { AppDispatch } from "@/redux/store";
// import { loginUser } from "@/redux/user/loginSlice";
// import getVisitorId from "@/utils/client";

// interface LoginComponentProps {
//   loginUserApiRequest: (
//     email: string,
//     password: string,
//     visitorId: string
//     // confirmpassword: string
//   ) => Promise<{ success: string; createdAt: string; message: string }>;
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

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [loginUserResponseState, setLoginUserResponseState] = useState({
//     success: "",
//     error: "",
//     loading: false,
//     message: "",
//   });

//   // const router = useRouter();
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       const visitorId = await getVisitorId();
//       setLoginUserResponseState({
//         loading: true,
//         success: "",
//         error: "",
//         message: "",
//       });
//       loginUserApiRequest(email, password, visitorId).then((data) => {
//         setLoginUserResponseState({
//           success: data.success,
//           message: data.message,
//           error: "",
//           loading: false,
//         });
//         if (data.success == "mfa success") {
//           window.location.href = "/login/verifyLogin";
//         } else if (data.success == "login success") {
//           reduxDispatch(setReduxUserState({ email, password, visitorId }));
//           window.location.href = "/";
//           console.log(data);
//         }
//       });
//     } catch (error) {
//       console.log(error);
//       setLoginUserResponseState({
//         loading: false,
//         success: "",
//         error: "An error occurred during login",
//         message: "",
//       });
//     }
//   };

//   return (
//     <div className="mt-8 flex items-center justify-center bg-[#EBEEF6]">
//       <div className="flex overflow-hidden w-full max-w-5xl bg-white rounded-lg shadow-lg">
//         {/* Left Section: Illustration */}
//         <div className="hidden justify-center items-center p-8 w-1/2 bg-blue-50 md:flex">
//           <Image src={login} alt="login" className="w-3/4 h-auto" />
//         </div>

//         {/* Right Section: Login Form */}
//         <div className="p-8 w-full md:w-1/2">
//           <h2 className="text-2xl font-bold text-green-600">Welcome Back</h2>
//           <p className="mt-2 text-sm text-gray-500">LOGIN TO CONTINUE</p>
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
//                 className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
//                   className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
//                 />
//                 <button
//                   type="button"
//                   className="flex absolute inset-y-0 right-3 items-center text-gray-500"
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
//                 className="py-2 w-full font-medium text-white bg-green-600 rounded-lg transition hover:bg-green-700"
//               >
//                 LOGIN
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
import { IoEyeOff } from "react-icons/io5";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/loginSlice";
import getVisitorId from "@/utils/client";

interface LoginComponentProps {
  loginUserApiRequest: (
    email: string,
    password: string,
    visitorId: string
  ) => Promise<{ success: string; createdAt: string; message: string }>;
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

        setLoginUserResponseState({
          success: data.success,
          message: data.message,
          error: "",
          loading: false,
        });

        if (data.success === "mfa success") {
          window.location.href = "/login/verifyLogin";
        } else if (data.success === "login success") {
          reduxDispatch(setReduxUserState({ email, password, visitorId }));
          window.location.href = "/";
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
    <div className="mt-8 flex items-center justify-center bg-[#EBEEF6]">
      <div className="flex overflow-hidden w-full max-w-5xl bg-white rounded-lg shadow-lg">
        {/* Left Section: Illustration */}
        <div className="hidden justify-center items-center p-8 w-1/2 bg-blue-50 md:flex">
          <Image src={login} alt="login" className="w-3/4 h-auto" />
        </div>

        {/* Right Section: Login Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-green-600">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">LOGIN TO CONTINUE</p>

          {/* Error message display */}
          {loginUserResponseState.error && (
            <div className="p-3 mt-4 text-sm text-white bg-red-500 rounded-md">
              {loginUserResponseState.error}
            </div>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  required
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-3 items-center text-gray-500"
                >
                  <IoEyeOff />
                </button>
              </div>
            </div>

            {/* Forget Password */}
            <div className="mb-4 text-right">
              <Link
                href="/forgotpassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Forget Password?
              </Link>
            </div>
            {/* Login Button */}
            <div>
              <button
                type="submit"
                disabled={loginUserResponseState.loading}
                className={`py-2 w-full font-medium text-white ${
                  loginUserResponseState.loading
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } rounded-lg transition`}
              >
                {loginUserResponseState.loading ? "LOGGING IN..." : "LOGIN"}
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-sm text-center text-gray-500">
            NEW USER?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-500 hover:underline"
            >
              SIGN UP
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
