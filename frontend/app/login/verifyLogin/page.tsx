// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import axios from "axios";
// import React, { useState } from "react";

// const VerifyLogin = () => {
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/auth/verify-mfa-device",
//         {
//           otp,
//         }
//       );
//       if (data.success == "login success") {
//         window.location.href = "/";
//         console.log(data);
//       } else {
//         console.log(data.message);
//       }
//       // setMessage(response.data.message);
//       // setError("");

//       // router.push("/login");
//       return data;
//     } catch (error: any) {
//       console.log(error);
//       setError(error.response?.data?.message || "An error occurred");
//       setMessage("");
//     }
//   };
//   return (
//     // <div className="flex justify-center items-center w-full h-44">
//     //   <div className="space-y-2">
//     //     <InputOTP
//     //       maxLength={6}
//     //       value={value}
//     //       onChange={(value) => setValue(value)}
//     //     >
//     //       <InputOTPGroup>
//     //         <InputOTPSlot index={0} />
//     //         <InputOTPSlot index={1} />
//     //         <InputOTPSlot index={2} />
//     //         <InputOTPSlot index={3} />
//     //         <InputOTPSlot index={4} />
//     //         <InputOTPSlot index={5} />
//     //       </InputOTPGroup>
//     //     </InputOTP>
//     //     <div className="text-sm text-center">
//     //       {value === "" ? (
//     //         <>Enter your one-time password.</>
//     //       ) : (
//     //         <>You entered: {value}</>
//     //       )}
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
//         <h2 className="mb-6 text-2xl font-semibold">Verify MFA Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="otp"
//               className="block mb-2 text-sm font-bold text-gray-700"
//             >
//               OTP
//             </label>
//             <input
//               type="text"
//               id="otp"
//               name="otp"
//               className="p-2 w-full rounded-md border"
//               placeholder="Enter your OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="p-2 w-full text-white bg-blue-500 rounded-md"
//           >
//             Verify
//           </button>
//         </form>
//         {message && <p className="mt-4 text-green-500">{message}</p>}
//         {error && <p className="mt-4 text-red-500">{error}</p>}
//       </div>
//     </div>
//   );
// };

// export default VerifyLogin;
"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "@/redux/user/userSlice";
import { AppDispatch, RootState } from "@/redux/store"; // You'll need to create this type

const VerifyLogin = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, token } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Redirect if token exists
    if (token) {
      window.location.href = "/";
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(verifyOTP({ otp }));

      if (verifyOTP.fulfilled.match(resultAction)) {
        // If verification was successful, the token will be stored in Redux and localStorage
        // The useEffect above will handle redirection
        window.location.href = "/";
        console.log("OTP verification successful");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="p-6 w-full max-w-md bg-white rounded-md shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Verify MFA</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="otp"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="p-2 w-full rounded-md border"
              placeholder="Enter your OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="p-2 w-full text-white bg-blue-500 rounded-md"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default VerifyLogin;
