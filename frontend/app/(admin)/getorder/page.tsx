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
// import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

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
// import { getToken } from "@/utils/getToken";
// import axios from "axios";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { toast } from "react-toastify";
// import socketService from "@/utils/socket";
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// export type Order = {
//   id: number;
//   totalAmount: string;
//   status: string;
//   paymentMethod: string;
//   isPaid: boolean;
//   paidAt: Date | null;
// };

// const StatusCell = ({
//   order,
//   orders,
//   setOrders,
// }: {
//   order: Order;
//   orders: Order[];
//   setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
// }) => {
//   const [isUpdating, setIsUpdating] = React.useState(false);
//   const [updateError, setUpdateError] = React.useState<string | null>(null);
//   const updateOrderStatus = async (newStatus: string) => {
//     try {
//       setIsUpdating(true);
//       setUpdateError(null);
//       const token = getToken();
//       await axios.patch(
//         `http://localhost:5000/orders/${order.id}/status`,
//         { status: newStatus },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       // const socket = socketService.connect();
//       // if (socket) {
//       //   socket.emit("orderStatusUpdated", {
//       //     orderId: order.id,
//       //     newStatus,
//       //   });
//       // }
//       toast.success(`Order  status updated to ${newStatus}`);
//       setOrders(
//         orders.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
//       );
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       setUpdateError("Failed to update status. Please try again.");
//       setOrders((prevOrders) => [...prevOrders]);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   return (
//     <div className="capitalize">
//       <Select
//         defaultValue={order.status}
//         onValueChange={updateOrderStatus}
//         disabled={isUpdating}
//         value={order.status}
//       >
//         <SelectTrigger className="w-[180px]">
//           <SelectValue placeholder={order.status} />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectGroup>
//             <SelectItem value="PENDING">Pending</SelectItem>
//             <SelectItem value="SHIPPED">Shipped</SelectItem>
//             <SelectItem value="DELIVERED">Delivered</SelectItem>
//             <SelectItem value="CANCELED">Canceled</SelectItem>
//           </SelectGroup>
//         </SelectContent>
//       </Select>
//       {updateError && (
//         <p className="mt-1 text-xs text-red-500">{updateError}</p>
//       )}
//       {isUpdating && <p className="mt-1 text-xs text-blue-500">Updating...</p>}
//     </div>
//   );
// };

// export function DataTableDemo() {
//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = React.useState({});
//   const [orders, setOrders] = React.useState<Order[]>([]);
//   const userRedux = useSelector((state: RootState) => state.userLogin.user);
//   const userId = userRedux?.userId;
//   React.useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = getToken();
//         const { data } = await axios.get(`http://localhost:5000/orders`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const columns = React.useMemo<ColumnDef<Order>[]>(
//     () => [
//       {
//         id: "select",
//         header: ({ table }) => (
//           <Checkbox
//             checked={
//               table.getIsAllPageRowsSelected() ||
//               (table.getIsSomePageRowsSelected() && "indeterminate")
//             }
//             onCheckedChange={(value) =>
//               table.toggleAllPageRowsSelected(!!value)
//             }
//             aria-label="Select all"
//           />
//         ),
//         cell: ({ row }) => (
//           <Checkbox
//             checked={row.getIsSelected()}
//             onCheckedChange={(value) => row.toggleSelected(!!value)}
//             aria-label="Select row"
//           />
//         ),
//         enableSorting: false,
//         enableHiding: false,
//       },
//       {
//         accessorKey: "id",
//         header: "ID",
//         cell: ({ row }) => <div>{row.getValue("id")}</div>,
//       },

//       {
//         accessorKey: "totalAmount",
//         header: ({ column }) => {
//           return (
//             <Button
//               variant="ghost"
//               onClick={() =>
//                 column.toggleSorting(column.getIsSorted() === "asc")
//               }
//             >
//               Total Amount
//               <ArrowUpDown />
//             </Button>
//           );
//         },
//         cell: ({ row }) => {
//           const amount = parseFloat(row.getValue("totalAmount"));
//           const formatted = new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//           }).format(amount);
//           return <div className="font-medium">{formatted}</div>;
//         },
//       },
//       {
//         accessorKey: "paymentMethod",
//         header: "Payment Method",
//         cell: ({ row }) => (
//           <div className="capitalize">{row.getValue("paymentMethod")}</div>
//         ),
//       },
//       {
//         accessorKey: "isPaid",
//         header: "Payment Status",
//         cell: ({ row }) => (
//           <div
//             className={
//               row.getValue("isPaid") ? "text-green-600" : "text-red-600"
//             }
//           >
//             {row.getValue("isPaid") ? "Paid" : "Unpaid"}
//           </div>
//         ),
//       },
//       {
//         accessorKey: "paidAt",
//         header: "Payment Date",
//         cell: ({ row }) => {
//           const date = row.getValue("paidAt") as string | null;
//           if (!date) return <div>Not paid</div>;
//           return <div>{new Date(date).toLocaleDateString()}</div>;
//         },
//       },
//       {
//         accessorKey: "status",
//         header: "Status",
//         cell: ({ row }) => {
//           const order = row.original;
//           return (
//             <StatusCell order={order} orders={orders} setOrders={setOrders} />
//           );
//         },
//       },
//       {
//         id: "actions",
//         enableHiding: false,
//         cell: ({ row }) => {
//           const order = row.original;
//           return (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="w-8 h-8 p-0">
//                   <span className="sr-only">Open menu</span>
//                   <MoreHorizontal />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                 <DropdownMenuItem
//                   onClick={() =>
//                     navigator.clipboard.writeText(order.id.toString())
//                   }
//                 >
//                   Copy order ID
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>View order details</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           );
//         },
//       },
//     ],
//     [orders]
//   );

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
//     <div className="w-full">
//       <div className="flex items-center justify-center py-4">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" className="ml-auto">
//               Columns <ChevronDown />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             {table
//               .getAllColumns()
//               .filter((column) => column.getCanHide())
//               .map((column) => {
//                 return (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className="capitalize"
//                     checked={column.getIsVisible()}
//                     onCheckedChange={(value) =>
//                       column.toggleVisibility(!!value)
//                     }
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 );
//               })}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </div>
//       <div className="border rounded-md">
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
//       <div className="flex items-center justify-end py-4 space-x-2">
//         <div className="flex-1 text-sm text-muted-foreground">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>
//         <div className="space-x-2">
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
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  RefreshCw,
} from "lucide-react";

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
import { getToken } from "@/utils/getToken";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

// Updated Order type to match your actual data structure
export type Order = {
  id: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt: string | null;
  createdAt?: string;
  updatedAt?: string;
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
};

const StatusCell = ({
  order,
  onStatusUpdate,
}: {
  order: Order;
  onStatusUpdate: (orderId: number, newStatus: string) => void;
}) => {
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === order.status) return;

    setIsUpdating(true);
    try {
      const token = getToken();
      await axios.patch(
        `http://localhost:5000/orders/${order.id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Order #${order.id} status updated to ${newStatus}`);
      onStatusUpdate(order.id, newStatus);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "border-yellow-300 bg-yellow-50";
      case "processing":
        return "border-blue-300 bg-blue-50";
      case "shipped":
        return "border-purple-300 bg-purple-50";
      case "delivered":
        return "border-green-300 bg-green-50";
      case "cancelled":
        return "border-red-300 bg-red-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={order.status}
        onValueChange={handleStatusChange}
        disabled={isUpdating}
      >
        <SelectTrigger className={`w-[160px] ${getStatusColor(order.status)}`}>
          <SelectValue placeholder={order.status} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="PENDING">🟡 Pending</SelectItem>
            <SelectItem value="SHIPPED">🟣 Shipped</SelectItem>
            <SelectItem value="DELIVERED">🟢 Delivered</SelectItem>
            <SelectItem value="CANCELLED">🔴 Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      {isUpdating && <RefreshCw className="w-4 h-4 animate-spin" />}
    </div>
  );
};

export function AdminOrdersPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Fetch all orders
  const fetchOrders = React.useCallback(async () => {
    try {
      setLoading(true);
      const token = getToken();
      const { data } = await axios.get(`http://localhost:5000/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log("orders", orders);

  React.useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Handle status update
  const handleStatusUpdate = (orderId: number, newStatus: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  // Filter orders based on search term
  const filteredOrders = React.useMemo(() => {
    if (!searchTerm) return orders;

    return orders.filter((order) => {
      const fullName = `${order.firstName} ${order.lastName}`.toLowerCase();
      const searchLower = searchTerm.toLowerCase();

      return (
        order.id.toString().includes(searchTerm) ||
        fullName.includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower) ||
        order.status.toLowerCase().includes(searchLower) ||
        order.phoneNumber.includes(searchTerm)
      );
    });
  }, [orders, searchTerm]);

  const columns = React.useMemo<ColumnDef<Order>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
        accessorKey: "customer",
        header: "Customer",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <div>
              <div className="font-medium">
                {order.firstName} {order.lastName}
              </div>
              <div className="text-sm text-gray-500">{order.email}</div>
              <div className="text-sm text-gray-400">{order.phoneNumber}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "address",
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
        accessorKey: "totalAmount",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
        header: "Payment",
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
          return <div>{new Date(date).toLocaleDateString()}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const order = row.original;
          return (
            <StatusCell order={order} onStatusUpdate={handleStatusUpdate} />
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
                <DropdownMenuItem>View order details</DropdownMenuItem>
                <DropdownMenuItem>Contact customer</DropdownMenuItem>
                <DropdownMenuItem>Print shipping label</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [handleStatusUpdate]
  );

  const table = useReactTable({
    data: filteredOrders,
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
          <h2 className="text-2xl font-bold tracking-tight">
            Order Management
          </h2>
          <p className="text-gray-600">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchOrders} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
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

      {/* Search Bar */}
      <div className="flex items-center gap-4 mt-4">
        <Input
          placeholder="Search orders by ID, customer name, email, phone, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="text-sm text-gray-500">
          {filteredOrders.length} of {orders.length} orders
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

export default AdminOrdersPage;
