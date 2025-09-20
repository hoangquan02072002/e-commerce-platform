"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken } from "@/utils/getToken";
import socketService from "@/utils/socket";
import axios from "axios";
import {
  Activity,
  Users,
  Eye,
  ShoppingCart,
  Search,
  CreditCard,
  RefreshCw,
  Filter,
  TrendingUp,
  LogIn,
  LogOut,
  Trash2,
  Plus,
} from "lucide-react";

interface UserActivity {
  id?: number;
  userId: number;
  userName?: string;
  userEmail?: string;
  activityType:
    | "LOGIN"
    | "LOGOUT"
    | "VIEW_PRODUCT"
    | "ADD_TO_CART"
    | "REMOVE_FROM_CART"
    | "SEARCH"
    | "PURCHASE";
  data: any;
  ipAddress?: string;
  userAgent?: string;
  location?: string;
  timestamp: string;
  sessionId?: string;
}

const AdminActivitiesPage = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<UserActivity[]>(
    []
  );
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalActivities: 0,
    activeUsers: 0,
    todayActivities: 0,
    recentLogins: 0,
  });

  const userRedux = useSelector((state: RootState) => state.userLogin.user);

  useEffect(() => {
    fetchInitialActivities();
    setupWebSocketConnection();
    fetchStats();

    return () => {
      const socket = socketService.getSocket();
      socket?.disconnect();
    };
  }, []);

  const fetchInitialActivities = async () => {
    try {
      setLoading(true);
      const token = getToken();

      // Try to fetch from your backend
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/activities/recent?limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && Array.isArray(response.data)) {
          setActivities(response.data);
          setFilteredActivities(response.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (backendError) {
        console.warn("Backend not available, using mock data");

        // Mock data for demonstration
        const mockActivities: UserActivity[] = [
          {
            id: 1,
            userId: 123,
            userName: "John Doe",
            userEmail: "john@example.com",
            activityType: "ADD_TO_CART",
            data: {
              productId: 456,
              productName: "iPhone 15 Pro",
              quantity: 1,
              price: 999.99,
            },
            timestamp: new Date().toISOString(),
            location: "New York, US",
            ipAddress: "192.168.1.1",
            sessionId: "session-123-456",
          },
          {
            id: 2,
            userId: 124,
            userName: "Jane Smith",
            userEmail: "jane@example.com",
            activityType: "REMOVE_FROM_CART",
            data: {
              productId: 789,
              productName: "MacBook Pro M3",
              quantity: 1,
              price: 1999.99,
            },
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
            location: "London, UK",
            ipAddress: "192.168.1.2",
            sessionId: "session-124-789",
          },
          {
            id: 3,
            userId: 125,
            userName: "Mike Johnson",
            userEmail: "mike@example.com",
            activityType: "LOGIN",
            data: {
              loginMethod: "email",
              deviceType: "desktop",
            },
            timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
            location: "Toronto, CA",
            ipAddress: "192.168.1.3",
            sessionId: "session-125-101",
          },
          {
            id: 4,
            userId: 126,
            userName: "Sarah Wilson",
            userEmail: "sarah@example.com",
            activityType: "VIEW_PRODUCT",
            data: {
              productId: 321,
              productName: "iPad Air",
              categoryName: "Tablets",
              price: 599.99,
            },
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
            location: "Berlin, DE",
            ipAddress: "192.168.1.4",
            sessionId: "session-126-321",
          },
        ];

        setActivities(mockActivities);
        setFilteredActivities(mockActivities);
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        "http://localhost:5000/admin/activities/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Calculate stats from current activities
      setStats({
        totalActivities: activities.length,
        activeUsers: new Set(activities.map((a) => a.userId)).size,
        todayActivities: activities.filter(
          (a) =>
            new Date(a.timestamp).toDateString() === new Date().toDateString()
        ).length,
        recentLogins: activities.filter((a) => a.activityType === "LOGIN")
          .length,
      });
    }
  };

  const setupWebSocketConnection = () => {
    const socket = socketService.connect();

    if (socket) {
      // Join admin room
      socket.emit("joinAdminRoom");

      socket.on("connect", () => {
        setIsConnected(true);
        console.log("✅ Connected to WebSocket for admin activities");
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
        console.log("❌ Disconnected from WebSocket");
      });

      // Listen for real-time user activities from Kafka
      socket.on("kafkaUserActivity", (activity: UserActivity) => {
        console.log("📨 New Kafka activity received:", activity);

        const newActivity = {
          ...activity,
          id: Date.now(), // Generate unique ID
          timestamp: activity.timestamp || new Date().toISOString(),
        };

        setActivities((prev) => [newActivity, ...prev].slice(0, 100));
        setFilteredActivities((prev) => [newActivity, ...prev].slice(0, 100));

        // Update stats
        setStats((prev) => ({
          ...prev,
          totalActivities: prev.totalActivities + 1,
          todayActivities: prev.todayActivities + 1,
        }));

        // Show notification for important activities
        if (
          ["LOGIN", "ADD_TO_CART", "REMOVE_FROM_CART"].includes(
            activity.activityType
          )
        ) {
          showNotification(activity);
        }
      });

      // Listen for other activity events
      socket.on("userActivity", (activity: UserActivity) => {
        console.log("📨 New user activity:", activity);
        handleNewActivity(activity);
      });

      socket.on("newUserActivity", (activity: UserActivity) => {
        console.log("📨 New user activity (admin specific):", activity);
        handleNewActivity(activity);
      });
    }
  };

  const handleNewActivity = (activity: UserActivity) => {
    const newActivity = {
      ...activity,
      id: Date.now(),
      timestamp: activity.timestamp || new Date().toISOString(),
    };

    setActivities((prev) => [newActivity, ...prev].slice(0, 100));
    setFilteredActivities((prev) => [newActivity, ...prev].slice(0, 100));

    setStats((prev) => ({
      ...prev,
      totalActivities: prev.totalActivities + 1,
      todayActivities: prev.todayActivities + 1,
    }));
  };

  const showNotification = (activity: UserActivity) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const activityMessages = {
        LOGIN: `${activity.userName} logged in`,
        ADD_TO_CART: `${activity.userName} added ${activity.data.productName} to cart`,
        REMOVE_FROM_CART: `${activity.userName} removed ${activity.data.productName} from cart`,
      };

      new Notification("User Activity", {
        body:
          activityMessages[
            activity.activityType as keyof typeof activityMessages
          ] || "New user activity",
        icon: "/logo.png",
      });
    }
  };

  useEffect(() => {
    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let filtered = activities;

    // Filter by activity type
    if (filter !== "all") {
      filtered = filtered.filter(
        (activity) => activity.activityType === filter
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (activity) =>
          activity.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.userEmail
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          activity.activityType
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          JSON.stringify(activity.data)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredActivities(filtered);
  }, [activities, filter, searchTerm]);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "LOGIN":
        return <LogIn className="w-4 h-4" />;
      case "LOGOUT":
        return <LogOut className="w-4 h-4" />;
      case "VIEW_PRODUCT":
        return <Eye className="w-4 h-4" />;
      case "ADD_TO_CART":
        return <Plus className="w-4 h-4" />;
      case "REMOVE_FROM_CART":
        return <Trash2 className="w-4 h-4" />;
      case "SEARCH":
        return <Search className="w-4 h-4" />;
      case "PURCHASE":
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "LOGIN":
        return "bg-green-100 text-green-800 border-green-200";
      case "LOGOUT":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "VIEW_PRODUCT":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "ADD_TO_CART":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "REMOVE_FROM_CART":
        return "bg-red-100 text-red-800 border-red-200";
      case "PURCHASE":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "SEARCH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const formatActivityData = (activity: UserActivity) => {
    switch (activity.activityType) {
      case "LOGIN":
        return `Logged in via ${activity.data.loginMethod || "unknown method"}`;
      case "LOGOUT":
        return "Logged out";
      case "VIEW_PRODUCT":
        return `Viewed "${
          activity.data.productName || `Product #${activity.data.productId}`
        }"`;
      case "ADD_TO_CART":
        return `Added "${activity.data.productName}" (${activity.data.quantity}x) to cart - $${activity.data.price}`;
      case "REMOVE_FROM_CART":
        return `Removed "${activity.data.productName}" (${activity.data.quantity}x) from cart - $${activity.data.price}`;
      case "SEARCH":
        return `Searched for "${activity.data.searchQuery}"`;
      case "PURCHASE":
        return `Made purchase of $${activity.data.totalAmount}`;
      default:
        return JSON.stringify(activity.data);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
        <span className="ml-2 text-lg">Loading activities...</span>
      </div>
    );
  }

  return (
    <div className="p-6 mx-auto space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            User Activities Dashboard
          </h1>
          <p className="mt-1 text-gray-600">
            Monitor all user activities from Kafka in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {isConnected ? "Live" : "Disconnected"}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            Kafka Integration
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Total Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalActivities}
            </div>
            <p className="mt-1 text-sm text-gray-500">All time</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.activeUsers}
            </div>
            <p className="mt-1 text-sm text-gray-500">Unique users</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-600">
              <Activity className="w-4 h-4 mr-2" />
              Today's Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.todayActivities}
            </div>
            <p className="mt-1 text-sm text-gray-500">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-sm font-medium text-gray-600">
              <LogIn className="w-4 h-4 mr-2" />
              Recent Logins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {stats.recentLogins}
            </div>
            <p className="mt-1 text-sm text-gray-500">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search by user name, email, or activity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by activity type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="LOGIN">Login</SelectItem>
              <SelectItem value="LOGOUT">Logout</SelectItem>
              <SelectItem value="VIEW_PRODUCT">View Product</SelectItem>
              <SelectItem value="ADD_TO_CART">Add to Cart</SelectItem>
              <SelectItem value="REMOVE_FROM_CART">Remove from Cart</SelectItem>
              <SelectItem value="PURCHASE">Purchase</SelectItem>
              <SelectItem value="SEARCH">Search</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={fetchInitialActivities} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Real-time Activities from Kafka
          </CardTitle>
          <CardDescription>
            Live user activities ({filteredActivities.length} activities
            displayed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 overflow-y-auto max-h-96">
            {filteredActivities.map((activity, index) => (
              <div
                key={activity.id || index}
                className="flex items-start justify-between p-4 transition-colors duration-300 border rounded-lg hover:bg-gray-50 animate-in slide-in-from-top-2"
              >
                <div className="flex items-start flex-1 space-x-4">
                  <div className="flex-shrink-0">
                    <Badge
                      className={`${getActivityColor(
                        activity.activityType
                      )} border flex items-center gap-1`}
                    >
                      {getActivityIcon(activity.activityType)}
                      {activity.activityType.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-1 space-x-2">
                      <p className="font-medium text-gray-900 truncate">
                        {activity.userName || `User ${activity.userId}`}
                      </p>
                      <span className="text-gray-400">•</span>
                      <p className="text-sm text-gray-600 truncate">
                        {activity.userEmail}
                      </p>
                    </div>
                    <p className="mb-1 text-sm text-gray-800">
                      {formatActivityData(activity)}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{activity.location || "Unknown location"}</span>
                      <span>•</span>
                      <span>{activity.ipAddress || "Unknown IP"}</span>
                      {activity.sessionId && (
                        <>
                          <span>•</span>
                          <span>Session: {activity.sessionId.slice(-8)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4 text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {formatTimestamp(activity.timestamp)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {filteredActivities.length === 0 && (
              <div className="py-8 text-center text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="mb-2 text-lg font-medium">No activities found</p>
                <p>
                  No activities match your current criteria or none have been
                  received yet.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivitiesPage;
