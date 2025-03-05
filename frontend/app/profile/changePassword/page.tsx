/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { InputField } from "@/components/InputField";
import { ProfileImage } from "@/components/ProfileImage";
import React, { useState } from "react";

import logoprofile from "../../../public/logoprofile.png";
import { SidebarItem } from "@/components/SidebarItem";
import { UserProfile } from "@/lib/types";
import Link from "next/link";

const page = () => {
  const [activeSection, setActiveSection] = useState("/");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "Mark",
    lastName: "Cole",
    email: "swoo@gmail.com",
    phoneNumber: "+1 0231 4554 452",
    profileImage: logoprofile,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
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
  return (
    <main
      className="p-8 bg-white rounded-xl max-md:px-5"
      role="main"
      aria-labelledby="profile-heading"
    >
      <div className="flex gap-5 max-md:flex-col">
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
        <section
          className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full"
          aria-labelledby="section-heading"
        >
          <div className="flex flex-col items-start mt-1.5 w-full text-black max-md:mt-10 max-md:max-w-full">
            <h1
              id="section-heading"
              className="text-2xl font-bold leading-tight"
            >
              Account info
            </h1>

            <form
              // onSubmit={handleSubmit}
              className="w-full"
            >
              <InputField
                label="Email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
                isOptional={true}
                name="email"
                autoComplete="email"
              />

              <button
                type="submit"
                className="px-12 py-5 mt-11 text-xs font-medium text-center text-white uppercase whitespace-nowrap bg-green-600 rounded-xl transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 max-md:px-5 max-md:mt-10"
                aria-label="Save profile changes"
              >
                save
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default page;
