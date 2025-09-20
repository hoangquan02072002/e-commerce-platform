"use client";

import socketService from "@/utils/socket";
import React, { useEffect, useState } from "react";
// import { getSocket } from "@/utils/socket";
import { toast } from "react-toastify"; // Using react-toastify instead of react-hot-toast

type Notification = {
  id: number;
  message: string;
  type: string;
  createdAt: string;
};

export const NotificationListener = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const socket = socketService();

    if (socket) {
      socket.on("notification", (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);

        // Show toast notification using react-toastify
        toast.success(notification.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("notification");
      }
    };
  }, []);

  return (
    <div className="fixed z-50 top-4 right-4">
      {/* This component doesn't render anything visible by default,
          it just listens for notifications and shows toasts */}
    </div>
  );
};
