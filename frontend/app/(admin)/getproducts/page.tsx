/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
  Plus,
  Trash2,
  Search,
  Filter,
  Package,
  ShoppingCart,
  DollarSign,
  Eye,
  Edit3,
  Copy,
  AlertTriangle,
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
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState<Product | null>(
    null
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: "",
    categoryId: 1,
  });

  const handleCreateProduct = async () => {
    try {
      setIsLoading(true);
      const token = getToken();

      // Validate required fields
      if (!newProduct.name.trim()) {
        toast.error("Product name is required!");
        return;
      }
      if (!newProduct.description.trim()) {
        toast.error("Product description is required!");
        return;
      }
      if (newProduct.price <= 0) {
        toast.error("Product price must be greater than 0!");
        return;
      }
      if (newProduct.stock < 0) {
        toast.error("Stock cannot be negative!");
        return;
      }
      if (!newProduct.image.trim()) {
        toast.error("Product image URL is required!");
        return;
      }

      await axios.post("http://localhost:5000/product/create", newProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success toast
      toast.success(`🎉 Product "${newProduct.name}" created successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsCreateDialogOpen(false);
      fetchProducts();
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        image: "",
        categoryId: 1,
      });
    } catch (error: any) {
      console.error("Error creating product:", error);

      // Error toast with specific error message
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create product. Please try again.";
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);
      const token = getToken();
      await axios.delete(
        `http://localhost:5000/product/${productToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Success toast for deletion
      toast.success(
        `🗑️ Product "${productToDelete.name}" deleted successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      fetchProducts();
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      console.error("Error deleting product:", error);

      // Error toast for deletion
      const errorMessage =
        error.response?.data?.message ||
        "Failed to delete product. Please try again.";
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const openDeleteDialog = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const token = getToken();
      const { data } = await axios.get(`http://localhost:5000/product`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });
      setProducts(data);
    } catch (error: any) {
      console.error("Error fetching products:", error);

      // Error toast for fetching
      toast.error("Failed to load products. Please refresh the page.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard handler with toast
  const handleCopyToClipboard = async (productId: number) => {
    try {
      await navigator.clipboard.writeText(productId.toString());
      toast.success(`📋 Product ID #${productId} copied to clipboard!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("Failed to copy to clipboard", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, [currentPage, pageSize]);

  // Statistics calculation
  const totalProducts = products.length;
  const totalValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0
  );
  const lowStockProducts = products.filter(
    (product) => product.stock < 10
  ).length;

  const columns: ColumnDef<Product>[] = [
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
          className="border-slate-300"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-slate-300"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 hover:bg-slate-100"
        >
          ID
          <ArrowUpDown className="w-3 h-3 ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="px-2 py-1 font-mono text-xs rounded-md text-slate-600 bg-slate-100">
          #{row.getValue("id")}
        </div>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image = row.getValue("image") as string;
        const name = row.getValue("name") as string;
        return (
          <div className="relative w-12 h-12 cursor-pointer group">
            <div className="w-12 h-12 overflow-hidden transition-colors border-2 rounded-lg border-slate-200 group-hover:border-blue-300">
              <Image
                src={image}
                alt={name}
                width={48}
                height={48}
                className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 rounded-lg opacity-0 bg-black/50 group-hover:opacity-100">
              <Eye className="w-4 h-4 text-white" />
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 hover:bg-slate-100"
        >
          Product Name
          <ArrowUpDown className="w-3 h-3 ml-2" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="space-y-1">
          <div className="font-medium capitalize text-slate-900">
            {row.getValue("name")}
          </div>
          <div className="text-xs text-slate-500 line-clamp-1">
            {row.original.description}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category;
        return (
          <Badge
            variant="secondary"
            className="text-purple-700 bg-purple-100 hover:bg-purple-200"
          >
            {category?.name}
          </Badge>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 hover:bg-slate-100"
        >
          <DollarSign className="w-3 h-3 mr-1" />
          Price
          <ArrowUpDown className="w-3 h-3 ml-2" />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return (
          <div className="px-2 py-1 text-sm font-semibold text-green-600 rounded-md bg-green-50">
            {formatted}
          </div>
        );
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 px-2 lg:px-3 hover:bg-slate-100"
        >
          <Package className="w-3 h-3 mr-1" />
          Stock
          <ArrowUpDown className="w-3 h-3 ml-2" />
        </Button>
      ),
      cell: ({ row }) => {
        const stock = row.getValue("stock") as number;
        return (
          <div className="flex items-center space-x-2">
            <Badge
              variant={
                stock < 10 ? "destructive" : stock < 20 ? "outline" : "default"
              }
              className={
                stock < 10
                  ? "bg-red-100 text-red-700 border-red-200"
                  : stock < 20
                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                  : "bg-green-100 text-green-700 border-green-200"
              }
            >
              {stock} units
            </Badge>
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-8 h-8 p-0 rounded-full hover:bg-slate-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel className="font-semibold text-slate-700">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleCopyToClipboard(product.id)}
                className="cursor-pointer"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Eye className="w-4 h-4 mr-2" />
                View details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit product
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                onClick={() => openDeleteDialog(product)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: "includesString",
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          fontSize: "14px",
          borderRadius: "8px",
        }}
      />

      <div className="p-6 mx-auto space-y-8 max-w-7xl lg:p-8">
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-transparent bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text">
                Products Management
              </h1>
              <p className="text-slate-600">
                Manage your inventory and track product performance
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="text-white transition-all duration-200 shadow-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-slate-800">
                      Create New Product
                    </DialogTitle>
                    <DialogDescription className="text-slate-600">
                      Add a new product to your inventory. Fill in all the
                      required details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-sm font-medium text-slate-700"
                      >
                        Product Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium text-slate-700"
                      >
                        Description *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Enter product description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label
                          htmlFor="price"
                          className="text-sm font-medium text-slate-700"
                        >
                          Price ($) *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          value={newProduct.price || ""}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="stock"
                          className="text-sm font-medium text-slate-700"
                        >
                          Stock *
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          min="0"
                          placeholder="0"
                          value={newProduct.stock || ""}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: parseInt(e.target.value) || 0,
                            })
                          }
                          className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="image"
                        className="text-sm font-medium text-slate-700"
                      >
                        Image URL *
                      </Label>
                      <Input
                        id="image"
                        placeholder="https://example.com/image.jpg"
                        value={newProduct.image}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image: e.target.value,
                          })
                        }
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="category"
                        className="text-sm font-medium text-slate-700"
                      >
                        Category ID
                      </Label>
                      <Input
                        id="category"
                        type="number"
                        min="1"
                        placeholder="1"
                        value={newProduct.categoryId || ""}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            categoryId: parseInt(e.target.value) || 1,
                          })
                        }
                        className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button
                      onClick={handleCreateProduct}
                      disabled={isLoading}
                      className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                          <span>Creating...</span>
                        </div>
                      ) : (
                        "Create Product"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500 rounded-full">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Products
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {totalProducts}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-500 rounded-full">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Total Value
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      ${totalValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-500 rounded-full">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-600">
                      Low Stock
                    </p>
                    <p className="text-3xl font-bold text-orange-900">
                      {lowStockProducts}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters and Controls */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-slate-400" />
                  <Input
                    placeholder="Search products..."
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(String(e.target.value))}
                    className="pl-10 w-80 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-slate-300 hover:bg-slate-50"
                    >
                      <Filter className="w-4 h-4 mr-2" />
                      Columns
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
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
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-slate-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-slate-200">
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="font-semibold text-slate-700"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 border-2 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                        <span className="text-slate-600">
                          Loading products...
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="transition-colors border-slate-200 hover:bg-slate-50/50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4">
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
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center space-y-3">
                        <Package className="w-12 h-12 text-slate-400" />
                        <div className="space-y-1">
                          <p className="font-medium text-slate-600">
                            No products found
                          </p>
                          <p className="text-sm text-slate-500">
                            Get started by adding your first product
                          </p>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>

        {/* Pagination */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <div className="text-sm text-slate-600">
                <span className="font-medium text-slate-900">
                  {table.getFilteredSelectedRowModel().rows.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-slate-900">
                  {table.getFilteredRowModel().rows.length}
                </span>{" "}
                product(s) selected
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1 || isLoading}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Previous
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Page</span>
                  <div className="px-3 py-1 text-sm font-medium rounded-md bg-slate-100 text-slate-900">
                    {currentPage}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={products.length < pageSize || isLoading}
                  className="border-slate-300 hover:bg-slate-50"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delete Confirmation AlertDialog */}
        <AlertDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
        >
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="space-y-1">
                  <AlertDialogTitle className="text-lg font-semibold text-slate-900">
                    Delete Product
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-slate-600">
                    This action cannot be undone.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>

            {productToDelete && (
              <div className="py-4">
                <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-12 h-12 overflow-hidden border-2 rounded-lg border-slate-200">
                      <Image
                        src={productToDelete.image}
                        alt={productToDelete.name}
                        width={48}
                        height={48}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-slate-900">
                        {productToDelete.name}
                      </p>
                      <p className="text-sm truncate text-slate-500">
                        ID: #{productToDelete.id}
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge className="text-xs text-green-700 bg-green-100">
                          ${productToDelete.price}
                        </Badge>
                        <Badge className="text-xs text-blue-700 bg-blue-100">
                          {productToDelete.stock} units
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">
                  Are you sure you want to permanently delete "
                  <span className="font-medium">{productToDelete.name}</span>"?
                  This will remove the product from your inventory and cannot be
                  recovered.
                </p>
              </div>
            )}

            <AlertDialogFooter className="space-x-2">
              <AlertDialogCancel
                className="border-slate-300 hover:bg-slate-50"
                disabled={isDeleting}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteProduct}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
              >
                {isDeleting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Product</span>
                  </div>
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default DataTableDemo;
