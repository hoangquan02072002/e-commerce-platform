// import { io, Socket } from "socket.io-client";
// import { getToken } from "./getToken";
// import axios from "axios";

// class SocketService {
//   private socket: Socket | null = null;
//   private readonly socketUrl = "http://localhost:5000";
//   private reconnectAttempts = 0;
//   private maxReconnectAttempts = 5;
//   private currentUserId: number | null = null;

//   connect(userId?: number) {
//     if (this.socket && this.socket.connected) {
//       return this.socket;
//     }

//     try {
//       const token = getToken();

//       if (!token) {
//         console.error("Cannot connect to socket: No authentication token");
//         return null;
//       }

//       if (this.socket) {
//         this.socket.disconnect();
//         this.socket = null;
//       }

//       this.socket = io(this.socketUrl, {
//         auth: { token },
//         withCredentials: true,
//         transports: ["websocket", "polling"],
//         reconnection: true,
//         reconnectionAttempts: this.maxReconnectAttempts,
//         reconnectionDelay: 1000,
//         timeout: 20000,
//       });

//       this.setupEventListeners();

//       // If userId is provided, join user room for order notifications
//       if (userId) {
//         this.currentUserId = userId;
//         this.joinUserRoom(userId);
//       }

//       return this.socket;
//     } catch (error) {
//       console.error("Socket initialization error:", error);
//       return null;
//     }
//   }

//   private setupEventListeners() {
//     if (!this.socket) return;

//     this.socket.on("connect", () => {
//       console.log("Connected to server");
//       this.reconnectAttempts = 0;

//       // Rejoin user room if we have a current user
//       if (this.currentUserId) {
//         this.joinUserRoom(this.currentUserId);
//       }
//     });

//     this.socket.on("connect_error", (error) => {
//       console.error("Connection error:", error);
//       this.reconnectAttempts++;
//     });

//     this.socket.on("disconnect", (reason) => {
//       console.log("Disconnected from server:", reason);
//     });
//   }

//   disconnect() {
//     if (this.socket) {
//       // Leave user room before disconnecting
//       if (this.currentUserId) {
//         this.leaveUserRoom(this.currentUserId);
//       }

//       // Remove all listeners before disconnecting
//       this.socket.removeAllListeners();
//       this.socket.disconnect();
//       this.socket = null;
//     }
//     this.reconnectAttempts = 0;
//     this.currentUserId = null;
//   }

//   getSocket() {
//     return this.socket;
//   }

//   retryConnection() {
//     this.reconnectAttempts = 0;
//     const userId = this.currentUserId;
//     this.disconnect();
//     return this.connect(userId || undefined);
//   }

//   isConnected() {
//     return this.socket?.connected || false;
//   }

//   async getAdminsWhoReceivedFromUsers() {
//     try {
//       const token = getToken();
//       const response = await axios.get("http://localhost:5000/chatapp/admins", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching admins:", error);
//       throw error;
//     }
//   }

//   async getUsersWhoMessagedAdmins() {
//     try {
//       const token = getToken();
//       const response = await axios.get("http://localhost:5000/chatapp/users", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       throw error;
//     }
//   }

//   // Chat functionality
//   async getMessagesByRoomId(roomId: string) {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/chatapp/messages-by-room",
//         {
//           params: { roomId },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//       throw error;
//     }
//   }

//   emitTyping(roomId: string, recipientId: number) {
//     if (this.socket) {
//       this.socket.emit("typing", { roomId, recipientId });
//     }
//   }

//   // Order notification functionality
//   joinUserRoom(userId: number) {
//     if (this.socket && this.socket.connected) {
//       this.socket.emit("join-user", { userId });
//       this.currentUserId = userId;
//       console.log(`Joined user room for user ${userId}`);
//     }
//   }

//   leaveUserRoom(userId: number) {
//     if (this.socket && this.socket.connected) {
//       this.socket.emit("leave-user", { userId });
//       console.log(`Left user room for user ${userId}`);
//     }
//   }

//   onOrderStatusUpdate(callback: (data: any) => void) {
//     if (this.socket) {
//       this.socket.on("orderStatusUpdated", callback);
//     }
//   }

//   offOrderStatusUpdate() {
//     if (this.socket) {
//       this.socket.off("orderStatusUpdated");
//     }
//   }

//   // General event listeners
//   on(event: string, callback: (...args: any[]) => void) {
//     if (this.socket) {
//       this.socket.on(event, callback);
//     }
//   }

//   off(event: string, callback?: (...args: any[]) => void) {
//     if (this.socket) {
//       if (callback) {
//         this.socket.off(event, callback);
//       } else {
//         this.socket.off(event);
//       }
//     }
//   }

//   emit(event: string, data?: any) {
//     if (this.socket && this.socket.connected) {
//       this.socket.emit(event, data);
//     } else {
//       console.warn("Socket not connected, cannot emit event:", event);
//     }
//   }

//   // Utility methods
//   getCurrentUserId() {
//     return this.currentUserId;
//   }

//   setCurrentUserId(userId: number) {
//     this.currentUserId = userId;
//     if (this.socket && this.socket.connected) {
//       this.joinUserRoom(userId);
//     }
//   }
// }

// const socketService = new SocketService();
// export default socketService;

import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private currentUserId: number | null = null;

  connect(userId?: number): Socket | null {
    // Prevent multiple connections
    if (this.socket && this.isConnected) {
      console.log("🔄 Socket already connected");
      return this.socket;
    }

    try {
      console.log("🔌 Connecting to WebSocket...");

      this.socket = io("http://localhost:5000", {
        transports: ["websocket"],
        upgrade: true,
        query: userId ? { userId: userId.toString() } : {},
        forceNew: true, // Force new connection to prevent duplicates
      });

      if (userId) {
        this.currentUserId = userId;
      }

      this.setupEventListeners();

      return this.socket;
    } catch (error) {
      console.error("❌ Failed to connect to WebSocket:", error);
      return null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Remove all existing listeners first to prevent duplicates
    this.socket.removeAllListeners();

    this.socket.on("connect", () => {
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log("✅ Connected to WebSocket");

      // Join user room if userId is available
      if (this.currentUserId) {
        this.socket?.emit("joinUserRoom", { userId: this.currentUserId });
      }
    });

    this.socket.on("disconnect", (reason) => {
      this.isConnected = false;
      console.log("❌ Disconnected from WebSocket:", reason);
    });

    this.socket.on("reconnect", (attemptNumber) => {
      console.log(`🔄 Reconnected after ${attemptNumber} attempts`);
      this.isConnected = true;
    });

    this.socket.on("reconnect_error", (error) => {
      console.error("❌ Reconnection failed:", error);
    });
  }

  // Order status update listener (prevent duplicates)
  onOrderStatusUpdate(callback: (notification: any) => void) {
    if (!this.socket) return;

    // Remove existing listener first
    this.socket.off("orderStatusUpdated");

    // Add new listener
    this.socket.on("orderStatusUpdated", callback);
    console.log("📡 Order status update listener registered");
  }

  offOrderStatusUpdate() {
    if (this.socket) {
      this.socket.off("orderStatusUpdated");
      console.log("📡 Order status update listener removed");
    }
  }

  // Admin activity listeners (prevent duplicates)
  onUserActivity(callback: (activity: any) => void) {
    if (!this.socket) return;

    // Remove existing listeners first
    this.socket.off("kafkaUserActivity");
    this.socket.off("userActivity");
    this.socket.off("newUserActivity");

    // Add new listeners
    this.socket.on("kafkaUserActivity", callback);
    this.socket.on("userActivity", callback);
    this.socket.on("newUserActivity", callback);
    console.log("📡 User activity listeners registered");
  }

  offUserActivity() {
    if (this.socket) {
      this.socket.off("kafkaUserActivity");
      this.socket.off("userActivity");
      this.socket.off("newUserActivity");
      console.log("📡 User activity listeners removed");
    }
  }

  // Join admin room
  joinAdminRoom() {
    if (this.socket && this.isConnected) {
      this.socket.emit("joinAdminRoom");
      console.log("👑 Joining admin room");
    }
  }

  disconnect() {
    if (this.socket) {
      console.log("🔌 Disconnecting WebSocket...");
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.currentUserId = null;
    }
  }

  getSocket(): Socket | null {
    return this.socket;
  }

  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }
}

const socketService = new SocketService();
export default socketService;
