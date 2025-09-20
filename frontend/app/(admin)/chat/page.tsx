// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import socketService from "@/utils/socket";
// import {
//   Send,
//   MessageCircle,
//   User,
//   Phone,
//   Video,
//   MoreVertical,
//   Smile,
//   Paperclip,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// interface Message {
//   id: number;
//   content: string;
//   sender: {
//     id: number;
//     username: string;
//   };
//   recipient?: {
//     id: number;
//     name: string;
//   };
//   senderId: number;
//   createdAt: string;
//   isRead: boolean;
// }

// const AdminChatPage = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");
//   const [chatUsers, setChatUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isOnline, setIsOnline] = useState(true);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const roomId = "room_123";
//   const userRedux = useSelector((state: RootState) => state.userLogin.user);
//   const currentUserId = userRedux?.userId;
//   console.log("currentUserId", currentUserId);

//   useEffect(() => {
//     const socket = socketService.connect();

//     socket?.emit("joinRoom", { roomId });

//     socket?.on("previousMessages", (msgs) => {
//       setMessages(msgs);
//     });

//     socket?.on("newMessage", (msg) => {
//       console.log("newMessage", msg);
//       setMessages((prev) => [...prev, msg]);
//     });

//     socket?.on("userTyping", () => {
//       setIsTyping(true);
//       setTimeout(() => setIsTyping(false), 3000);
//     });

//     return () => {
//       socket?.disconnect();
//     };
//   }, [roomId]);

//   // useEffect(() => {
//   //   const socket = socketService.getSocket();

//   //   socket?.emit("getChatUsers");

//   //   socket?.on("chatUsers", ({ success, users }) => {
//   //     if (success) {
//   //       setChatUsers(users);
//   //     }
//   //   });

//   //   socket?.on("chatUsersError", ({ error }) => {
//   //     console.error("Error fetching chat users:", error);
//   //   });

//   //   return () => {
//   //     socket?.off("chatUsers");
//   //     socket?.off("chatUsersError");
//   //   };
//   // }, []);
//   // console.log("chatUsers", chatUsers);
//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const data = await socketService.getMessagesByRoomId(roomId);
//         console.log("Fetched messages:", data);
//         setMessages(data || []);
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [roomId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const socket = socketService.getSocket();
//     if (socket) {
//       socket.emit("sendMessage", {
//         content: message,
//         roomId,
//         recipientId: 166,
//         senderId: currentUserId,
//       });
//       setMessage("");
//     }
//   };

//   useEffect(() => {
//     const socket = socketService.getSocket();

//     socket?.on("userTyping", ({ userId }) => {
//       if (userId !== currentUserId) {
//         setIsTyping(true);
//         setTimeout(() => setIsTyping(false), 3000); // Reset typing indicator after 3 seconds
//       }
//     });

//     return () => {
//       socket?.off("userTyping");
//     };
//   }, [currentUserId]);
//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     const socket = socketService.getSocket();
//     const recipientId = 125; // Replace with dynamic recipient ID logic if needed

//     if (socket) {
//       socketService.emitTyping(roomId, recipientId); // Emit typing event with recipient ID
//     }
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const formatTime = (timestamp: string) => {
//     return new Date(timestamp).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
//           <p className="text-gray-600">Loading chat...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 shadow-lg">
//         <div className="max-w-4xl px-4 py-4 mx-auto">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
//                   A
//                 </div>
//                 {isOnline && (
//                   <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1"></div>
//                 )}
//               </div>
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-800">
//                   Support Agent
//                 </h2>
//                 <p className="text-sm text-gray-500">
//                   {isOnline ? "Online" : "Last seen 5 minutes ago"}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
//                 <Phone size={20} />
//               </button>
//               <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
//                 <Video size={20} />
//               </button>
//               <button className="p-2 text-gray-600 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
//                 <MoreVertical size={20} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <div className="p-4 bg-white border-b border-gray-200 shadow-lg">
//         <h2 className="text-xl font-semibold text-gray-800">Users</h2>
//         <ul className="mt-4 space-y-2">
//           {chatUsers.map((user) => (
//             <li
//               // key={user.userId}
//               className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
//             >
//               <span className="text-gray-800">{user.username}</span>
//               <button
//                 className="px-3 py-1 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
//                 onClick={() => console.log(`Open chat with user ${user.id}`)}
//               >
//                 Chat
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div> */}
//       {/* Messages Container */}
//       <div className="flex-1 overflow-hidden">
//         <div className="flex flex-col h-full max-w-4xl mx-auto">
//           <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
//             {messages.length === 0 ? (
//               <div className="flex flex-col items-center justify-center h-full text-center">
//                 <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
//                   <MessageCircle className="w-8 h-8 text-blue-500" />
//                 </div>
//                 <h3 className="mb-2 text-lg font-semibold text-gray-800">
//                   Start a conversation
//                 </h3>
//                 <p className="max-w-sm text-gray-500">
//                   Send a message to begin chatting with our support team. We're
//                   here to help!
//                 </p>
//               </div>
//             ) : (
//               <>
//                 {messages.map((msg) => {
//                   // Check if the current user is the sender
//                   const isOwnMessage = msg.senderId === currentUserId;
//                   // const isOwnMessage = currentUserId;

//                   return (
//                     <div
//                       key={msg.id}
//                       className={`flex ${
//                         isOwnMessage ? "justify-end" : "justify-start"
//                       }`}
//                     >
//                       <div
//                         className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${
//                           isOwnMessage ? "flex-row-reverse space-x-reverse" : ""
//                         }`}
//                       >
//                         {!isOwnMessage && (
//                           <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
//                             {msg.recipient?.name.charAt(0).toUpperCase()}
//                           </div>
//                         )}
//                         <div
//                           className={`relative px-4 py-2 rounded-2xl shadow-sm ${
//                             isOwnMessage
//                               ? "bg-green-500 text-white rounded-br-md" // Green for sender
//                               : "bg-white text-gray-800 border border-gray-100 rounded-bl-md" // White for recipient
//                           }`}
//                         >
//                           <div className="mb-1 text-xs font-medium opacity-75">
//                             {isOwnMessage
//                               ? "You"
//                               : msg.recipient?.name.charAt(0).toUpperCase()}
//                           </div>
//                           <p className="text-sm leading-relaxed">
//                             {msg.content}
//                           </p>
//                           <div
//                             className={`text-xs mt-1 ${
//                               isOwnMessage ? "text-green-100" : "text-gray-500"
//                             }`}
//                           >
//                             {formatTime(msg.createdAt)}
//                           </div>
//                         </div>
//                         {isOwnMessage && (
//                           <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white bg-gray-400 rounded-full">
//                             {userRedux?.name?.charAt(0).toUpperCase() || "U"}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}

//                 {isTyping && (
//                   <div className="flex justify-start">
//                     <div className="flex items-end max-w-xs space-x-2">
//                       <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
//                         A
//                       </div>
//                       <div className="px-4 py-3 bg-white border border-gray-100 shadow-sm rounded-2xl rounded-bl-md">
//                         <div className="flex space-x-1">
//                           <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.1s" }}
//                           ></div>
//                           <div
//                             className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                             style={{ animationDelay: "0.2s" }}
//                           ></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </>
//             )}
//           </div>

//           {/* Message Input */}
//           <div className="p-4 bg-white border-t border-gray-200">
//             <div className="flex items-end space-x-3">
//               <button className="p-2 text-gray-500 transition-colors rounded-full hover:text-blue-600 hover:bg-blue-50">
//                 <Paperclip size={20} />
//               </button>
//               <div className="relative flex-1">
//                 <textarea
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="w-full px-4 py-3 pr-12 transition-colors border border-gray-300 resize-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-32"
//                   rows={1}
//                   style={{
//                     minHeight: "48px",
//                     height: "auto",
//                   }}
//                 />
//                 <button className="absolute p-1 text-gray-500 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-blue-600">
//                   <Smile size={18} />
//                 </button>
//               </div>
//               <button
//                 onClick={sendMessage}
//                 disabled={!message.trim()}
//                 className="p-3 text-white transition-all duration-200 transform bg-green-500 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
//               >
//                 <Send size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile-specific styles */}
//       <style jsx>{`
//         @media (max-width: 640px) {
//           .max-w-4xl {
//             max-width: 100%;
//           }

//           .px-4 {
//             padding-left: 1rem;
//             padding-right: 1rem;
//           }

//           .max-w-xs {
//             max-width: 16rem;
//           }
//         }

//         @media (min-width: 1024px) {
//           .max-w-md {
//             max-width: 20rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AdminChatPage;

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
  Users,
  Crown,
  ChevronDown,
  ArrowLeft,
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

interface ChatUser {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt?: string;
}

const AdminChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showUsersList, setShowUsersList] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // const roomId = "room_123";
  const userRedux = useSelector((state: RootState) => state.userLogin.user);
  const currentUserId = userRedux?.userId;

  const getRoomId = () => {
    if (!selectedUser || !currentUserId) return "room_default";
    return `room_${selectedUser.id}_${currentUserId}`;
  };
  // Fetch users who messaged admins
  const fetchUsersWhoMessagedAdmins = async () => {
    try {
      setUsersLoading(true);
      const data = await socketService.getUsersWhoMessagedAdmins();
      setChatUsers(data);
      // Auto-select first user if none selected
      if (data.length > 0 && !selectedUser) {
        setSelectedUser(data[0]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersWhoMessagedAdmins();
  }, []);

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
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    if (!selectedUser || !currentUserId) return;

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
  }, [selectedUser, currentUserId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser) return;

    const socket = socketService.getSocket();
    const roomId = getRoomId();
    if (socket) {
      socket.emit("sendMessage", {
        content: message,
        roomId,
        recipientId: selectedUser.id,
        senderId: currentUserId,
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (!selectedUser || !currentUserId) return;
    const socket = socketService.getSocket();
    const roomId = getRoomId();
    if (socket && selectedUser) {
      socketService.emitTyping(roomId, selectedUser.id);
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

  const handleUserSelection = (user: ChatUser) => {
    setSelectedUser(user);
    setShowUsersList(false);
    setMessages([]); // Clear messages when switching users
    setLoading(true);
  };

  // Users List Component
  const UsersSelector = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl px-4 py-3 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
              <Users className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                {selectedUser
                  ? `Chatting with ${selectedUser.name}`
                  : "Select a User"}
              </h3>
              <p className="text-xs text-gray-500">
                {chatUsers.length} user{chatUsers.length !== 1 ? "s" : ""} have
                messaged admins
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUsersList(!showUsersList)}
              className="flex items-center px-3 py-1.5 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              disabled={usersLoading}
            >
              <Users className="w-4 h-4 mr-1" />
              {usersLoading ? "Loading..." : "Select User"}
              <ChevronDown
                className={`w-4 h-4 ml-1 transition-transform ${
                  showUsersList ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Users Dropdown */}
            {showUsersList && (
              <div className="absolute right-0 z-50 mt-2 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg w-80 max-h-64">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-800">
                      Users Who Messaged Admins
                    </h4>
                    <button
                      onClick={fetchUsersWhoMessagedAdmins}
                      className="text-xs text-green-600 hover:text-green-800"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  {chatUsers.length === 0 ? (
                    <div className="py-4 text-center text-gray-500">
                      <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">
                        No users have messaged admins yet
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {chatUsers.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleUserSelection(user)}
                          className={`w-full p-3 text-left rounded-lg hover:bg-gray-50 transition-colors ${
                            selectedUser?.id === user.id
                              ? "bg-green-50 border border-green-200"
                              : "border border-transparent"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-10 h-10 text-sm font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-gray-800 truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-gray-500 truncate">
                                {user.email}
                              </p>
                              <div className="flex items-center mt-1">
                                <User className="w-3 h-3 mr-1 text-green-500" />
                                <span className="text-xs font-medium text-green-600">
                                  {user.role}
                                </span>
                              </div>
                            </div>
                            <div
                              className="w-3 h-3 bg-green-500 rounded-full"
                              title="Available"
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
                <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                  {selectedUser
                    ? selectedUser.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                {isOnline && (
                  <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -bottom-1 -right-1"></div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {selectedUser ? selectedUser.name : "Select a User"}
                </h2>
                <p className="flex items-center text-sm text-gray-500">
                  <Crown className="w-3 h-3 mr-1" />
                  Admin Dashboard
                  {selectedUser && (
                    <span className="ml-2 text-green-600">
                      • Chatting with {selectedUser.role}
                    </span>
                  )}
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

      {/* Users Selector */}
      <UsersSelector />

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full max-w-4xl mx-auto">
          <div className="flex-1 px-4 py-6 space-y-4 overflow-y-auto">
            {!selectedUser ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                  <Users className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Select a User to Chat
                </h3>
                <p className="max-w-sm mb-4 text-gray-500">
                  Choose a user from the list above to start or continue a
                  conversation.
                </p>
                {chatUsers.length > 0 && (
                  <button
                    onClick={() => setShowUsersList(true)}
                    className="px-4 py-2 text-green-600 transition-colors rounded-lg bg-green-50 hover:bg-green-100"
                  >
                    Choose a User
                  </button>
                )}
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-blue-100 rounded-full">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Start a conversation with {selectedUser.name}
                </h3>
                <p className="max-w-sm text-gray-500">
                  Send a message to begin chatting with this user.
                </p>
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
                          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                            {selectedUser?.name.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                        <div
                          className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                            isOwnMessage
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                          }`}
                        >
                          <div className="mb-1 text-xs font-medium opacity-75">
                            {isOwnMessage
                              ? "Admin (You)"
                              : selectedUser?.name || "User"}
                          </div>
                          <p className="text-sm leading-relaxed">
                            {msg.content}
                          </p>
                          <div
                            className={`text-xs mt-1 ${
                              isOwnMessage ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </div>
                        </div>
                        {isOwnMessage && (
                          <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-medium text-white bg-blue-500 rounded-full">
                            <Crown className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-end max-w-xs space-x-2">
                      <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-gradient-to-r from-green-500 to-blue-600">
                        {selectedUser?.name.charAt(0).toUpperCase() || "U"}
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
                    selectedUser
                      ? `Type your message to ${selectedUser.name}...`
                      : "Select a user to start chatting..."
                  }
                  disabled={!selectedUser}
                  className="w-full px-4 py-3 pr-12 transition-colors border border-gray-300 resize-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent max-h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                disabled={!message.trim() || !selectedUser}
                className="p-3 text-white transition-all duration-200 transform bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showUsersList && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUsersList(false)}
        />
      )}
    </div>
  );
};

export default AdminChatPage;
