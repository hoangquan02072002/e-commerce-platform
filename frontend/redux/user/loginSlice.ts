// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define the initial state
// interface UserState {
//   user: null | { email: string; access_token: string; userId: number }; // Include userId
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

// // export const loginUser = createAsyncThunk(
// //   "user/loginUser",
// //   async (
// //     userData: {
// //       email: string;
// //       password: string;
// //       visitorId: string;
// //     },
// //     { rejectWithValue }
// //   ) => {
// //     try {
// //       const response = await axios.post(
// //         "http://localhost:5000/auth/login",
// //         userData
// //       );
// //       return response.data; // Ensure response.data includes userId
// //     } catch (error) {
// //       // Handle error and return a rejected value
// //       if (axios.isAxiosError(error) && error.response) {
// //         return rejectWithValue(error.response.data.message);
// //       }
// //       return rejectWithValue("An unexpected error occurred.");
// //     }
// //   }
// // );

// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async (
//     userData: {
//       email: string;
//       password: string;
//       visitorId: string;
//       _actionData?: {
//         email: string;
//         access_token: string;
//         userId: number;
//       };
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       // If we already have the data from the component, use it directly
//       if (userData._actionData) {
//         console.log("Using pre-fetched data:", userData._actionData);
//         return userData._actionData;
//       }

//       // Otherwise make the API call
//       const response = await axios.post("http://localhost:5000/auth/login", {
//         email: userData.email,
//         password: userData.password,
//         visitorId: userData.visitorId,
//       });

//       console.log("API response in slice:", response.data);

//       // Handle the nested response structure
//       let accessToken, userId;

//       if (response.data.user_info && response.data.user_info.access_token) {
//         // Handle nested structure
//         accessToken = response.data.user_info.access_token;
//         userId = response.data.user_info.user?.id;
//       } else {
//         // Handle flat structure
//         accessToken = response.data.access_token;
//         userId = response.data.userId;
//       }

//       // Make sure we have the required data
//       if (!accessToken || !userId) {
//         return rejectWithValue("Login response missing required data");
//       }

//       const result = {
//         email: userData.email,
//         access_token: accessToken,
//         userId: userId,
//       };

//       // Save to localStorage directly as a fallback
//       if (typeof window !== "undefined") {
//         localStorage.setItem("user", JSON.stringify(result));
//         console.log("Saved to localStorage from Redux:", result);
//       }

//       return result;
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
//       // .addCase(
//       //   loginUser.fulfilled,
//       //   (
//       //     state,
//       //     action: PayloadAction<{
//       //       email: string;
//       //       access_token: string;
//       //       userId: number; // Ensure userId is included in the payload
//       //     }>
//       //   ) => {
//       //     state.loading = false; // Set loading to false when the request is fulfilled
//       //     state.user = action.payload; // Set user with email, access_token, and userId
//       //     localStorage.setItem("user", JSON.stringify(action.payload)); // Save user data to local storage
//       //   }
//       // )
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
//           state.loading = false;
//           state.user = action.payload;

//           // Log the data being saved
//           console.log(
//             "Saving user data to localStorage from reducer:",
//             action.payload
//           );

//           // Ensure we're in a browser environment before using localStorage
//           if (typeof window !== "undefined") {
//             try {
//               localStorage.setItem("user", JSON.stringify(action.payload));
//               console.log(
//                 "Data saved to localStorage successfully from reducer"
//               );
//             } catch (error) {
//               console.error(
//                 "Error saving to localStorage from reducer:",
//                 error
//               );
//             }
//           }
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

// Define the types to match the backend response structure
interface UserInfo {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

// Define the initial state
interface UserState {
  user: null | {
    email: string;
    access_token: string;
    userId: number;
    name?: string;
    role?: string;
  };
  loading: boolean;
  error: string | null;
}

const loadUserFromLocalStorage = (): {
  email: string;
  access_token: string;
  userId: number;
  name?: string;
  role?: string;
} | null => {
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        return null;
      }
    }
  }
  return null;
};

const initialState: UserState = {
  user: loadUserFromLocalStorage(),
  loading: false,
  error: null,
};

interface LoginUserParams {
  email: string;
  password: string;
  visitorId: string;
  user_info?: UserInfo;
}

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData: LoginUserParams, { rejectWithValue }) => {
    try {
      // If we already have the user_info from the component, use it directly
      if (userData.user_info) {
        console.log("Using pre-fetched user_info:", userData.user_info);

        // Extract the needed data from user_info
        const { access_token, user } = userData.user_info;

        // Create the user object to store in Redux and localStorage
        const userDataToStore = {
          email: userData.email,
          access_token,
          userId: user.id,
          name: user.name,
          role: user.role,
        };

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userDataToStore));
          console.log(
            "Saved to localStorage from Redux thunk:",
            userDataToStore
          );
        }

        return userDataToStore;
      }

      // Otherwise make the API call
      const response = await axios.post("http://localhost:5000/auth/login", {
        email: userData.email,
        password: userData.password,
        visitorId: userData.visitorId,
      });

      console.log("API response in slice:", response.data);

      // Check if the response has the expected structure
      if (
        response.data.success === "login success" &&
        response.data.user_info
      ) {
        const { access_token, user } = response.data.user_info;

        if (!access_token || !user || !user.id) {
          return rejectWithValue("Login response missing required data");
        }

        const userDataToStore = {
          email: userData.email,
          access_token,
          userId: user.id,
          name: user.name,
          role: user.role,
        };

        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(userDataToStore));
          console.log(
            "Saved to localStorage from Redux API call:",
            userDataToStore
          );
        }

        return userDataToStore;
      }

      return rejectWithValue("Unexpected response format");
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("user"); // Remove user data from local storage
      }
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
            userId: number;
            name?: string;
            role?: string;
          }>
        ) => {
          state.loading = false; // Set loading to false when the request is fulfilled
          state.user = action.payload; // Set user with email, access_token, and userId

          console.log(
            "Saving user data to localStorage from reducer:",
            action.payload
          );

          // Save user data to local storage
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("user", JSON.stringify(action.payload));
              console.log(
                "Data saved to localStorage successfully from reducer"
              );
            } catch (error) {
              console.error(
                "Error saving to localStorage from reducer:",
                error
              );
            }
          }
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request is rejected
        state.error = action.payload as string; // Set the error message
        console.error("Login rejected:", action.payload);
      });
  },
});

// Export the actions and reducer
export const { clearError, logout } = loginSlice.actions;
export default loginSlice.reducer;
