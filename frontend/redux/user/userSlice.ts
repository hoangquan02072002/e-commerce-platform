import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface UserState {
  user: null | { name: string; email: string };
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  token:
    typeof window !== "undefined" ? localStorage.getItem("access_token") : null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (
    userData: {
      name: string;
      email: string;
      password: string;
      // confirmpassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        userData
      );
      return response.data; // Return the response data
    } catch (error) {
      // Handle error and return a rejected value
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

// export const verifyOTP = createAsyncThunk(
//   "user/verifyOTP",
//   async (otpData: { otp: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/verify-mfa-device",
//         otpData
//       );

//       if (
//         response.data.success === "login success" &&
//         response.data.user_info.access_token
//       ) {
//         // Store token in localStorage
//         localStorage.setItem(
//           "access_token",
//           response.data.user_info.access_token
//         );
//         localStorage.setItem("user", JSON.stringify(response.data));
//         return response.data;
//       }
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         return rejectWithValue(error.response.data.message);
//       }
//       return rejectWithValue("An unexpected error occurred.");
//     }
//   }
// );

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async ({ otp }: { otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/verify-mfa-device",
        { otp }
      );

      console.log("OTP verification response:", response.data);

      // Return the complete response data
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(
        "An unexpected error occurred during OTP verification."
      );
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null; // Clear the error message
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
        state.error = null; // Clear any previous error
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ name: string; email: string }>) => {
          state.loading = false; // Set loading to false when the request is fulfilled
          state.user = action.payload; // Set the user data
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload as string; // Set the error message
      })
      // Add cases for verifyOTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        // if (action.payload.access_token) {
        //   state.token = action.payload.access_token;
        // }
        if (
          action.payload.success === "login success" &&
          action.payload.user_info
        ) {
          const { access_token, user } = action.payload.user_info;

          // Update the state with the user data
          state.user = {
            email: user.email,
            access_token,
            userId: user.id,
            name: user.name,
            role: user.role,
          };

          // Save to localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(state.user));
          }
        }
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions and reducer
export const { clearError, logout } = userSlice.actions;
export default userSlice.reducer;
