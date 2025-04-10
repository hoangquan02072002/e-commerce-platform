/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { InputField } from "@/components/InputField";
import { ProfileImage } from "@/components/ProfileImage";
import React, { ChangeEvent, useState } from "react";
import logoprofile from "../../../public/logoprofile.png";
import { SidebarItem } from "@/components/SidebarItem";
import { UserProfile } from "@/lib/types";
import Link from "next/link";
import axios from "axios";
import { getToken } from "@/utils/getToken";

const page = () => {
  const [activeSection, setActiveSection] = useState("/");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Mark",
    lastName: "Cole",
    email: "swoo@gmail.com",
    phoneNumber: "+1 0231 4554 452",
    profileImage: logoprofile,
  });
  const sidebarItems = [
    {
      id: "",
      text: "Account info",
      ariaLabel: "View account information",
      onClick: () => setActiveSection("/"),
      href: "/profile",
    },
    {
      id: "orders",
      text: "My order",
      ariaLabel: "View my orders",
      onClick: () => setActiveSection("orders"),
      href: "/orders",
    },
    {
      id: "address",
      text: "My address",
      ariaLabel: "Manage my addresses",
      onClick: () => setActiveSection("address"),
      href: "/address",
    },
    {
      id: "changePassword",
      text: "Change password",
      ariaLabel: "Change account password",
      onClick: () => setActiveSection("changePassword"),
      href: "/profile/changePassword",
    },
  ];
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "oldPassword") {
      setOldPassword(value);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const token = getToken();
      console.log(token);
      const { data } = await axios.post(
        "http://localhost:5000/change-password/request-change-password",
        {
          email,
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == "otp sent to email") {
        window.location.href = "/profile/changePassword/verifyotp";
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <main
      className="p-8 bg-white rounded-xl max-md:px-5"
      role="main"
      aria-labelledby="profile-heading"
    >
      <div className="flex gap-5 justify-between items-center max-md:flex-col">
        <div
          className="flex flex-col w-[21%] max-md:ml-0 max-md:w-full"
          role="complementary"
          aria-label="Profile navigation"
        >
          <div className="flex flex-col px-5 py-6 mx-auto w-full text-sm text-black rounded-xl bg-neutral-50 max-md:mt-10">
            <ProfileImage
              src={profile.profileImage.src}
              alt={`Profile picture of ${profile.firstName} ${profile.lastName}`}
            />
            <div className="self-start mt-5 text-xl font-bold leading-tight">
              {`${profile.firstName} ${profile.lastName}`}
            </div>
            <div className="self-start mt-8 leading-loose text-stone-500">
              {profile.email}
            </div>
            <nav role="navigation" aria-label="Account sections">
              {sidebarItems.map((item) => (
                <Link key={item.id} href={item.href}>
                  <SidebarItem
                    text={item.text}
                    isActive={activeSection === item.id}
                    onClick={item.onClick}
                    ariaLabel={item.ariaLabel}
                  />
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <div className="flex justify-center items-center w-3/4 min-h-screen bg-gray-100">
          <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
            <h2 className="mb-6 text-2xl font-semibold">Forget Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Enter email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="p-2 w-full rounded-md border"
                  placeholder="Enter your token"
                  value={email}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Enter old Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="oldPassword"
                  className="p-2 w-full rounded-md border"
                  placeholder="Enter your password"
                  value={oldPassword}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-bold text-gray-700"
                >
                  Enter new password
                </label>
                <input
                  type="NewPassword"
                  id="NewPassword"
                  name="newPassword"
                  className="p-2 w-full rounded-md border"
                  placeholder="Enter your ConfirmPassword"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 w-full text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
