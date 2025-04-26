// "use client";

// import * as React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import axios from "axios";
// import { getToken } from "@/utils/getToken";
// import { useChat } from "@/context/ChatContext";

// interface User {
//   id: number;
//   name: string;
//   email: string;
// }

// const AdminChatPage: React.FC = () => {
//   const [users, setUsers] = React.useState<User[]>([]);
//   const [selectedUserId, setSelectedUserId] = React.useState<number | null>(
//     null
//   );
//   const [newMessage, setNewMessage] = React.useState("");
//   const messagesEndRef = React.useRef<HTMLDivElement>(null);

//   const { messages, sendMessage, loadConversation, isConnected } = useChat();

//   const adminInfo = useSelector((state: RootState) => state.userLogin.user);
//   const adminId = adminInfo?.user_info.user.id;

//   // Fetch all users for the admin to chat with
//   React.useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = getToken();
//         const { data } = await axios.get("http://localhost:5000/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // Filter out the admin user
//         const filteredUsers = data.filter((user: User) => user.id !== adminId);
//         setUsers(filteredUsers);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     if (adminId) {
//       fetchUsers();
//     }
//   }, [adminId]);

//   // Load conversation when a user is selected
//   React.useEffect(() => {
//     if (selectedUserId && isConnected) {
//       loadConversation(selectedUserId);
//     }
//   }, [selectedUserId, isConnected]);

//   // Auto scroll to bottom when new messages arrive
//   React.useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" || !selectedUserId) return;

//     // Send message to selected user
//     sendMessage(newMessage, selectedUserId);
//     setNewMessage("");
//   };

//   const selectedUser = users.find((user) => user.id === selectedUserId);

//   return (
//     <div className="container p-4 mx-auto">
//       <h1 className="mb-6 text-2xl font-bold">Admin Chat</h1>

//       <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
//         {/* User List */}
//         <Card className="md:col-span-1">
//           <CardHeader>
//             <CardTitle>Users</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {users.length === 0 ? (
//                 <p className="text-muted-foreground">No users found</p>
//               ) : (
//                 users.map((user) => (
//                   <Button
//                     key={user.id}
//                     variant={selectedUserId === user.id ? "default" : "outline"}
//                     className="justify-start w-full"
//                     onClick={() => setSelectedUserId(user.id)}
//                   >
//                     {user.name}
//                   </Button>
//                 ))
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Chat Area */}
//         <Card className="md:col-span-3">
//           <CardHeader>
//             <CardTitle>
//               {selectedUser
//                 ? `Chat with ${selectedUser.name}`
//                 : "Select a user to start chatting"}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="h-[500px] overflow-y-auto">
//             {!isConnected && (
//               <div className="flex justify-center items-center h-full">
//                 <p className="text-muted-foreground">
//                   Connecting to chat server...
//                 </p>
//               </div>
//             )}

//             {isConnected && !selectedUserId && (
//               <div className="flex justify-center items-center h-full">
//                 <p className="text-muted-foreground">
//                   Select a user to view conversation
//                 </p>
//               </div>
//             )}

//             {isConnected && selectedUserId && messages.length === 0 && (
//               <div className="flex justify-center items-center h-full">
//                 <p className="text-muted-foreground">
//                   No messages yet. Start a conversation!
//                 </p>
//               </div>
//             )}

//             <div className="space-y-4">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.sender.id === adminId
//                       ? "justify-end"
//                       : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-lg p-3 ${
//                       message.sender.id === adminId
//                         ? "bg-primary text-primary-foreground"
//                         : "bg-muted"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <p className="mt-1 text-xs opacity-70">
//                       {new Date(message.createdAt).toLocaleTimeString([], {
//                         hour: "2-digit",
//                         minute: "2-digit",
//                       })}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           </CardContent>
//           <CardFooter className="p-4 border-t">
//             <div className="flex gap-2 w-full">
//               <Input
//                 placeholder="Type your message..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") {
//                     handleSendMessage();
//                   }
//                 }}
//                 className="flex-1"
//                 disabled={!isConnected || !selectedUserId}
//               />
//               <Button
//                 onClick={handleSendMessage}
//                 disabled={!isConnected || !selectedUserId}
//               >
//                 Send
//               </Button>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default AdminChatPage;
