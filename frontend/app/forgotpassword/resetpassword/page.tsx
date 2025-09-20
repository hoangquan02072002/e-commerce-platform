// "use client";
// import axios from "axios";
// import React, { useState, FormEvent, ChangeEvent } from "react";

// const ResetPassword: React.FC = () => {
//   const [token, setToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (name === "token") {
//       setToken(value);
//     } else if (name === "newPassword") {
//       setNewPassword(value);
//     } else if (name === "confirmPassword") {
//       setConfirmPassword(value);
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/auth/reset-password",
//         {
//           token,
//           newPassword,
//           confirmPassword,
//         }
//       );
//       if (data.status == "Password reset successfully") {
//         window.location.href = "/login";
//         console.log(data);
//       } else {
//         console.log(data.message);
//       }
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 mx-4 bg-white shadow-md rounded-xl md:mx-0">
//         <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
//           Reset Password
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="token"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Enter Token
//             </label>
//             <input
//               type="text"
//               id="token"
//               name="token"
//               className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter your token"
//               value={token}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="newPassword"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               New Password
//             </label>
//             <input
//               type="password"
//               id="newPassword"
//               name="newPassword"
//               className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Enter your new password"
//               value={newPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block mb-2 text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               name="confirmPassword"
//               className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="Confirm your new password"
//               value={confirmPassword}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-6 py-3 text-sm font-medium text-white uppercase transition-colors bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;

"use client";
import axios from "axios";
import React, { useState, FormEvent, ChangeEvent } from "react";
import {
  KeyRound,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  Key,
  User,
  Mail,
  Info,
  Clock,
  Check,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

const ResetPassword: React.FC = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "token") {
      setToken(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (!token.trim()) {
      toast.error("Please enter the reset token!");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/reset-password",
        {
          token,
          newPassword,
          confirmPassword,
        }
      );

      if (data.status === "Password reset successfully") {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-emerald-400 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bg-blue-400 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-purple-400 rounded-full top-1/2 left-1/2 w-96 h-96 mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/forgotpassword">
            <button className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 shadow-lg hover:text-gray-900 bg-white/80 backdrop-blur-sm rounded-xl hover:shadow-xl">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Forgot Password</span>
            </button>
          </Link>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden border shadow-2xl bg-white/90 backdrop-blur-xl rounded-3xl border-white/20">
          {/* Header */}
          <div className="relative">
            <div className="h-32 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600"></div>
            <div className="absolute transform -translate-x-1/2 -bottom-8 left-1/2">
              <div className="flex items-center justify-center w-16 h-16 bg-white shadow-xl rounded-2xl">
                <RefreshCw className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pt-12 pb-8">
            {/* Title Section */}
            <div className="mb-8 text-center">
              <h1 className="mb-3 text-3xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                Reset Your Password
              </h1>
              <p className="leading-relaxed text-gray-600">
                Enter the token from your email and create a new secure password
                for your account.
              </p>
            </div>

            {/* Security Info Card */}
            <div className="p-6 mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl">
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

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Token Field */}
              <div className="space-y-2">
                <label
                  htmlFor="token"
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
                >
                  <Key className="w-4 h-4" />
                  <span>Reset Token</span>
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type="text"
                    id="token"
                    name="token"
                    value={token}
                    onChange={handleChange}
                    className="w-full px-4 py-4 pl-12 transition-all duration-300 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="Enter the token from your email"
                    required
                  />
                  <Key className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>Check your email for the reset token</span>
                </div>
              </div>

              {/* New Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="newPassword"
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
                >
                  <Lock className="w-4 h-4" />
                  <span>New Password</span>
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showPasswords.new ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-4 pl-12 pr-12 transition-all duration-300 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500"
                    placeholder="Enter your new password"
                    required
                  />
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("new")}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
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

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="flex items-center space-x-2 text-sm font-semibold text-gray-700"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>Confirm New Password</span>
                  <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <input
                    type={showPasswords.confirm ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-4 pl-12 pr-12 border-2 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 ${
                      confirmPassword && newPassword !== confirmPassword
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-emerald-500"
                    }`}
                    placeholder="Confirm your new password"
                    required
                  />
                  <KeyRound className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirm")}
                    className="absolute text-gray-500 transform -translate-y-1/2 right-4 top-1/2 hover:text-gray-700"
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

                {confirmPassword && newPassword === confirmPassword && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={
                  isLoading ||
                  !token ||
                  !newPassword ||
                  newPassword !== confirmPassword
                }
                className="w-full py-4 font-bold text-white transition-all duration-300 transform shadow-xl bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 rounded-2xl hover:shadow-2xl hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Resetting Password...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>RESET PASSWORD</span>
                  </div>
                )}
              </button>
            </form>

            {/* Additional Options */}
            <div className="pt-6 mt-8 border-t border-gray-200">
              <div className="space-y-4 text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the token?
                </p>

                <Link href="/forgotpassword">
                  <button className="w-full py-3 font-semibold transition-all duration-300 border-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-2xl border-emerald-200 hover:border-emerald-300">
                    Request New Token
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="p-6 mt-8 border shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl border-white/20">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Security Tips</span>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Use a unique password for this account
                </span>
              </div>
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Don't share your password with anyone
                </span>
              </div>
              <div className="flex items-center p-3 space-x-3 bg-gray-50 rounded-xl">
                <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                <span className="text-gray-700">
                  Consider using a password manager
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 space-x-2 text-xs text-white rounded-full bg-gray-800/80 backdrop-blur-sm">
            <Shield className="w-3 h-3" />
            <span>Your password is encrypted and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
