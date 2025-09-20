/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React from "react";
import RegisterComponent from "./registerComponent/RegisterComponent";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "@/redux/user/userSlice";
import { AppDispatch } from "@/redux/store";
import getIpAddress from "@/utils/getIpAddress";

const registerUserApiRequest = async (
  name: string,
  email: string,
  password: string
  // visitorId: string // Add visitorId as a parameter
): Promise<{ success: string; createdAt: string }> => {
  try {
    // const ipAddress = await getIpAddress();
    const { data } = await axios.post("http://localhost:5000/auth/register", {
      name,
      email,
      password,
      // visitorId, // Include visitorId in the request payload
    });

    if (data.status === "success sent code to email") {
      window.location.href = "/register/otp";
      console.log(data);
    } else {
      console.log(data.message);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      console.log(axiosError.response.data);
    } else {
      console.log("An error occurred. Please try again later.");
    }
    throw error;
  }
};
const Register = () => {
  const reduxDispatch = useDispatch<AppDispatch>();
  return (
    <RegisterComponent
      registerUserApiRequest={registerUserApiRequest}
      reduxDispatch={reduxDispatch}
      setReduxUserState={registerUser}
    />
  );
};

export default Register;
