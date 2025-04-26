"use client";

import NavbarWithSearch from "@/components/NavbarWithSearch";
import Footer from "@/components/Footer";
import { StoreProvider } from "../redux/StoreProvider";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use this to prevent hydration mismatch with components that need browser APIs
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a simple loading state
  }

  return (
    <StoreProvider>
      <ToastContainer />
      <NavbarWithSearch />
      {children}
      <Footer />
    </StoreProvider>
  );
}
