/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import register from "../../../public/login.png";
import Link from "next/link";
import { IoEyeOff } from "react-icons/io5";

// import axios, { AxiosError } from "axios";
// import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import { registerUser } from "@/redux/user/userSlice";

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
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [registerUserResponseState, setRegisterUserResponseState] = useState({
    success: "",
    error: "",
    loading: false,
  });
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   try {
  //     setRegisterUserResponseState({ loading: true, success: "", error: "" });
  //     registerUserApiRequest(name, email, password, confirmPassword).then(
  //       (data) => {
  //         setRegisterUserResponseState({
  //           success: data.success,
  //           error: "",
  //           loading: false,
  //         });
  //         reduxDispatch(setReduxUserState(data.createdAt));
  //       }
  //     );
  //   } catch (er) {
  //     setRegisterUserResponseState({
  //       error: er.response.data.message
  //         ? er.response.data.message
  //         : er.response.data,
  //     });
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setRegisterUserResponseState({ loading: true, success: "", error: "" });
      const data = await registerUserApiRequest(
        name,
        email,
        password
        // confirmPassword
      );
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
    <div className="min-h-screen flex items-center justify-center bg-[#EBEEF6]">
      <div className="flex overflow-hidden w-full max-w-5xl bg-white rounded-lg shadow-lg">
        {/* Left Section: Illustration */}
        <div className="hidden justify-center items-center p-8 w-1/2 bg-blue-50 md:flex">
          <Image src={register} alt="Illustration" className="w-3/4 h-auto" />
        </div>

        {/* Right Section: Registration Form */}
        <div className="p-8 w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-green-600">Register</h2>
          <p className="mt-2 text-sm text-gray-500">JOIN TO US</p>
          <form className="mt-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="nguyen le"
                className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

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
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-3 items-center text-gray-500"
                >
                  <IoEyeOff />
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            {/* <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block px-4 py-2 mt-1 w-full rounded-lg border border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <button
                  type="button"
                  className="flex absolute inset-y-0 right-3 items-center text-gray-500"
                >
                  <IoEyeOff />
                </button>
              </div>
            </div> */}

            {/* Register Button */}
            <div>
              <button
                type="submit"
                className="py-2 w-full font-medium text-white bg-green-600 rounded-lg transition hover:bg-green-700"
                disabled={registerUserResponseState.loading}
              >
                {registerUserResponseState.loading
                  ? "Registering..."
                  : "REGISTER"}
              </button>
              {registerUserResponseState.error && (
                <p className="text-red-500">
                  {registerUserResponseState.error}
                </p>
              )}
              {registerUserResponseState.success && (
                <p className="text-green-500">
                  {registerUserResponseState.success}
                </p>
              )}
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-sm text-center text-gray-500">
            ALREADY USER?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-500 hover:underline"
            >
              LOGIN
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
