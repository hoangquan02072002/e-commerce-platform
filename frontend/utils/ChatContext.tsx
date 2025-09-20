// "use client";
// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   ReactNode,
// } from "react";
// import socketService from "./socket";
// import { RootState } from "@/redux/store";
// import { useSelector } from "react-redux";

// // Assume you have this

// interface Message {
//   id: number;
//   content: string;
//   roomId: string;
//   senderId: number;
//   recipientId?: number;
//   createdAt: Date;
//   isRead: boolean;
//   sender: {
//     id: number;
//     name: string;
//   };
// }

// interface Room {
//   id: string;
//   name: string;
//   lastMessage?: string;
//   unreadCount: number;
// }

// interface ChatContextType {
//   rooms: Room[];
//   currentRoom: string | null;
//   messages: Message[];
//   isConnected: boolean;
//   joinRoom: (roomId: string) => void;
//   leaveRoom: (roomId: string) => void;
//   sendMessage: (content: string, recipientId?: number) => void;
//   markAsRead: (messageId: number) => void;
//   getUnreadMessages: () => void;
//   startConversation: (userId: number, username: string) => void;
// }

// const ChatContext = createContext<ChatContextType | null>(null);

// export const ChatProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [rooms, setRooms] = useState<Room[]>([]);
//   const [currentRoom, setCurrentRoom] = useState<string | null>(null);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const user = useSelector((state: RootState) => state.userLogin.user); // Assume you have a useAuth hook to get the current user
//   // Initialize socket connection when component mounts
//   useEffect(() => {
//     if (!user) return;

//     const socket = socketService.connect();
//     if (!socket) return;

//     socket.on("connect", () => {
//       setIsConnected(true);
//       // Get available rooms or conversations
//       socket.emit("getRooms", (response: { rooms: Room[] }) => {
//         if (response.rooms) {
//           setRooms(response.rooms);
//         }
//       });
//     });

//     socket.on("disconnect", () => {
//       setIsConnected(false);
//     });

//     // Clean up on unmount
//     return () => {
//       socket.off("connect");
//       socket.off("disconnect");
//       socketService.disconnect();
//     };
//   }, [user]);

//   // Listen for new messages
//   useEffect(() => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     socket.on("newMessage", (message: Message) => {
//       // Add message to current conversation if it belongs there
//       if (currentRoom && message.roomId === currentRoom) {
//         setMessages((prev) => [...prev, message]);

//         // Mark as read if we're in the room
//         if (message.senderId !== user?.userId) {
//           socket.emit("markAsRead", { messageId: message.id });
//         }
//       }

//       // Update room list with new message
//       setRooms((prev) =>
//         prev.map((room) =>
//           room.id === message.roomId
//             ? {
//                 ...room,
//                 lastMessage: message.content,
//                 unreadCount: room.id === currentRoom ? 0 : room.unreadCount + 1,
//               }
//             : room
//         )
//       );
//     });

//     socket.on(
//       "messageRead",
//       ({ messageId }: { messageId: number; readAt: Date }) => {
//         setMessages((prev) =>
//           prev.map((message) =>
//             message.id === messageId ? { ...message, isRead: true } : message
//           )
//         );
//       }
//     );

//     return () => {
//       socket.off("newMessage");
//       socket.off("messageRead");
//     };
//   }, [currentRoom, user]);

//   const joinRoom = (roomId: string) => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     // Leave current room if any
//     if (currentRoom) {
//       socket.emit("leaveRoom", { roomId: currentRoom });
//     }

//     // Join new room
//     socket.emit("joinRoom", { roomId }, (response: any) => {
//       if (response.success) {
//         setCurrentRoom(roomId);

//         // Reset unread count for this room
//         setRooms((prev) =>
//           prev.map((room) =>
//             room.id === roomId ? { ...room, unreadCount: 0 } : room
//           )
//         );
//       }
//     });

//     // Get previous messages
//     socket.emit(
//       "getPreviousMessages",
//       { roomId },
//       (response: { messages: Message[] }) => {
//         setMessages(response.messages || []);
//       }
//     );
//   };

//   const leaveRoom = (roomId: string) => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     socket.emit("leaveRoom", { roomId });
//     setCurrentRoom(null);
//     setMessages([]);
//   };

//   const sendMessage = (content: string, recipientId?: number) => {
//     const socket = socketService.getSocket();
//     if (!socket || !currentRoom) return;

//     socket.emit("sendMessage", {
//       content,
//       roomId: currentRoom,
//       recipientId,
//     });
//   };

//   const markAsRead = (messageId: number) => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     socket.emit("markAsRead", { messageId });
//   };

//   const getUnreadMessages = () => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     socket.emit("getUnreadMessages", (response: { messages: Message[] }) => {
//       if (response.messages) {
//         // Update unread counts in rooms
//         const unreadCounts: Record<string, number> = {};

//         response.messages.forEach((message) => {
//           unreadCounts[message.roomId] =
//             (unreadCounts[message.roomId] || 0) + 1;
//         });

//         setRooms((prev) =>
//           prev.map((room) => ({
//             ...room,
//             unreadCount: unreadCounts[room.id] || 0,
//           }))
//         );
//       }
//     });
//   };

//   const startConversation = (userId: number, username: string) => {
//     const socket = socketService.getSocket();
//     if (!socket) return;

//     socket.emit(
//       "startConversation",
//       { userId },
//       (response: { roomId: string; messages: Message[] }) => {
//         if (response.roomId) {
//           // Check if room already exists
//           const roomExists = rooms.some((room) => room.id === response.roomId);

//           if (!roomExists) {
//             setRooms((prev) => [
//               ...prev,
//               {
//                 id: response.roomId,
//                 name: username,
//                 unreadCount: 0,
//               },
//             ]);
//           }

//           // Join the room
//           setCurrentRoom(response.roomId);
//           setMessages(response.messages || []);
//         }
//       }
//     );
//   };

//   const value = {
//     rooms,
//     currentRoom,
//     messages,
//     isConnected,
//     joinRoom,
//     leaveRoom,
//     sendMessage,
//     markAsRead,
//     getUnreadMessages,
//     startConversation,
//   };

//   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
// };

// export const useChat = () => {
//   const context = useContext(ChatContext);
//   if (!context) {
//     throw new Error("useChat must be used within a ChatProvider");
//   }
//   return context;
// };
