import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import loginSlice from "./user/loginSlice";
import cartSlice from "./cart/cartSlice";

const store = configureStore({
  reducer: { user: userSlice, userLogin: loginSlice, cart: cartSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
