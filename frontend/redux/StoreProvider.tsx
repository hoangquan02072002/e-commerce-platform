"use client";
import { Provider } from "react-redux";
import store from "./store"; // Ensure correct import of the store

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Create the store
  return <Provider store={store}>{children}</Provider>;
};
