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
    <main className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <ProfileImage
              src={profile.profileImage.src}
              alt={`Profile picture of ${profile.firstName} ${profile.lastName}`}
            />
            <div className="mt-4 text-xl font-bold">
              {`${profile.firstName} ${profile.lastName}`}
            </div>
            <div className="mt-2 text-gray-600">{profile.email}</div>
            <nav className="mt-6 space-y-2">
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

        <div className="lg:col-span-3">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">
              Change Password
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="oldPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your current password"
                  value={oldPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="px-4 py-3 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 w-full text-sm font-medium text-white uppercase bg-green-600 rounded-lg transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
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
