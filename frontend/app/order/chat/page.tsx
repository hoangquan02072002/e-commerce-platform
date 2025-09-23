"use client";

import React, { useState, useEffect, useRef } from "react";
import socketService from "@/utils/socket";
import {
  Send,
  MessageCircle,
  User,
  Phone,
  Video,
  MoreVertical,
  Smile,
  Paperclip,
  Crown,
  ChevronDown,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Message {
  id: number;
  content: string;
  sender: {
    id: number;
    username: string;
  };
  recipient?: {
    id: number;
    name: string;
  };
  senderId: number;
  createdAt: string;
  isRead: boolean;
}

interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
}

const UserChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Admin-related state
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showAdminList, setShowAdminList] = useState(false);
  const [adminsLoading, setAdminsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const roomId = "room_123";
  const userRedux = useSelector((state: RootState) => state.userLogin.user);
  const currentUserId = userRedux?.userId;

  const getRoomId = () => {
    if (!selectedAdmin || !currentUserId) return "room_default";
    return `room_${currentUserId}_${selectedAdmin.id}`;
  };
  // Fetch admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setAdminsLoading(true);
      const data = await socketService.getAdminsWhoReceivedFromUsers();
      setAdmins(data);
      // Auto-select first admin if none selected
      if (data.length > 0 && !selectedAdmin) {
        setSelectedAdmin(data[0]);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    } finally {
      setAdminsLoading(false);
    }
  };

  console.log("admin", admins);
  useEffect(() => {
    const roomId = getRoomId();
    const socket = socketService.connect();

    socket?.emit("joinRoom", { roomId });

    socket?.on("previousMessages", (msgs) => {
      setMessages(msgs);
    });

    socket?.on("newMessage", (msg) => {
      console.log("newMessage", msg);
      setMessages((prev) => [...prev, msg]);
    });

    socket?.on("userTyping", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 3000);
    });

    return () => {
      socket?.disconnect();
    };
  }, [selectedAdmin, currentUserId]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const roomId = getRoomId();
        const data = await socketService.getMessagesByRoomId(roomId);
        console.log("Fetched messages:", data);
        setMessages(data || []);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedAdmin, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const socket = socketService.getSocket();
    const roomId = getRoomId();
    if (socket) {
      socket.emit("sendMessage", {
        content: message,
        roomId,
        recipientId: selectedAdmin?.id, // Use selected admin or fallback
        senderId: currentUserId,
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedAdmin || !currentUserId) return;
    const socket = socketService.getSocket();
    const roomId = getRoomId();

    if (socket) {
      socketService.emitTyping(roomId, selectedAdmin?.id);
    }
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleAdminSelection = (admin: Admin) => {
    setSelectedAdmin(admin);
    setShowAdminList(false);
    setMessages([]); // Clear messages when switching admins
    setLoading(true);
  };

  // Admin Selection Component
  const AdminSelector = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
              <Crown className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {selectedAdmin
                  ? `Chatting with ${selectedAdmin.name}`
                  : "Select an Admin"}
              </h3>
              <p className="text-xs text-gray-500">
                {admins.length} admin{admins.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowAdminList(!showAdminList)}
              className="flex items-center px-3 py-1.5 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
              disabled={adminsLoading}
            >
              <Users className="w-4 h-4 mr-1" />
              {adminsLoading ? "Loading..." : "Select Admin"}
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  showAdminList ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Admin Dropdown */}
            {showAdminList && (
              <div className="absolute right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg w-72 max-h-64">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">
                      Available Admins
                    </h4>
                    <button
                      onClick={fetchAdmins}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  {admins.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No admins available</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {admins.map((admin) => (
                        <button
                          key={admin.id}
                          onClick={() => handleAdminSelection(admin)}
                          className={`w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors ${
                            selectedAdmin?.id === admin.id
                              ? "bg-blue-50 border border-blue-200"
                              : "border border-transparent"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                              {admin.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">
                                {admin.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {admin.email}
                              </p>
                              <div className="flex items-center mt-1">
                                <Crown className="w-3 h-3 mr-1 text-blue-500" />
                                <span className="text-xs font-medium text-blue-600">
                                  {admin.role}
                                </span>
                              </div>
                            </div>
                            <div
                              className="w-3 h-3 bg-green-500 rounded-full"
                              title="Online"
                            ></div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-lg">
        <div className="max-w-4xl px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                  {selectedAdmin
                    ? selectedAdmin.name.charAt(0).toUpperCase()
                    : "A"}
                </div>
                {isOnline && (
                  <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1"></div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedAdmin ? selectedAdmin.name : "Support Agent"}
                </h2>
                <p className="text-sm text-gray-500">
                  {isOnline ? "Online" : "Last seen 5 minutes ago"}
                </p>
              </div>
            </div>
            <div className="items-center hidden space-x-3 sm:flex">
              <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
                <Phone size={20} />
              </button>
              <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
                <Video size={20} />
              </button>
              <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Selector */}
      <AdminSelector />

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full max-w-4xl mx-auto">
          <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Start a conversation
                </h3>
                <p className="max-w-sm mb-4 text-gray-500">
                  {selectedAdmin
                    ? `Send a message to ${selectedAdmin.name}. They're here to help!`
                    : "Select an admin and send a message to begin chatting with our support team."}
                </p>
                {!selectedAdmin && admins.length > 0 && (
                  <button
                    onClick={() => setShowAdminList(true)}
                    className="px-4 py-2 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
                  >
                    Choose an Admin
                  </button>
                )}
              </div>
            ) : (
              <>
                {messages.map((msg) => {
                  const isOwnMessage = msg.senderId === currentUserId;

                  return (
                    <div
                      key={msg.id}
                      className={`flex ${
                        isOwnMessage ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
                          isOwnMessage ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        {!isOwnMessage && (
                          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                            {selectedAdmin?.name.charAt(0).toUpperCase() || "A"}
                          </div>
                        )}
                        <div
                          className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                            isOwnMessage
                              ? "bg-green-500 text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <div className="mb-1 text-xs font-medium opacity-75">
                            {isOwnMessage
                              ? "You"
                              : selectedAdmin?.name || "Admin"}
                          </div>
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                          <div
                            className={`text-xs mt-1 ${
                              isOwnMessage ? "text-green-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                        {isOwnMessage && (
                          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white bg-gray-400 rounded-full">
                            {userRedux?.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end max-w-xs space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                        {selectedAdmin?.name.charAt(0).toUpperCase() || "A"}
                      </div>
                      <div className="px-4 py-3 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end space-x-3">
              <button className="hidden p-2 text-gray-500 transition-colors rounded-full sm:block hover:text-blue-600 hover:bg-blue-50">
                <Paperclip size={20} />
              </button>
              <div className="relative flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    selectedAdmin
                      ? `Type your message to ${selectedAdmin.name}...`
                      : "Select an admin to start chatting..."
                  }
                  disabled={!selectedAdmin}
                  className="w-full px-4 py-3 pr-12 transition-colors border border-gray-300 resize-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  rows={1}
                  style={{
                    minHeight: "48px",
                    height: "auto",
                  }}
                />
                <button className="absolute p-1 text-gray-500 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600">
                  <Smile size={18} />
                </button>
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim() || !selectedAdmin}
                className="p-3 text-white transition-all duration-200 transform bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showAdminList && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowAdminList(false)}
        />
      )}
    </div>
  );
};

export default UserChatPage;
