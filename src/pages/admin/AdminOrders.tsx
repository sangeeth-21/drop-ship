
import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Sample data
const orderData = [
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  },
  {
    id: "2125",
    serialNo: "1",
    shipmentNo: "1",
    reqDate: "26.09.2023",
    customerName: "Kierra Siphron",
    mobile: "9876543210",
    email: "kierra@gmail.com",
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Kierra Siphron",
      weight: "980",
      paymentMode: "Online"
    }
  }
];

// Order details component
const OrderDetails = ({ details, onClose }: { details: any, onClose: () => void }) => {
  return (
    <div className="w-full py-6 bg-background/80 rounded-md mb-4 border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-6">
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Customer Name</h3>
            <p className="text-foreground">{details.customerName}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Receiver Name</h3>
            <p className="text-foreground">{details.receiverName}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Zip Code</h3>
            <p className="text-foreground">{details.zipCode}</p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p className="text-foreground">{details.phone}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Country</h3>
            <p className="text-foreground">{details.country}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Courier</h3>
            <p className="text-foreground">{details.courier}</p>
          </div>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="text-foreground">{details.email}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Receiver email</h3>
            <p className="text-foreground">{details.receiverEmail}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border mt-2 pt-6 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Package Method</h3>
            <p className="text-foreground">{details.packageMethod}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Weight</h3>
            <p className="text-foreground">{details.weight}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Payment Mode</h3>
            <p className="text-foreground">{details.paymentMode}</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6 px-6">
        <Button variant="secondary" className="bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 dark:text-purple-300">PREVIEW</Button>
        <Button className="bg-primary hover:bg-primary/90">RECEIVED</Button>
      </div>
    </div>
  );
};

// Order row component
const OrderRow = ({ order, isExpanded, onToggle }: { order: any, isExpanded: boolean, onToggle: () => void }) => {
  return (
    <>
      <tr className="border-b border-border hover:bg-muted/40">
        <td className="py-4 px-6 text-sm text-foreground">{order.serialNo}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.id}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.shipmentNo}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.reqDate}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.customerName}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.mobile}</td>
        <td className="py-4 px-6 text-sm text-foreground">{order.email}</td>
        <td className="py-4 px-6 text-center">
          <button 
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronDown size={20} />}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={8} className="px-4">
            <OrderDetails details={order.details} onClose={onToggle} />
          </td>
        </tr>
      )}
    </>
  );
};

const AdminOrders = () => {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalOrders = orderData.length;
  const totalPages = Math.ceil(totalOrders / parseInt(rowsPerPage));
  
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
    } else {
      setExpandedOrderId(orderId);
    }
  };
  
  return (
    <AdminLayout>
      <div className="bg-card rounded-lg shadow dark:shadow-purple-900/10">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">Order</h1>
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search by Order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">S.No</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Order ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Shipment No</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Req Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Mobile</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <OrderRow 
                  key={`${order.id}-${index}`}
                  order={order}
                  isExpanded={expandedOrderId === `${order.id}-${index}`}
                  onToggle={() => toggleOrderDetails(`${order.id}-${index}`)}
                />
              ))}
            </tbody>
          </table>
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
              1-{Math.min(parseInt(rowsPerPage), totalOrders)} of {totalOrders}
            </span>
            <div className="flex ml-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="mr-2 text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="text-foreground"
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

export default AdminOrders;
