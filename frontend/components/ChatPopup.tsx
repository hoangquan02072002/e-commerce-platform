"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Chat Message Type
type ChatMessage = {
  id: string;
  content: string;
  sender: "user" | "support";
  timestamp: Date;
};

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! How can I help you with your order today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = React.useState("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate support response after a short delay
    setTimeout(() => {
      const supportMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message. Our support team will get back to you shortly.",
        sender: "support",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, supportMessage]);
    }, 1000);
  };

  // Auto scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-4 bottom-4 z-50 w-80 md:w-96">
      <Card className="border-2 shadow-lg">
        <CardHeader className="p-4 bg-primary text-primary-foreground">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Support Chat</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto p-4 h-80">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <div className="flex gap-2 w-full">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPopup;

// "use client";

// import * as React from "react";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// interface ChatPopupProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose }) => {
//   const [newMessage, setNewMessage] = React.useState("");
//   const messagesEndRef = React.useRef<HTMLDivElement>(null);
//   // const { messages, sendMessage, loadConversation, isConnected } = useChat();

//   const userInfo = useSelector((state: RootState) => state.userLogin.user);
//   const userId = userInfo?.user_info.user.id;

//   // Admin ID (you might want to fetch this from your API or config)
//   const ADMIN_ID = 119; // Assuming admin has ID 1

//   React.useEffect(() => {
//     if (isOpen && userId && isConnected) {
//       loadConversation(ADMIN_ID);
//     }
//   }, [isOpen, userId, isConnected]);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return;

//     // Send message to admin
//     sendMessage(newMessage, ADMIN_ID);
//     setNewMessage("");
//   };
//   React.useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed right-4 bottom-4 z-50 w-80 md:w-96">
//       <Card className="border-2 shadow-lg">
//         <CardHeader className="p-4 bg-primary text-primary-foreground">
//           <div className="flex justify-between items-center">
//             <CardTitle className="text-lg">Support Chat</CardTitle>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={onClose}
//               className="w-8 h-8 rounded-full"
//             >
//               <X className="w-4 h-4" />
//             </Button>
//           </div>
//         </CardHeader>
//         <CardContent className="overflow-y-auto p-4 h-80">
//           {!isConnected && (
//             <div className="flex justify-center items-center h-full">
//               <p className="text-muted-foreground">
//                 Connecting to chat server...
//               </p>
//             </div>
//           )}

//           {isConnected && messages.length === 0 && (
//             <div className="flex justify-center items-center h-full">
//               <p className="text-muted-foreground">
//                 No messages yet. Start a conversation!
//               </p>
//             </div>
//           )}

//           <div className="space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.sender.id === userId ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg p-3 ${
//                     message.sender.id === userId
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted"
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <p className="mt-1 text-xs opacity-70">
//                     {new Date(message.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </p>
//                 </div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>
//         </CardContent>
//         <CardFooter className="p-4 border-t">
//           <div className="flex gap-2 w-full">
//             <Input
//               placeholder="Type your message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") {
//                   handleSendMessage();
//                 }
//               }}
//               className="flex-1"
//               disabled={!isConnected}
//             />
//             <Button onClick={handleSendMessage} disabled={!isConnected}>
//               Send
//             </Button>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default ChatPopup;
