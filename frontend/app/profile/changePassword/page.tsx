// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-hooks/rules-of-hooks */
// "use client";
// import { InputField } from "@/components/InputField";
// import { ProfileImage } from "@/components/ProfileImage";
// import React, { ChangeEvent, useState } from "react";
// import logoprofile from "../../../public/logoprofile.png";
// import { SidebarItem } from "@/components/SidebarItem";
// import { UserProfile } from "@/lib/types";
// import Link from "next/link";
// import axios from "axios";
// import { getToken } from "@/utils/getToken";
// const page = () => {
//   const [activeSection, setActiveSection] = useState("/");
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [profile, setProfile] = useState<UserProfile>({
//     firstName: "Mark",
//     lastName: "Cole",
//     email: "swoo@gmail.com",
//     phoneNumber: "+1 0231 4554 452",
//     profileImage: logoprofile,
//   });

//   const sidebarItems = [
//     {
//       id: "",
//       text: "Account info",
//       ariaLabel: "View account information",
//       onClick: () => setActiveSection("/"),
//       href: "/profile",
//     },
//     {
//       id: "orders",
//       text: "My order",
//       ariaLabel: "View my orders",
//       onClick: () => setActiveSection("orders"),
//       href: "/orders",
//     },
//     {
//       id: "address",
//       text: "My address",
//       ariaLabel: "Manage my addresses",
//       onClick: () => setActiveSection("address"),
//       href: "/address",
//     },
//     {
//       id: "changePassword",
//       text: "Change password",
//       ariaLabel: "Change account password",
//       onClick: () => setActiveSection("changePassword"),
//       href: "/profile/changePassword",
//     },
//   ];

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "email") {
//       setEmail(value);
//     } else if (name === "newPassword") {
//       setNewPassword(value);
//     } else if (name === "oldPassword") {
//       setOldPassword(value);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       const token = getToken();
//       console.log(token);
//       const { data } = await axios.post(
//         "http://localhost:5000/change-password/request-change-password",
//         {
//           email,
//           oldPassword,
//           newPassword,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (data.status == "otp sent to email") {
//         window.location.href = "/profile/changePassword/verifyotp";
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <main className="container px-4 py-8 mx-auto md:px-6 lg:px-8">
//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
//         <div className="lg:col-span-1">
//           <div className="p-6 bg-white shadow-sm rounded-xl">
//             <ProfileImage
//               src={profile.profileImage.src}
//               alt={`Profile picture of ${profile.firstName} ${profile.lastName}`}
//             />
//             <div className="mt-4 text-xl font-bold">
//               {`${profile.firstName} ${profile.lastName}`}
//             </div>
//             <div className="mt-2 text-gray-600">{profile.email}</div>
//             <nav className="mt-6 space-y-2">
//               {sidebarItems.map((item) => (
//                 <Link key={item.id} href={item.href}>
//                   <SidebarItem
//                     text={item.text}
//                     isActive={activeSection === item.id}
//                     onClick={item.onClick}
//                     ariaLabel={item.ariaLabel}
//                   />
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>

//         <div className="lg:col-span-3">
//           <div className="p-6 bg-white shadow-sm rounded-xl">
//             <h2 className="mb-6 text-2xl font-bold text-gray-800">
//               Change Password
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block mb-2 text-sm font-medium text-gray-700"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="oldPassword"
//                   className="block mb-2 text-sm font-medium text-gray-700"
//                 >
//                   Current Password
//                 </label>
//                 <input
//                   type="password"
//                   id="oldPassword"
//                   name="oldPassword"
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter your current password"
//                   value={oldPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="newPassword"
//                   className="block mb-2 text-sm font-medium text-gray-700"
//                 >
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   id="newPassword"
//                   name="newPassword"
//                   className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter your new password"
//                   value={newPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full px-6 py-3 text-sm font-medium text-white uppercase transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//               >
//                 Change Password
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default page;

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
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Package,
  Smartphone,
  Camera,
  ArrowLeft,
  CheckCircle,
  Crown,
  KeyRound,
  AlertTriangle,
  Info,
  Sparkles,
  TrendingUp,
  Award,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const [activeSection, setActiveSection] = useState("changePassword");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const [profile, setProfile] = useState<UserProfile>({
    firstName: "QUAN",
    lastName: "NGUYEN",
    email: "hoangquan02072002@gmail.com",
    phoneNumber: "+7 968 476 5358",
    profileImage: logoprofile,
  });

  const sidebarItems = [
    {
      id: "account",
      text: "Account Info",
      icon: User,
      ariaLabel: "View account information",
      onClick: () => setActiveSection("account"),
      href: "/profile",
      badge: null,
    },
    {
      id: "orders",
      text: "My Orders",
      icon: Package,
      ariaLabel: "View my orders",
      onClick: () => setActiveSection("orders"),
      href: "/order",
      badge: "3",
    },
    {
      id: "devices",
      text: "Devices",
      icon: Smartphone,
      ariaLabel: "Manage logged in devices",
      onClick: () => setActiveSection("devices"),
      href: "/device",
      badge: null,
    },
    {
      id: "changePassword",
      text: "Security",
      icon: Shield,
      ariaLabel: "Change account password",
      onClick: () => setActiveSection("changePassword"),
      href: "/profile/changePassword",
      badge: null,
    },
  ];

  const stats = [
    { label: "Orders", value: "24", icon: Package, color: "blue" },
    { label: "Reviews", value: "18", icon: Star, color: "yellow" },
    { label: "Points", value: "1,250", icon: Award, color: "purple" },
    { label: "Level", value: "Gold", icon: Crown, color: "amber" },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "oldPassword") {
      setOldPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: "Weak", color: "red", width: "33%" };
    if (strength <= 3)
      return { level: "Medium", color: "yellow", width: "66%" };
    return { level: "Strong", color: "green", width: "100%" };
  };

  const passwordStrength = getPasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    setIsLoading(true);

    try {
      const token = getToken();
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

      if (data.status === "otp sent to email") {
        toast.success("🔐 OTP sent to your email!");
        window.location.href = "/profile/changePassword/verifyotp";
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <button className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 bg-white shadow-md hover:text-gray-900 rounded-xl hover:shadow-lg">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Profile</span>
                </button>
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                  Change Password
                </h1>
                <p className="mt-2 text-gray-600">
                  Update your account password for better security
                </p>
              </div>
            </div>

            <div className="flex items-center px-4 py-2 space-x-2 text-green-700 bg-green-100 rounded-xl">
              <Shield className="w-5 h-5" />
              <span className="font-semibold">Secure Area</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-24 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
                <div className="absolute transform -translate-x-1/2 -bottom-12 left-1/2">
                  <div className="relative">
                    <ProfileImage
                      src={profile.profileImage.src}
                      alt={`Profile picture of ${profile.firstName} ${profile.lastName}`}
                      className="w-24 h-24 border-4 border-white rounded-full shadow-lg"
                    />
                    <button className="absolute bottom-0 right-0 p-2 text-white transition-colors bg-blue-500 rounded-full shadow-lg hover:bg-blue-600">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="px-6 pt-16 pb-6 text-center">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  {`${profile.firstName} ${profile.lastName}`}
                </h2>
                <p className="mb-4 text-sm text-gray-600">{profile.email}</p>

                {/* Member Status */}
                <div className="inline-flex items-center px-4 py-2 space-x-2 border rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-200">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">
                    Gold Member
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="px-4 pb-6">
                <div className="space-y-2">
                  {sidebarItems.map((item) => (
                    <Link key={item.id} href={item.href}>
                      <div
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                          activeSection === item.id
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                            : "text-gray-700 hover:bg-gray-50 hover:shadow-md"
                        }`}
                        onClick={item.onClick}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon
                            className={`w-5 h-5 ${
                              activeSection === item.id
                                ? "text-white"
                                : "text-gray-500"
                            }`}
                          />
                          <span className="font-medium">{item.text}</span>
                        </div>
                        {item.badge && (
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              activeSection === item.id
                                ? "bg-white/20 text-white"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {item.badge}
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Quick Stats */}
              <div className="px-4 pb-6">
                <div className="p-4 border border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl">
                  <h3 className="flex items-center mb-3 text-sm font-semibold text-gray-700">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Quick Stats
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-8 h-8 mx-auto mb-1 rounded-lg flex items-center justify-center bg-${stat.color}-100`}
                        >
                          <stat.icon
                            className={`w-4 h-4 text-${stat.color}-600`}
                          />
                        </div>
                        <div className="text-sm font-bold text-gray-900">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 shadow-xl rounded-3xl">
              <div className="p-8">
                {/* Section Header */}
                <div className="flex items-center mb-8 space-x-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <KeyRound className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Password Security
                    </h2>
                    <p className="text-gray-600">
                      Keep your account secure with a strong password
                    </p>
                  </div>
                </div>

                {/* Security Info Card */}
                <div className="p-6 mb-8 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <Info className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-blue-900">
                        Password Requirements
                      </h3>
                      <ul className="space-y-2 text-blue-800">
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>At least 8 characters long</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Include uppercase and lowercase letters</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Include at least one number</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span>Include special characters (!@#$%^&*)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Password Change Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Lock className="w-4 h-4" />
                      <span>Current Password</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.old ? "text" : "password"}
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter your current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("old")}
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      >
                        {showPasswords.old ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <KeyRound className="w-4 h-4" />
                      <span>New Password</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter your new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("new")}
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      >
                        {showPasswords.new ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Password Strength Indicator */}
                    {newPassword && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Password Strength:
                          </span>
                          <span
                            className={`text-sm font-semibold text-${passwordStrength.color}-600`}
                          >
                            {passwordStrength.level}
                          </span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full">
                          <div
                            className={`h-2 rounded-full bg-${passwordStrength.color}-500 transition-all duration-300`}
                            style={{ width: passwordStrength.width }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <KeyRound className="w-4 h-4" />
                      <span>Confirm New Password</span>
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pr-12 border-2 rounded-xl focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 ${
                          confirmPassword && newPassword !== confirmPassword
                            ? "border-red-300 focus:border-red-500"
                            : "border-gray-200 focus:border-blue-500"
                        }`}
                        placeholder="Confirm your new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("confirm")}
                        className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {confirmPassword && newPassword !== confirmPassword && (
                      <div className="flex items-center space-x-2 text-sm text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Passwords don't match</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={
                        isLoading ||
                        !email ||
                        !oldPassword ||
                        !newPassword ||
                        newPassword !== confirmPassword
                      }
                      className="w-full py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-2xl hover:shadow-xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          <span>Changing Password...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span>CHANGE PASSWORD</span>
                        </div>
                      )}
                    </button>
                  </div>
                </form>

                {/* Security Tips */}
                <div className="pt-8 mt-8 border-t border-gray-200">
                  <div className="p-6 text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
                    <div className="space-y-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <Sparkles className="w-5 h-5" />
                        <span className="font-bold">Security Tips</span>
                      </div>

                      <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Use a unique password for this account</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Don't share your password with anyone</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Enable two-factor authentication</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>Change password regularly</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
