
import React, { useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

// Interface for customer data type
interface Customer {
  id: string;
  orderID: string;
  name: string;
  createdAt: string;
  mobile: string;
  email: string;
  country: string;
  identityType: string;
  identityFront?: string;
  identityBack?: string;
  status: "pending" | "approved" | "rejected";
}

// Customer details component
const CustomerDetails = ({ 
  customer, 
  onClose, 
  onApprove, 
  onReject 
}: { 
  customer: Customer, 
  onClose: () => void,
  onApprove: () => void,
  onReject: () => void
}) => {
  return (
    <div className="w-full py-6 bg-background/80 rounded-md mb-4 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6">
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Customer Name</div>
            <div className="font-medium">{customer.name}</div>
          </div>
          
          <div>
            <div className="text-sm font-medium text-muted-foreground">Created At</div>
            <div className="font-medium">{customer.createdAt}</div>
          </div>
        </div>
        
        <div className="border-l pl-4 space-y-3">
          <div>
            <div className="text-sm font-medium text-muted-foreground">Proof of Identification</div>
            <div className="font-medium">{customer.identityType}</div>
          </div>
          
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              FRONT COPY
            </Button>
            <Button variant="outline" size="sm">
              BACK COPY
            </Button>
          </div>
          
          <div className="flex space-x-4">
            {customer.status === "pending" && (
              <>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={onApprove}
                >
                  ACCEPT POI
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={onReject}
                >
                  REJECT POI
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  DELETE
                </Button>
              </>
            )}

            {customer.status === "approved" && (
              <>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  disabled
                >
                  Approved
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  DELETE
                </Button>
              </>
            )}

            {customer.status === "rejected" && (
              <>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled
                >
                  Rejected
                </Button>
                <Button 
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  DELETE
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Customer row component
const CustomerRow = ({ 
  customer, 
  index, 
  isExpanded, 
  onToggle,
  onApprove,
  onReject
}: { 
  customer: Customer, 
  index: number, 
  isExpanded: boolean, 
  onToggle: () => void,
  onApprove: () => void,
  onReject: () => void
}) => {
  return (
    <>
      <tr className="border-b border-border hover:bg-muted/40">
        <td className="py-4 px-6 text-sm text-foreground">{index + 1}</td>
        <td className="py-4 px-6 text-sm text-foreground">{customer.orderID}</td>
        <td className="py-4 px-6 text-sm text-foreground">{customer.name}</td>
        <td className="py-4 px-6 text-sm text-foreground">{customer.mobile}</td>
        <td className="py-4 px-6 text-sm text-foreground">{customer.email}</td>
        <td className="py-4 px-6 text-sm text-foreground">{customer.country}</td>
        <td className="py-4 px-6 text-center">
          <button 
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronDown size={20} />
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={7} className="px-4">
            <CustomerDetails 
              customer={customer} 
              onClose={onToggle} 
              onApprove={onApprove}
              onReject={onReject}
            />
          </td>
        </tr>
      )}
    </>
  );
};

const AdminCustomer = () => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "1",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "pending",
    },
    {
      id: "2",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "approved",
    },
    {
      id: "3",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "rejected",
    },
    {
      id: "4",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "pending",
    },
    {
      id: "5",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "pending",
    },
    {
      id: "6",
      orderID: "SSL2125",
      name: "Kierra Siphron",
      createdAt: "Aug 22, 2023 12:33 PM",
      mobile: "9876543210",
      email: "kierra@gmail.com",
      country: "India",
      identityType: "National Identity Card",
      identityFront: "/placeholder.svg",
      identityBack: "/placeholder.svg",
      status: "pending",
    },
  ]);

  const totalRows = customers.length;
  const totalPages = Math.ceil(totalRows / parseInt(rowsPerPage));
  const startIndex = (currentPage - 1) * parseInt(rowsPerPage);
  const endIndex = Math.min(startIndex + parseInt(rowsPerPage), totalRows);

  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = (criteria: string) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortDirection("asc");
    }
    setShowSortDropdown(false);
  };

  const handleApprove = (id: string) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === id ? { ...customer, status: "approved" as const } : customer
      )
    );
    toast.success("Customer POI approved successfully");
    setExpandedRow(null);
  };

  const handleReject = (id: string) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === id ? { ...customer, status: "rejected" as const } : customer
      )
    );
    toast.error("Customer POI rejected");
    setExpandedRow(null);
  };

  return (
    <AdminLayout>
      <div className="bg-card rounded-lg shadow dark:shadow-purple-900/10">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">All Users</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            
            <div className="relative">
              <Button
                variant="default"
                className="bg-primary text-white px-6"
                onClick={() => setShowSortDropdown(!showSortDropdown)}
              >
                SORT BY <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
              {showSortDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border">
                  <div className="py-1">
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      onClick={() => handleSort("name")}
                    >
                      Customer Name
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
                      onClick={() => handleSort("country")}
                    >
                      Country
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.No</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.slice(startIndex, endIndex).map((customer, index) => (
                <CustomerRow 
                  key={customer.id}
                  customer={customer}
                  index={startIndex + index}
                  isExpanded={expandedRow === customer.id}
                  onToggle={() => toggleRow(customer.id)}
                  onApprove={() => handleApprove(customer.id)}
                  onReject={() => handleReject(customer.id)}
                />
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex justify-between items-center px-6 py-4 bg-card border-t border-border">
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground mr-2">Rows per page:</span>
            <Select
              value={rowsPerPage}
              onValueChange={(value) => setRowsPerPage(value)}
            >
              <SelectTrigger className="w-20 h-8">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1}-{endIndex} of {totalRows}
            </span>
            <div className="flex ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={cn("mr-2 text-foreground", currentPage === 1 && "opacity-50 cursor-not-allowed")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={cn("text-foreground", currentPage === totalPages && "opacity-50 cursor-not-allowed")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCustomer;
