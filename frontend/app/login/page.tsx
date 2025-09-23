"use client";
import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/loginSlice";
import LoginComponent from "./loginComponent/LoginComponent";
import getIpAddress from "@/utils/getIpAddress";

const loginUserApiRequest = async (
  email: string,
  password: string,
  visitorId: string
): Promise<any> => {
  try {
    const ipAddress = await getIpAddress();
    const { data } = await axios.post(
      "http://localhost:5000/auth/login",
      {
        email,
        password,
        visitorId,
      },
      {
        headers: {
          "x-test-ip": ipAddress,
        },
      }
    );

    console.log("Login API response:", data);

    // Return the complete response data without modifying it
    // This preserves the backend structure: { user_info: {...}, success: "login success" }
    return data;
  } catch (error) {
    console.error("API request error:", error);
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("An unexpected error occurred during login");
  }
};

const Login = () => {
  const reduxDispatch = useDispatch<AppDispatch>();
  return (
    <LoginComponent
      loginUserApiRequest={loginUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={loginUser}
    />
  );
};

export default Login;
