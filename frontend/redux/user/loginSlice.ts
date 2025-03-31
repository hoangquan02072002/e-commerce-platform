// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the initial state
// interface UserState {
//   user: null | { email: string; access_token: string; userId: number };
//   loading: boolean;
//   error: string | null;
// }

// const loadUserFromLocalStorage = (): {
//   email: string;
//   access_token: string;
//   userId: number;
// } | null => {
//   if (typeof window !== "undefined") {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       return JSON.parse(savedUser);
//     }
//   }
//   return null;
// };

// const initialState: UserState = {
//   user: loadUserFromLocalStorage(),
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (
//     userData: {
//       email: string;
//       password: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/login",
//         userData
//       );
//       return response.data; // Return the response data
//     } catch (error) {
//       // Handle error and return a rejected value
//       if (axios.isAxiosError(error) && error.response) {
//         return rejectWithValue(error.response.data.message);
//       }
//       return rejectWithValue("An unexpected error occurred.");
//     }
//   }
// );

// // Create the user slice
// const loginSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     clearError(state) {
//       state.error = null; // Clear the error message
//     },
//     logout(state) {
//       state.user = null;
//       localStorage.removeItem("user"); // Remove user data from local storage
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true; // Set loading to true when the request is pending
//         state.error = null; // Clear any previous error
//       })
//       .addCase(
//         loginUser.fulfilled,
//         (
//           state,
//           action: PayloadAction<{
//             email: string;
//             access_token: string;
//             userId: number;
//           }>
//         ) => {
//           state.loading = false; // Set loading to false when the request is fulfilled
//           state.user = action.payload;
//           localStorage.setItem("user", JSON.stringify(action.payload));
//         }
//       )
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false; // Set loading to false when the request is rejected
//         state.error = action.payload as string; // Set the error message
//       });
//   },
// });

// // Export the actions and reducer
// export const { clearError, logout } = loginSlice.actions;
// export default loginSlice.reducer;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface UserState {
  user: null | { email: string; access_token: string; userId: number }; // Include userId
  loading: boolean;
  error: string | null;
}

const loadUserFromLocalStorage = (): {
  email: string;
  access_token: string;
  userId: number;
} | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      return JSON.parse(savedUser);
    }
  }
  return null;
};

const initialState: UserState = {
  user: loadUserFromLocalStorage(),
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    userData: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userData
      );
      return response.data; // Ensure response.data includes userId
    } catch (error) {
      // Handle error and return a rejected value
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("An unexpected error occurred.");
    }
  }
);

// Create the user slice
const loginSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null; // Clear the error message
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user"); // Remove user data from local storage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true; // Set loading to true when the request is pending
        state.error = null; // Clear any previous error
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            email: string;
            access_token: string;
            userId: number; // Ensure userId is included in the payload
          }>
        ) => {
          state.loading = false; // Set loading to false when the request is fulfilled
          state.user = action.payload; // Set user with email, access_token, and userId
          localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data to local storage
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload as string; // Set the error message
      });
  },
});

// Export the actions and reducer
export const { clearError, logout } = loginSlice.actions;
export default loginSlice.reducer;
