"use client";
import * as React from "react";
import { useState } from "react";
import { ProfileImage } from "../../components/ProfileImage";
import { SidebarItem } from "../../components/SidebarItem";
import { InputField } from "../../components/InputField";
import { UserProfile } from "../../lib/types";
import logoprofile from "../../public/logoprofile.png";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Shield,
  Package,
  Smartphone,
  Camera,
  Edit3,
  Save,
  Settings,
  Bell,
  Star,
  Award,
  Crown,
  Sparkles,
  CheckCircle,
  MapPin,
  Calendar,
  Activity,
  TrendingUp,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userLogin.user);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: userInfo?.name || "QUANNGUYEN",
    lastName: "LE",
    email: userInfo?.email || "",
    phoneNumber: "+7 968 476 5358",
    profileImage: logoprofile,
  });
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProfile({
        ...profile,
        ...formData,
      });
      setIsEditing(false);
      // Show success notification
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

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
      id: "order",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                My Profile
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="flex items-center px-4 py-2 space-x-2 text-green-700 bg-green-100 rounded-xl">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Verified Account</span>
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
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Account Information
                      </h2>
                      <p className="text-gray-600">
                        Update your personal details and contact information
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isEditing
                        ? "bg-gray-500 hover:bg-gray-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <span>Cancel</span>
                      </>
                    ) : (
                      <>
                        <Edit3 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Account Stats Cards */}
                <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="p-6 transition-all duration-300 border border-gray-100 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl hover:shadow-lg"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 bg-${stat.color}-100 rounded-xl`}>
                          <stat.icon
                            className={`w-6 h-6 text-${stat.color}-600`}
                          />
                        </div>
                        <Sparkles className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="mb-1 text-2xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Profile Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <User className="w-4 h-4" />
                        <span>First Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="Enter your first name"
                          required
                        />
                      ) : (
                        <div className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 bg-gray-50 rounded-xl">
                          {profile.firstName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <User className="w-4 h-4" />
                        <span>Last Name</span>
                        <span className="text-red-500">*</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                          placeholder="Enter your last name"
                          required
                        />
                      ) : (
                        <div className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 bg-gray-50 rounded-xl">
                          {profile.lastName}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Mail className="w-4 h-4" />
                      <span>Email Address</span>
                      <span className="text-red-500">*</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter your email address"
                        required
                      />
                    ) : (
                      <div className="flex items-center justify-between w-full px-4 py-3 text-gray-900 border-2 border-gray-200 bg-gray-50 rounded-xl">
                        <span>{profile.email}</span>
                        <div className="flex items-center space-x-2 text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                      <span className="text-xs text-gray-400">(Optional)</span>
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 transition-all duration-300 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="w-full px-4 py-3 text-gray-900 border-2 border-gray-200 bg-gray-50 rounded-xl">
                        {profile.phoneNumber || "Not provided"}
                      </div>
                    )}
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Calendar className="w-4 h-4" />
                        <span>Member Since</span>
                      </label>
                      <div className="w-full px-4 py-3 font-semibold text-blue-700 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        March 2024
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                        <Activity className="w-4 h-4" />
                        <span>Last Active</span>
                      </label>
                      <div className="w-full px-4 py-3 font-semibold text-green-700 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                        Just now
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex items-center pt-6 space-x-4 border-t border-gray-200">
                      <button
                        type="submit"
                        className="flex items-center px-8 py-4 space-x-2 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl hover:shadow-xl hover:scale-105"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setFormData({
                            firstName: profile.firstName,
                            lastName: profile.lastName,
                            email: profile.email,
                            phoneNumber: profile.phoneNumber,
                          });
                        }}
                        className="px-8 py-4 font-semibold text-white transition-all duration-300 bg-gray-500 shadow-lg hover:bg-gray-600 rounded-xl hover:shadow-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>

                {/* Security Section */}
                {!isEditing && (
                  <div className="pt-8 mt-8 border-t border-gray-200">
                    <h3 className="flex items-center mb-4 text-lg font-bold text-gray-900">
                      <Shield className="w-5 h-5 mr-2 text-blue-600" />
                      Security & Privacy
                    </h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <Link href="/profile/changePassword">
                        <div className="p-4 transition-all duration-300 border-2 border-purple-200 cursor-pointer bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-lg">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Shield className="w-5 h-5 text-purple-600" />
                              <div>
                                <div className="font-semibold text-purple-900">
                                  Change Password
                                </div>
                                <div className="text-sm text-purple-600">
                                  Update your password
                                </div>
                              </div>
                            </div>
                            <Edit3 className="w-4 h-4 text-purple-600" />
                          </div>
                        </div>
                      </Link>

                      <div className="p-4 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Bell className="w-5 h-5 text-blue-600" />
                            <div>
                              <div className="font-semibold text-blue-900">
                                Notifications
                              </div>
                              <div className="text-sm text-blue-600">
                                Manage your preferences
                              </div>
                            </div>
                          </div>
                          <Settings className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
