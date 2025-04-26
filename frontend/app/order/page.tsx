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
  MessageCircle,
  MoreHorizontal,
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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getToken } from "@/utils/getToken";
import axios from "axios";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import ChatPopup from "@/components/ChatPopUp";

// type ChatMessage = {
//   id: string;
//   content: string;
//   sender: 'user' | 'support';
//   timestamp: Date;
// };
// const ChatPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   const [messages, setMessages] = React.useState<ChatMessage[]>([
//     {
//       id: '1',
//       content: 'Hello! How can I help you with your order today?',
//       sender: 'support',
//       timestamp: new Date(),
//     },
//   ]);
//   const [newMessage, setNewMessage] = React.useState('');
//   const messagesEndRef = React.useRef<HTMLDivElement>(null);
//   const handleSendMessage = () => {
//     if (newMessage.trim() === '') return;

//     // Add user message
//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       content: newMessage,
//       sender: 'user',
//       timestamp: new Date(),
//     };

//     setMessages([...messages, userMessage]);
//     setNewMessage('');

//     // Simulate support response after a short delay
//     setTimeout(() => {
//       const supportMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         content: "Thank you for your message. Our support team will get back to you shortly.",
//         sender: 'support',
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, supportMessage]);
//     }, 1000);
//   };
export type Order = {
  id: number;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  isPaid: boolean;
  paidAt: Date | null;
};
export const columns: ColumnDef<Order>[] = [
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
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
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
          <ArrowUpDown className="ml-2 w-4 h-4" />
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
      <div
        className={row.getValue("isPaid") ? "text-green-600" : "text-red-600"}
      >
        {row.getValue("isPaid") ? "Paid" : "Unpaid"}
      </div>
    ),
  },
  {
    accessorKey: "paidAt",
    header: "Payment Date",
    cell: ({ row }) => {
      const date = row.getValue("paidAt");
      return (
        <div>{date ? new Date(date).toLocaleDateString() : "Not paid"}</div>
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
            <Button variant="ghost" className="p-0 w-8 h-8">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(order.id.toString())}
            >
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View order details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const userRedux = useSelector(
    (state: RootState) => state.userLogin.user?.user_info.user
  );
  const userId = userRedux?.id;

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
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
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

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

  return (
    <div className="p-4 w-full md:p-6 lg:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
        <div className="flex gap-2 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 w-4 h-4" />
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

      <div className="mt-4 rounded-md border">
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
                  No results.
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
        <div className="flex gap-2 items-center">
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
      {/* <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      {!isChatOpen && (
        <Button
          className="flex fixed right-4 bottom-4 justify-center items-center w-12 h-12 rounded-full shadow-lg"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )} */}
    </div>
  );
}

export default DataTableDemo;

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
//   MoreHorizontal,
//   MessageCircle,
//   X,
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
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// // Chat Message Type
// type ChatMessage = {
//   id: string;
//   content: string;
//   sender: "user" | "support";
//   timestamp: Date;
// };

// // Chat Popup Component
// const ChatPopup = ({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) => {
//   const [messages, setMessages] = React.useState<ChatMessage[]>([
//     {
//       id: "1",
//       content: "Hello! How can I help you with your order today?",
//       sender: "support",
//       timestamp: new Date(),
//     },
//   ]);
//   const [newMessage, setNewMessage] = React.useState("");
//   const messagesEndRef = React.useRef<HTMLDivElement>(null);

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return;

//     // Add user message
//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       content: newMessage,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages([...messages, userMessage]);
//     setNewMessage("");

//     // Simulate support response after a short delay
//     setTimeout(() => {
//       const supportMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         content:
//           "Thank you for your message. Our support team will get back to you shortly.",
//         sender: "support",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, supportMessage]);
//     }, 1000);
//   };

//   // Auto scroll to bottom when new messages arrive
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
//           <div className="space-y-4">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex ${
//                   message.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`max-w-[80%] rounded-lg p-3 ${
//                     message.sender === "user"
//                       ? "bg-primary text-primary-foreground"
//                       : "bg-muted"
//                   }`}
//                 >
//                   <p>{message.content}</p>
//                   <p className="mt-1 text-xs opacity-70">
//                     {message.timestamp.toLocaleTimeString([], {
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
//             />
//             <Button onClick={handleSendMessage}>Send</Button>
//           </div>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// export type Order = {
//   id: number;
//   totalAmount: string;
//   status: string;
//   paymentMethod: string;
//   isPaid: boolean;
//   paidAt: Date | null;
// };

// export const columns: ColumnDef<Order>[] = [
//   // ... existing columns code
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

//   const userRedux = useSelector(
//     (state: RootState) => state.userLogin.user?.user_info.user
//   );
//   const userId = userRedux?.id;

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
//     <div className="p-4 w-full md:p-6 lg:p-8">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
//         <div className="flex gap-2 items-center">
//           <Button
//             variant="outline"
//             className="flex gap-2 items-center"
//             onClick={() => setIsChatOpen(true)}
//           >
//             <MessageCircle className="w-4 h-4" />
//             <span>Support Chat</span>
//           </Button>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 w-4 h-4" />
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

//       <div className="mt-4 rounded-md border">
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
//         <div className="flex gap-2 items-center">
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

//       {/* Chat Popup */}
//       <ChatPopup isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

//       {/* Floating Chat Button (visible when chat is closed) */}
//       {!isChatOpen && (
//         <Button
//           className="flex fixed right-4 bottom-4 justify-center items-center w-12 h-12 rounded-full shadow-lg"
//           onClick={() => setIsChatOpen(true)}
//         >
//           <MessageCircle className="w-6 h-6" />
//         </Button>
//       )}
//     </div>
//   );
// }

// export default DataTableDemo;
