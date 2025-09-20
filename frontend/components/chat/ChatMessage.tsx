import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
// Assume you have this

interface MessageProps {
  message: {
    id: number;
    content: string;
    senderId: number;
    createdAt: Date;
    isRead: boolean;
    sender: {
      id: number;
      name: string;
    };
  };
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  const user = useSelector((state: RootState) => state.userLogin.user);
  const isOwnMessage = user?.userId === message.senderId;

  const formattedTime = format(new Date(message.createdAt), "h:mm a");

  return (
    <div
      className={`flex mb-4 ${isOwnMessage ? "justify-end" : "justify-start"}`}
    >
      {!isOwnMessage && (
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 mr-2 bg-gray-300 rounded-full">
          {message.sender.name.charAt(0).toUpperCase()}
        </div>
      )}

      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        <div className="text-sm">{message.content}</div>
        <div
          className={`text-xs mt-1 flex justify-end ${
            isOwnMessage ? "text-blue-200" : "text-gray-500"
          }`}
        >
          {formattedTime}
          {isOwnMessage && message.isRead && <span className="ml-1">✓</span>}
        </div>
      </div>

      {isOwnMessage && (
        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 ml-2 bg-blue-600 rounded-full">
          {user?.email.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
