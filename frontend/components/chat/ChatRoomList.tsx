import React from "react";

import { Badge } from "@/components/ui/badge";
import { useChat } from "@/utils/ChatContext";

const ChatRoomList: React.FC = () => {
  const { rooms, currentRoom, joinRoom } = useChat();

  if (rooms.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No conversations yet</div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {rooms.map((room) => (
        <div
          key={room.id}
          className={`flex items-center justify-between p-3 cursor-pointer border-b hover:bg-gray-50 transition-colors ${
            currentRoom === room.id ? "bg-blue-50" : ""
          }`}
          onClick={() => joinRoom(room.id)}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-300 rounded-full">
              {room.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{room.name}</div>
              {room.lastMessage && (
                <div className="text-sm text-gray-500 truncate">
                  {room.lastMessage}
                </div>
              )}
            </div>
          </div>

          {room.unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {room.unreadCount}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatRoomList;
