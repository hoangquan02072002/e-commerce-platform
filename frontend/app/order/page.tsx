// "use client";

// import * as React from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   ArrowUpDown,
//   ChevronDown,
//   MessageCircle,
//   MoreHorizontal,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
// import { getToken } from "@/utils/getToken";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// import UserChat from "@/components/userchat/UserChat";
// import socketService from "@/utils/socket";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Card,
// //   CardContent,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import ChatPopup from "@/components/ChatPopUp";

// // type ChatMessage = {
// //   id: string;
// //   content: string;
// //   sender: 'user' | 'support';
// //   timestamp: Date;
// // };
// // const ChatPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
// //   const [messages, setMessages] = React.useState<ChatMessage[]>([
// //     {
// //       id: '1',
// //       content: 'Hello! How can I help you with your order today?',
// //       sender: 'support',
// //       timestamp: new Date(),
// //     },
// //   ]);
// //   const [newMessage, setNewMessage] = React.useState('');
// //   const messagesEndRef = React.useRef<HTMLDivElement>(null);
// //   const handleSendMessage = () => {
// //     if (newMessage.trim() === '') return;

// //     // Add user message
// //     const userMessage: ChatMessage = {
// //       id: Date.now().toString(),
// //       content: newMessage,
// //       sender: 'user',
// //       timestamp: new Date(),
// //     };

// //     setMessages([...messages, userMessage]);
// //     setNewMessage('');

// //     // Simulate support response after a short delay
// //     setTimeout(() => {
// //       const supportMessage: ChatMessage = {
// //         id: (Date.now() + 1).toString(),
// //         content: "Thank you for your message. Our support team will get back to you shortly.",
// //         sender: 'support',
// //         timestamp: new Date(),
// //       };
// //       setMessages(prev => [...prev, supportMessage]);
// //     }, 1000);
// //   };
// export type Order = {
//   id: number;
//   totalAmount: string;
//   status: string;
//   paymentMethod: string;
//   isPaid: boolean;
//   paidAt: Date | null;
// };
// export const columns: ColumnDef<Order>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     header: "ID",
//     cell: ({ row }) => <div>{row.getValue("id")}</div>,
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
//   {
//     accessorKey: "totalAmount",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Total Amount
//           <ArrowUpDown className="w-4 h-4 ml-2" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => {
//       const amount = parseFloat(row.getValue("totalAmount"));
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "USD",
//       }).format(amount);
//       return <div className="font-medium">{formatted}</div>;
//     },
//   },
//   {
//     accessorKey: "paymentMethod",
//     header: "Payment Method",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("paymentMethod")}</div>
//     ),
//   },
//   {
//     accessorKey: "isPaid",
//     header: "Payment Status",
//     cell: ({ row }) => (
//       <div
//         className={row.getValue("isPaid") ? "text-green-600" : "text-red-600"}
//       >
//         {row.getValue("isPaid") ? "Paid" : "Unpaid"}
//       </div>
//     ),
//   },
//   {
//     accessorKey: "paidAt",
//     header: "Payment Date",
//     cell: ({ row }) => {
//       const date = row.getValue("paidAt");
//       return (
//         <div>{date ? new Date(date).toLocaleDateString() : "Not paid"}</div>
//       );
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const order = row.original;
//       const router = useRouter();
//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="w-8 h-8 p-0">
//               <span className="sr-only">Open menu</span>
//               <MoreHorizontal className="w-4 h-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(order.id.toString())}
//             >
//               Copy order ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>View order details</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => router.push("/order/chat")}>
//               Chat with Admin
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// export function DataTableDemo() {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [orders, setOrders] = React.useState<Order[]>([]);
//   const [isChatOpen, setIsChatOpen] = React.useState(false);
//   const userRedux = useSelector((state: RootState) => state.userLogin.user);
//   const userId = userRedux?.userId;

//   // React.useEffect(() => {
//   //   if (userId) {
//   //     initializeSocket(userId);

//   //     const socket = getSocket();
//   //     if (socket) {
//   //       // Listen for notifications
//   //       socket.on("orderStatusUpdated", (update: any) => {
//   //         // Show toast notification
//   //         toast.info("Order status updated to", {
//   //           position: "top-right",
//   //           autoClose: 5000,
//   //           hideProgressBar: false,
//   //           closeOnClick: true,
//   //           pauseOnHover: true,
//   //           draggable: true,
//   //         });

//   //         // If it's an order status update, update the order in the UI

//   //         setOrders((prevOrders) =>
//   //           prevOrders.map((order) =>
//   //             order.id === update.orderId
//   //               ? { ...order, status: update.newStatus }
//   //               : order
//   //           )
//   //         );
//   //       });
//   //     }

//   //     return () => {
//   //       const socket = getSocket();
//   //       if (socket) {
//   //         socket.off("orderStatusUpdated");
//   //       }
//   //     };
//   //   }
//   // }, []);

//   React.useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken();
//         const { data } = await axios.get(
//           `http://localhost:5000/orders/user/${userId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     if (userId) {
//       fetchOrders();
//     }
//   }, [userId]);

//   React.useEffect(() => {
//     if (userId) {
//       const socket = socketService.connect();

//       if (socket) {
//         socket.on("orderStatusUpdated", (update: any) => {
//           const { orderId, newStatus } = update;

//           // Show toast notification
//           toast.info(`Order #${orderId} status updated to ${newStatus}`, {
//             position: "top-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//           });

//           // Update the order status in the UI
//           setOrders((prevOrders) =>
//             prevOrders.map((order) =>
//               order.id === orderId ? { ...order, status: newStatus } : order
//             )
//           );
//         });
//       }

//       return () => {
//         if (socket) {
//           socket.off("orderStatusUpdated");
//         }
//       };
//     }
//   }, [userId]);

//   const table = useReactTable({
//     data: orders,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   });

//   return (
//     <div className="w-full p-4 md:p-6 lg:p-8">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
//         <div className="flex items-center gap-2">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="w-4 h-4 ml-2" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   );
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <div className="mt-4 border rounded-md">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   );
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:justify-between">
//         <div className="text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="flex items-center gap-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DataTableDemo;

"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken } from "@/utils/getToken";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import socketService from "@/utils/socket";

// Updated Order type to match your actual data structure
export type Order = {
  id: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt: string | null;
  // User fields directly on order object
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  stateCountry: string;
  zipCode: string;
  createdAt?: string;
  updatedAt?: string;
};

export function UserOrdersPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);

  const userRedux = useSelector((state: RootState) => state.userLogin.user);
  const userId = userRedux?.userId;
  const router = useRouter();

  // Fetch user orders
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const token = getToken();
        const { data } = await axios.get(
          `http://localhost:5000/orders/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Socket connection for real-time notifications
  React.useEffect(() => {
    if (!userId) return;

    // Connect to socket with user ID
    socketService.connect(userId);

    // Listen for order status updates
    socketService.onOrderStatusUpdate((notification: any) => {
      console.log("Received order notification:", notification);

      const { orderId, newStatus, message } = notification;

      // Show toast notification
      toast.info(`Order status updated to ${newStatus}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Update the order status in the UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );
    });

    // Cleanup on unmount
    return () => {
      socketService.offOrderStatusUpdate();
      socketService.disconnect();
    };
  }, [userId]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: ColumnDef<Order>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => (
        <div className="font-medium">#{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
              status
            )}`}
          >
            {status.toUpperCase()}
          </span>
        );
      },
    },
    {
      accessorKey: "totalAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Amount
            <ArrowUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("totalAmount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("paymentMethod")}</div>
      ),
    },
    {
      accessorKey: "isPaid",
      header: "Payment Status",
      cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.getValue("isPaid")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.getValue("isPaid") ? "Paid" : "Unpaid"}
        </span>
      ),
    },
    {
      accessorKey: "paidAt",
      header: "Payment Date",
      cell: ({ row }) => {
        const date = row.getValue("paidAt") as string | null;
        if (!date) return <div className="text-gray-400">Not paid</div>;

        try {
          return <div>{new Date(date).toLocaleDateString()}</div>;
        } catch (error) {
          return <div className="text-gray-400">Invalid date</div>;
        }
      },
    },
    {
      accessorKey: "customer",
      header: "Customer Info",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="text-sm">
            <div className="font-medium">
              {order.firstName} {order.lastName}
            </div>
            <div className="text-gray-500">{order.email}</div>
          </div>
        );
      },
    },
    {
      accessorKey: "shippingAddress",
      header: "Shipping Address",
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div className="text-sm">
            <div>{order.address}</div>
            <div>
              {order.city}, {order.stateCountry}
            </div>
            <div>
              {order.country} {order.zipCode}
            </div>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const order = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(order.id.toString())
                }
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/order/${order.id}`)}
              >
                View order details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/order/chat")}>
                Chat with Support
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">My Orders</h2>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-4 border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserOrdersPage;
