import { useChat } from "@/utils/ChatContext";
import React, { useEffect } from "react";
import ChatMessage from "../chat/ChatMessage";
import ChatInput from "../chat/ChatInput";

interface UserChatProps {
  userId: number;
  userName: string;
  orderId?: string; // Optional, for order-specific chats
}

const UserChat: React.FC<UserChatProps> = ({ userId, userName, orderId }) => {
  const { isConnected, startConversation, currentRoom, messages, sendMessage } =
    useChat();

  // Join chat when component mounts
  useEffect(() => {
    if (orderId) {
      // For order-specific chats
      startConversation(userId, `Order #${orderId} with ${userName}`);
    } else {
      // For direct user chats
      startConversation(userId, userName);
    }
  }, [userId, userName, orderId]);

  if (!isConnected) {
    return <div className="p-4 text-center">Connecting to chat...</div>;
  }

  return (
    <div className="flex flex-col h-[400px] border rounded-lg">
      <div className="p-3 border-b bg-blue-50">
        <div className="font-medium">Chat with {userName}</div>
        {orderId && (
          <div className="text-xs text-gray-500">Order #{orderId}</div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        disabled={!currentRoom || !isConnected}
      />
    </div>
  );
};

export default UserChat;
