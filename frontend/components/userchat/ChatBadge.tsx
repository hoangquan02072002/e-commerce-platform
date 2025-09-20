import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import socketService from "@/utils/socket";

const ChatBadge: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const socket = socketService.connect();
    if (!socket) return;

    // Get initial unread count
    socket.emit("getUnreadCount", (response: { count: number }) => {
      setUnreadCount(response.count);
    });

    // Listen for new messages
    socket.on("newMessage", (message: any) => {
      setUnreadCount((prev) => prev + 1);
    });

    // Update count when messages are read elsewhere
    socket.on("messageRead", () => {
      socket.emit("getUnreadCount", (response: { count: number }) => {
        setUnreadCount(response.count);
      });
    });

    return () => {
      socket.off("newMessage");
      socket.off("messageRead");
    };
  }, []);

  if (unreadCount === 0) {
    return null;
  }

  return (
    <Badge variant="destructive" className="ml-1">
      {unreadCount > 99 ? "99+" : unreadCount}
    </Badge>
  );
};

export default ChatBadge;
