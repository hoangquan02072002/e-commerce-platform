import { useState, useEffect, useCallback } from "react";
import socketService from "../socket";

interface Message {
  id: number;
  content: string;
  roomId: string;
  sender: {
    id: number;
    username: string;
  };
  recipientId?: number;
  createdAt: Date;
  isRead: boolean;
}

interface UseChatProps {
  roomId?: string;
  userId?: number;
}

export const useChat = ({ roomId, userId }: UseChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);

  // Initialize connection
  useEffect(() => {
    const socket = socketService.connect();

    if (!socket) {
      setError("Failed to establish socket connection");
      return;
    }

    const onConnect = () => {
      setIsConnected(true);
      setError(null);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onConnectError = (err: Error) => {
      setIsConnected(false);
      setError(`Connection error: ${err.message}`);
    };

    // Listen for server events (no acknowledgments needed)
    const onPreviousMessages = (receivedMessages: Message[]) => {
      setMessages(receivedMessages);
    };

    const onNewMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    const onJoinedRoom = (data: { success: boolean; roomId: string }) => {
      if (data.success) {
        setActiveChatRoom(data.roomId);
      }
    };

    const onJoinRoomError = (data: { success: boolean; error: string }) => {
      setError(`Failed to join room: ${data.error}`);
    };

    const onConversationLoaded = (data: {
      success: boolean;
      roomId: string;
      messages: Message[];
    }) => {
      if (data.success) {
        setActiveChatRoom(data.roomId);
        setMessages(data.messages);
      }
    };

    const onConversationError = (data: { success: boolean; error: string }) => {
      setError(`Failed to load conversation: ${data.error}`);
    };

    // Set up event listeners
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("previousMessages", onPreviousMessages);
    socket.on("newMessage", onNewMessage);
    socket.on("joinedRoom", onJoinedRoom);
    socket.on("joinRoomError", onJoinRoomError);
    socket.on("conversationLoaded", onConversationLoaded);
    socket.on("conversationError", onConversationError);

    // Check if already connected
    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      // Clean up listeners
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("previousMessages", onPreviousMessages);
      socket.off("newMessage", onNewMessage);
      socket.off("joinedRoom", onJoinedRoom);
      socket.off("joinRoomError", onJoinRoomError);
      socket.off("conversationLoaded", onConversationLoaded);
      socket.off("conversationError", onConversationError);
    };
  }, []);

  // Join room when roomId changes
  useEffect(() => {
    if (!roomId || !isConnected) return;

    const socket = socketService.getSocket();
    if (!socket) return;

    // Emit without expecting acknowledgment
    socket.emit("joinRoom", { roomId });
  }, [roomId, isConnected]);

  // Start a conversation with a user
  const startConversation = useCallback(
    (targetUserId: number) => {
      if (!isConnected) {
        setError("Cannot start conversation: Not connected to chat server");
        return;
      }

      const socket = socketService.getSocket();
      if (!socket) {
        setError("Socket connection not available");
        return;
      }

      // Emit without expecting acknowledgment
      socket.emit("getConversation", { userId: targetUserId });
    },
    [isConnected]
  );

  // Send a message
  const sendMessage = useCallback(
    (content: string, recipientId?: number) => {
      if (!activeChatRoom || !isConnected) {
        setError("Cannot send message: No active chat room or not connected");
        return;
      }

      const socket = socketService.getSocket();
      if (!socket) {
        setError("Socket connection not available");
        return;
      }

      // Emit without expecting acknowledgment
      socket.emit("sendMessage", {
        content,
        roomId: activeChatRoom,
        recipientId,
      });
    },
    [activeChatRoom, isConnected]
  );

  return {
    messages,
    isConnected,
    error,
    sendMessage,
    startConversation,
    activeChatRoom,
  };
};
