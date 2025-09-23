"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { getToken } from "@/utils/getToken";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  Globe,
  Wifi,
  Eye,
  RefreshCw,
  Activity,
  Sparkles,
  Lock,
  ArrowLeft,
} from "lucide-react";

interface DeviceInfo {
  id: number;
  deviceType: string;
  browser: string;
  userAgent: string;
  ipAddress: string;
  geoLocation: string;
  lastLoginAt: string;
  isCurrentDevice?: boolean;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const token = getToken();
  const userRedux = useSelector((state: RootState) => state.userLogin.user);
  const userId = userRedux?.userId;

  const getDeviceIcon = (deviceType: string) => {
    const type = deviceType.toLowerCase();
    if (type.includes("mobile") || type.includes("phone")) return Smartphone;
    if (type.includes("tablet") || type.includes("ipad")) return Tablet;
    if (type.includes("desktop")) return Monitor;
    return Laptop;
  };

  const getBrowserIcon = (browser: string) => {
    return Globe; // Could be enhanced with specific browser icons
  };

  const getSecurityLevel = (device: DeviceInfo) => {
    const daysSinceLogin = Math.floor(
      (new Date().getTime() - new Date(device.lastLoginAt).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (daysSinceLogin === 0) return { level: "active", color: "green" };
    if (daysSinceLogin <= 7) return { level: "recent", color: "blue" };
    if (daysSinceLogin <= 30) return { level: "moderate", color: "yellow" };
    return { level: "old", color: "red" };
  };

  const fetchDevices = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(
        `http://localhost:5000/device/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const sortedDevices = [...response.data].sort(
        (a, b) =>
          new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime()
      );

      setDevices(sortedDevices);
      setError(null);
    } catch (err) {
      console.error("Error fetching devices:", err);
      setError("Failed to fetch your devices. Please try again later.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchDevices();
    }
  }, [token, userId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
        <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-12 w-72 bg-gradient-to-r from-gray-200 to-gray-300" />
              <Skeleton className="w-full h-6 max-w-2xl bg-gradient-to-r from-gray-200 to-gray-300" />
            </div>

            {/* Cards Skeleton */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="p-6 bg-white shadow-lg rounded-3xl animate-pulse"
                >
                  <div className="space-y-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <Skeleton className="w-full h-6" />
                    <Skeleton className="w-3/4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Table Skeleton */}
            <div className="p-8 bg-white shadow-lg rounded-3xl">
              <div className="space-y-6">
                <Skeleton className="w-64 h-8" />
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="w-full h-16" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const activeDevices = devices.filter(
    (d) => getSecurityLevel(d).level === "active"
  ).length;
  const recentDevices = devices.filter((d) =>
    ["active", "recent"].includes(getSecurityLevel(d).level)
  ).length;
  const totalDevices = devices.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="px-4 py-8 mx-auto max-w-7xl md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center px-4 py-2 space-x-2 text-gray-600 transition-all duration-300 bg-white shadow-md hover:text-gray-900 rounded-xl hover:shadow-lg">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Profile</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text">
                  Device Security
                </h1>
                <p className="mt-2 text-gray-600">
                  Monitor and manage all devices that have accessed your account
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={fetchDevices}
                disabled={refreshing}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-all duration-300 bg-blue-500 shadow-lg hover:bg-blue-600 rounded-xl hover:shadow-xl"
              >
                <RefreshCw
                  className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>

              <div className="flex items-center px-4 py-2 space-x-2 text-green-700 bg-green-100 rounded-xl">
                <Shield className="w-5 h-5" />
                <span className="font-semibold">Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
          <div className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-green-100 rounded-2xl">
                <Activity className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600">
                  {activeDevices}
                </div>
                <div className="text-sm text-gray-500">Active Today</div>
              </div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold">Currently Active</div>
              <div className="text-sm text-gray-500">
                Devices used in the last 24 hours
              </div>
            </div>
          </div>

          <div className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-blue-100 rounded-2xl">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {recentDevices}
                </div>
                <div className="text-sm text-gray-500">Recent Access</div>
              </div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold">Recent Activity</div>
              <div className="text-sm text-gray-500">
                Devices used in the last week
              </div>
            </div>
          </div>

          <div className="p-8 transition-all duration-300 bg-white border border-gray-100 shadow-xl rounded-3xl hover:shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 bg-purple-100 rounded-2xl">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-600">
                  {totalDevices}
                </div>
                <div className="text-sm text-gray-500">Total Devices</div>
              </div>
            </div>
            <div className="text-gray-700">
              <div className="font-semibold">All Time</div>
              <div className="text-sm text-gray-500">
                Total registered devices
              </div>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-8">
            <div className="p-6 border-2 border-red-200 bg-red-50 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-900">
                    Error Loading Devices
                  </h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Alert */}
        <div className="mb-8">
          <div className="p-6 border-2 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 rounded-2xl">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <Eye className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-semibold text-amber-900">
                  Security Notice
                </h3>
                <p className="mb-3 text-amber-800">
                  Review all devices carefully. If you see any devices you don't
                  recognize, change your password immediately and contact
                  support.
                </p>
                <button className="px-4 py-2 font-medium text-white transition-colors rounded-lg bg-amber-600 hover:bg-amber-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Devices Table */}
        <div className="overflow-hidden bg-white border border-gray-100 shadow-xl rounded-3xl">
          <div className="p-8 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-indigo-100 rounded-xl">
                  <Laptop className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Device Login History
                  </h2>
                  <p className="text-gray-600">
                    Complete list of devices that have accessed your account
                  </p>
                </div>
              </div>

              <div className="flex items-center px-4 py-2 space-x-2 text-indigo-700 bg-indigo-50 rounded-xl">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">{devices.length} Devices</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            {devices.length === 0 ? (
              <div className="p-16 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full">
                  <Laptop className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  No Devices Found
                </h3>
                <p className="mb-6 text-gray-600">
                  No device history available for your account.
                </p>
                <button
                  onClick={fetchDevices}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-blue-500 hover:bg-blue-600 rounded-xl"
                >
                  Refresh Devices
                </button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-100">
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      Device
                    </TableHead>
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      Browser
                    </TableHead>
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      Location
                    </TableHead>
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      IP Address
                    </TableHead>
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      Last Login
                    </TableHead>
                    <TableHead className="px-6 py-4 font-semibold text-gray-700">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device, index) => {
                    const DeviceIcon = getDeviceIcon(device.deviceType);
                    const BrowserIcon = getBrowserIcon(device.browser);
                    const security = getSecurityLevel(device);

                    return (
                      <TableRow
                        key={device.id}
                        className="transition-colors border-gray-100 hover:bg-gray-50"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <TableCell className="px-6 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                              <DeviceIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {device.deviceType}
                              </div>
                              {device.isCurrentDevice && (
                                <div className="flex items-center mt-1 space-x-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                  <span className="text-xs font-medium text-green-600">
                                    Current Device
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-6">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-gray-50">
                              <BrowserIcon className="w-4 h-4 text-gray-600" />
                            </div>
                            <span className="font-medium text-gray-900">
                              {device.browser}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-700">
                              {device.geoLocation}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-6">
                          <div className="px-3 py-2 font-mono text-sm bg-gray-100 border rounded-lg">
                            {device.ipAddress}
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-6">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {formatDistanceToNow(
                                new Date(device.lastLoginAt),
                                { addSuffix: true }
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {format(
                                new Date(device.lastLoginAt),
                                "MMM d, yyyy h:mm a"
                              )}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell className="px-6 py-6">
                          <div className="flex items-center space-x-2">
                            {security.level === "active" && (
                              <div className="flex items-center px-3 py-1 space-x-2 text-green-700 bg-green-100 rounded-full">
                                <CheckCircle className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Active
                                </span>
                              </div>
                            )}
                            {security.level === "recent" && (
                              <div className="flex items-center px-3 py-1 space-x-2 text-blue-700 bg-blue-100 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Recent
                                </span>
                              </div>
                            )}
                            {security.level === "moderate" && (
                              <div className="flex items-center px-3 py-1 space-x-2 text-yellow-700 bg-yellow-100 rounded-full">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  Moderate
                                </span>
                              </div>
                            )}
                            {security.level === "old" && (
                              <div className="flex items-center px-3 py-1 space-x-2 text-red-700 bg-red-100 rounded-full">
                                <AlertTriangle className="w-4 h-4" />
                                <span className="text-sm font-medium">Old</span>
                              </div>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Lock className="w-4 h-4" />
                <span>All device data is encrypted and secure</span>
              </div>

              <div className="text-sm text-gray-500">
                Last updated: {format(new Date(), "MMM d, yyyy h:mm a")}
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="p-8 mt-8 text-white shadow-xl bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl">
          <div className="space-y-6 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-bold">Security Best Practices</h3>
            </div>

            <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-400" />
                <span>Use strong, unique passwords</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-400" />
                <span>Enable two-factor authentication</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-400" />
                <span>Review device activity regularly</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
