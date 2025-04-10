"use client";
import React from "react";
import LoginComponent from "./loginComponent/Logincomponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/user/loginSlice";

const loginUserApiRequest = async (
  email: string,
  password: string
): Promise<{ success: string; createdAt: string; message: string }> => {
  try {
    const { data } = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    });
    if (data.success == "mfa success") {
      window.location.href = "/login/verifyLogin";
      console.log(data);
    } else {
      console.log(data.message);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
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
