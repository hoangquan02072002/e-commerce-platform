import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
interface UserState {
  user: null | { name: string; email: string };
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
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

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null; // Clear the error message
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
      });
  },
});

// Export the actions and reducer
export const { clearError } = userSlice.actions;
export default userSlice.reducer;
