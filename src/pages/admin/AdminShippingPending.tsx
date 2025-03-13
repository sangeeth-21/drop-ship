
import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import AdminLayout from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Define a type for our shipment data to improve type safety
type ShipmentDetails = {
  customerName: string;
  phone: string;
  email: string;
  receiverName: string;
  receiverEmail: string;
  country: string;
  zipCode: string;
  courier: string;
  packageMethod: string;
  weight: string;
  paymentMode: string;
  notes: string;
};

type Shipment = {
  id: string;
  serialNo: string;
  trackingNumber: string;
  requestDate: string;
  customerName: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
  priceDetailsAdded: boolean;
  invoiceGenerated: boolean;
  paymentRequested?: boolean;
  paymentReceived?: boolean;
  readyToShip?: boolean;
  dispatched?: boolean;
  paymentProof?: string;
  details: ShipmentDetails;
};

// Sample data for pending shipments
const pendingShipmentData: Shipment[] = [
  {
    id: "SP-2125",
    serialNo: "1",
    trackingNumber: "TRK-9876-A",
    requestDate: "26.09.2023",
    customerName: "Kierra Siphron",
    destination: "Canada",
    status: "Received",
    estimatedDelivery: "30.09.2023",
    priceDetailsAdded: false,
    invoiceGenerated: false,
    details: {
      customerName: "Kierra Siphron",
      phone: "9876543210",
      email: "kierra@gmail.com",
      receiverName: "Abram Dorwart",
      receiverEmail: "abramdorwart@gmail.com",
      country: "Canada",
      zipCode: "J7K 1P9",
      courier: "Singapore Smart",
      packageMethod: "Express",
      weight: "980g",
      paymentMode: "Online",
      notes: "Handle with care"
    }
  },
  {
    id: "SP-2126",
    serialNo: "2",
    trackingNumber: "TRK-9877-B",
    requestDate: "26.09.2023",
    customerName: "Maya Johnson",
    destination: "USA",
    status: "Accepted",
    priceDetailsAdded: false,
    invoiceGenerated: false,
    estimatedDelivery: "01.10.2023",
    details: {
      customerName: "Maya Johnson",
      phone: "9876543211",
      email: "maya@gmail.com",
      receiverName: "Tom Bradley",
      receiverEmail: "tomb@gmail.com",
      country: "USA",
      zipCode: "90210",
      courier: "FastExpress",
      packageMethod: "Standard",
      weight: "1200g",
      paymentMode: "Online",
      notes: "Leave at front door"
    }
  },
  {
    id: "SP-2127",
    serialNo: "3",
    trackingNumber: "TRK-9878-C",
    requestDate: "27.09.2023",
    customerName: "Luis Ramos",
    destination: "Mexico",
    status: "Received",
    estimatedDelivery: "03.10.2023",
    priceDetailsAdded: false,
    invoiceGenerated: false,
    details: {
      customerName: "Luis Ramos",
      phone: "9876543212",
      email: "luis@gmail.com",
      receiverName: "Elena Martinez",
      receiverEmail: "elena@gmail.com",
      country: "Mexico",
      zipCode: "03100",
      courier: "MexicoExpress",
      packageMethod: "Priority",
      weight: "750g",
      paymentMode: "COD",
      notes: "Call before delivery"
    }
  },
  {
    id: "SP-2128",
    serialNo: "4",
    trackingNumber: "TRK-9879-D",
    requestDate: "27.09.2023",
    customerName: "Sophia Chen",
    destination: "China",
    status: "Received",
    estimatedDelivery: "05.10.2023",
    priceDetailsAdded: false,
    invoiceGenerated: false,
    details: {
      customerName: "Sophia Chen",
      phone: "9876543213",
      email: "sophia@gmail.com",
      receiverName: "Li Wei",
      receiverEmail: "liwei@gmail.com",
      country: "China",
      zipCode: "100000",
      courier: "ChinaSpeed",
      packageMethod: "Express",
      weight: "1500g",
      paymentMode: "Online",
      notes: "Fragile items"
    }
  },
  {
    id: "SP-2129",
    serialNo: "5",
    trackingNumber: "TRK-9880-E",
    requestDate: "28.09.2023",
    customerName: "Ahmed Hassan",
    destination: "UAE",
    status: "Accepted",
    estimatedDelivery: "02.10.2023",
    priceDetailsAdded: false,
    invoiceGenerated: false,
    details: {
      customerName: "Ahmed Hassan",
      phone: "9876543214",
      email: "ahmed@gmail.com",
      receiverName: "Fatima Ali",
      receiverEmail: "fatima@gmail.com",
      country: "UAE",
      zipCode: "00000",
      courier: "EmiratesExpress",
      packageMethod: "Premium",
      weight: "2200g",
      paymentMode: "Online",
      notes: "Business delivery"
    }
  }
];

// Price Details Dialog Component
const PriceDetailsDialog = ({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Price Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Actual Weight</label>
            <Input placeholder="Actual Weight" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Other Charges</label>
            <Input placeholder="Other Charges" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Quantity</label>
            <Input placeholder="Quantity" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Packing Charges</label>
            <Input placeholder="Packaging charge" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Courier Service</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Courier Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="express">Express</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Arrears Amount</label>
            <Input placeholder="Arrears amount" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Tracking ID</label>
            <Input placeholder="Tracking id" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Tax</label>
            <Input placeholder="Tax" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Shipment total</label>
            <Input placeholder="Shipment total" readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Discount</label>
            <Input placeholder="Discount" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Grand total</label>
            <Input placeholder="Grand total" readOnly />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Advance Paid</label>
            <Input placeholder="Advance Paid" />
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>CLOSE</Button>
          <Button className="bg-purple-700 hover:bg-purple-800" onClick={onSave}>SAVE</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Invoice Dialog Component
const InvoiceDialog = ({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Generate Invoice</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Shipments of same order CMB2140</h3>
            <div className="space-y-2">
              <div className="bg-green-500 text-white p-3 rounded-md">
                Shipment 1 - Price Ready
              </div>
              <div className="bg-green-500 text-white p-3 rounded-md">
                Shipment 2 - Price Ready
              </div>
              <div className="bg-red-500 text-white p-3 rounded-md">
                Shipment 3 - Price Not Ready
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Shipments in red color will be canceled, if invoice is generated and confirmed without processing them
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">GENERATE INVOICE</h3>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an invoice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice1">Invoice Type 1</SelectItem>
                <SelectItem value="invoice2">Invoice Type 2</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full bg-purple-700 hover:bg-purple-800" onClick={onConfirm}>
              Confirm Invoice
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onClose}>CLOSE</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Payment Dialog Component
const PaymentDialog = ({ open, onClose, onSave }: { open: boolean; onClose: () => void; onSave: () => void }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Payment Details</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Payment Information</label>
            <Input placeholder="Payment Info" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Remarks</label>
            <Input placeholder="Remarks" />
          </div>
          
          <div className="space-y-1">
            <label className="text-sm text-gray-500">Approved By</label>
            <Input placeholder="Remarks" />
          </div>
        </div>
        
        <DialogFooter className="flex justify-between mt-2">
          <Button variant="outline" onClick={onClose}>CLOSE</Button>
          <Button className="bg-purple-700 hover:bg-purple-800" onClick={onSave}>
            SAVE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Action buttons based on status
const StatusActions = ({ 
  status, 
  priceDetailsAdded,
  invoiceGenerated,
  paymentRequested,
  paymentReceived,
  readyToShip,
  onAccept, 
  onPriceDetails,
  onInvoice,
  onRequestPay,
  onPaid,
  onReady,
  onDispatched
}: { 
  status: string;
  priceDetailsAdded: boolean;
  invoiceGenerated: boolean;
  paymentRequested?: boolean;
  paymentReceived?: boolean;
  readyToShip?: boolean;
  onAccept: () => void; 
  onPriceDetails: () => void;
  onInvoice: () => void;
  onRequestPay: () => void;
  onPaid: () => void;
  onReady: () => void;
  onDispatched: () => void;
}) => {
  if (status === "Received") {
    return (
      <div className="flex space-x-2">
        <Button 
          onClick={onAccept} 
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold"
        >
          ACCEPT
        </Button>
        <Button variant="outline" className="text-purple-800 dark:text-purple-300">
          PREVIEW
        </Button>
        <Button variant="outline" className="text-red-600">
          CANCEL
        </Button>
        <Button variant="outline" className="text-red-600">
          RESET
        </Button>
      </div>
    );
  } else if (status === "Accepted") {
    if (priceDetailsAdded && !invoiceGenerated) {
      return (
        <div className="flex space-x-2">
          <Button 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
            onClick={onPriceDetails}
          >
            PRICE DETAILS
          </Button>
          <Button 
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold"
            onClick={onInvoice}
          >
            Invoice
          </Button>
          <Button variant="outline" className="text-purple-800 dark:text-purple-300">
            PREVIEW
          </Button>
          <Button variant="outline" className="text-red-600">
            CANCEL
          </Button>
          <Button variant="outline" className="text-red-600">
            RESET
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-2">
          <Button 
            onClick={onPriceDetails} 
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            PRICE DETAILS
          </Button>
          <Button variant="outline" className="text-purple-800 dark:text-purple-300">
            PREVIEW
          </Button>
          <Button variant="outline" className="text-red-600">
            CANCEL
          </Button>
          <Button variant="outline" className="text-red-600">
            RESET
          </Button>
        </div>
      );
    }
  } else if (status === "Invoice Generated") {
    if (paymentRequested && !paymentReceived) {
      return (
        <div className="flex space-x-2">
          <Button 
            className="bg-green-500 hover:bg-green-600 text-white font-semibold"
            onClick={onPaid}
          >
            PAID
          </Button>
          <Button variant="outline" className="text-purple-800 dark:text-purple-300">
            PREVIEW
          </Button>
          <Button variant="outline" className="text-red-600">
            CANCEL
          </Button>
          <Button variant="outline" className="text-red-600">
            RESET
          </Button>
        </div>
      );
    } else {
      return (
        <div className="flex space-x-2">
          <Button 
            className="bg-purple-700 hover:bg-purple-800 text-white font-semibold"
            onClick={onRequestPay}
          >
            REQUEST PAY
          </Button>
          <Button variant="outline" className="text-purple-800 dark:text-purple-300">
            PREVIEW
          </Button>
          <Button variant="outline" className="text-red-600">
            CANCEL
          </Button>
          <Button variant="outline" className="text-red-600">
            RESET
          </Button>
        </div>
      );
    }
  } else if (status === "Payment Received") {
    return (
      <div className="flex space-x-2">
        <Button 
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          onClick={onReady}
        >
          READY
        </Button>
        <Button variant="outline" className="text-purple-800 dark:text-purple-300">
          PREVIEW
        </Button>
        <Button variant="outline" className="text-red-600">
          CANCEL
        </Button>
        <Button variant="outline" className="text-red-600">
          RESET
        </Button>
      </div>
    );
  } else if (status === "Ready to Ship") {
    return (
      <div className="flex space-x-2">
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white font-semibold"
          onClick={onDispatched}
        >
          DISPATCHED
        </Button>
        <Button variant="outline" className="text-purple-800 dark:text-purple-300">
          PREVIEW
        </Button>
        <Button variant="outline" className="text-red-600">
          CANCEL
        </Button>
        <Button variant="outline" className="text-red-600">
          RESET
        </Button>
      </div>
    );
  } else if (status === "Dispatched") {
    return (
      <div className="flex space-x-2">
        <Button variant="outline" className="text-purple-800 dark:text-purple-300">
          PREVIEW
        </Button>
        <Button variant="outline" className="text-red-600">
          CANCEL
        </Button>
        <Button variant="outline" className="text-red-600">
          RESET
        </Button>
      </div>
    );
  }
  
  return null;
};

// Shipping details component
const ShippingDetails = ({ 
  details, 
  status,
  priceDetailsAdded,
  invoiceGenerated,
  paymentRequested,
  paymentReceived,
  readyToShip,
  paymentProof,
  onClose, 
  onStatusChange, 
  onOpenPriceDetails,
  onOpenInvoice,
  onRequestPay,
  onPaid,
  onReady,
  onDispatched
}: { 
  details: ShipmentDetails; 
  status: string;
  priceDetailsAdded: boolean;
  invoiceGenerated: boolean;
  paymentRequested?: boolean;
  paymentReceived?: boolean;
  readyToShip?: boolean;
  paymentProof?: string;
  onClose: () => void; 
  onStatusChange: () => void;
  onOpenPriceDetails: () => void;
  onOpenInvoice: () => void;
  onRequestPay: () => void;
  onPaid: () => void;
  onReady: () => void;
  onDispatched: () => void;
}) => {
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
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
            <p className="text-foreground">{details.notes || "N/A"}</p>
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
      
      <div className="flex justify-between items-center mt-6 px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <span className={cn(
            "px-4 py-2 rounded-full text-sm font-medium",
            status === "Received" && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
            status === "Accepted" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
            status === "Invoice Generated" && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
            status === "Payment Received" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
            status === "Ready to Ship" && "bg-purple-600 text-white",
            status === "Dispatched" && "bg-green-600 text-white",
            priceDetailsAdded && status === "Accepted" && "bg-yellow-500 text-white",
            paymentRequested && status === "Invoice Generated" && "bg-purple-600 text-white",
          )}>
            {status === "Received" && "Received"}
            {status === "Accepted" && !priceDetailsAdded && "Accepted"}
            {status === "Accepted" && priceDetailsAdded && "Price Details Added"}
            {status === "Invoice Generated" && !paymentRequested && "Invoice Generated"}
            {status === "Invoice Generated" && paymentRequested && "Payment Requested"}
            {status === "Payment Received" && "Payment Received"}
            {status === "Ready to Ship" && "Ready to Ship"}
            {status === "Dispatched" && "Dispatched"}
          </span>
          
          {(paymentReceived || readyToShip) && (
            <div className="mt-2 md:mt-0">
              <p className="text-sm text-muted-foreground">User have sent proof for bank transfer</p>
              <a href="#" className="text-sm text-blue-500 hover:underline">Click here to view</a>
              <p className="text-sm font-medium mt-1">Status: ACCEPTED</p>
            </div>
          )}
        </div>
        
        <StatusActions 
          status={status}
          priceDetailsAdded={priceDetailsAdded}
          invoiceGenerated={invoiceGenerated}
          paymentRequested={paymentRequested}
          paymentReceived={paymentReceived}
          readyToShip={readyToShip}
          onAccept={onStatusChange} 
          onPriceDetails={onOpenPriceDetails}
          onInvoice={onOpenInvoice}
          onRequestPay={onRequestPay}
          onPaid={onPaid}
          onReady={onReady}
          onDispatched={onDispatched}
        />
      </div>
    </div>
  );
};

// Shipping row component
const ShippingRow = ({ 
  shipment, 
  isExpanded, 
  onToggle,
  onStatusChange,
  onPriceDetailsAdded,
  onInvoiceGenerated,
  onRequestPay,
  onPaid,
  onReady,
  onDispatched
}: { 
  shipment: Shipment; 
  isExpanded: boolean; 
  onToggle: () => void;
  onStatusChange: (id: string) => void;
  onPriceDetailsAdded: (id: string) => void;
  onInvoiceGenerated: (id: string) => void;
  onRequestPay: (id: string) => void;
  onPaid: (id: string) => void;
  onReady: (id: string) => void;
  onDispatched: (id: string) => void;
}) => {
  // Get display status for the table row
  const getDisplayStatus = () => {
    if (shipment.status === "Accepted" && shipment.priceDetailsAdded) {
      return "Price Details Added";
    } else if (shipment.status === "Invoice Generated" && shipment.paymentRequested) {
      return "Payment Requested";
    } else {
      return shipment.status;
    }
  };

  // Get status color class for the row
  const getStatusColorClass = () => {
    if (shipment.status === "Received") {
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    } else if (shipment.status === "Accepted" && !shipment.priceDetailsAdded) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    } else if (shipment.status === "Accepted" && shipment.priceDetailsAdded) {
      return "bg-yellow-500 text-white";
    } else if (shipment.status === "Invoice Generated" && !shipment.paymentRequested) {
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    } else if (shipment.status === "Invoice Generated" && shipment.paymentRequested) {
      return "bg-purple-600 text-white";
    } else if (shipment.status === "Payment Received") {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    } else if (shipment.status === "Ready to Ship") {
      return "bg-purple-600 text-white";
    } else if (shipment.status === "Dispatched") {
      return "bg-green-600 text-white";
    }
    return "";
  };
  
  return (
    <>
      <TableRow className="border-b border-border hover:bg-muted/40">
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.serialNo}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.id}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.trackingNumber}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.requestDate}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.customerName}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">{shipment.destination}</TableCell>
        <TableCell className="py-4 px-6 text-sm text-foreground">
          <span className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            getStatusColorClass()
          )}>
            {getDisplayStatus()}
          </span>
        </TableCell>
        <TableCell className="py-4 px-6 text-center">
          <button 
            onClick={onToggle}
            className="text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? <ChevronDown size={20} /> : <ChevronDown size={20} />}
          </button>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={8} className="px-4 py-0 border-0">
            <ShippingDetails 
              details={shipment.details} 
              status={shipment.status}
              priceDetailsAdded={shipment.priceDetailsAdded}
              invoiceGenerated={shipment.invoiceGenerated}
              paymentRequested={shipment.paymentRequested}
              paymentReceived={shipment.paymentReceived}
              readyToShip={shipment.readyToShip}
              paymentProof={shipment.paymentProof}
              onClose={onToggle} 
              onStatusChange={() => onStatusChange(shipment.id)}
              onOpenPriceDetails={() => onPriceDetailsAdded(shipment.id)}
              onOpenInvoice={() => onInvoiceGenerated(shipment.id)}
              onRequestPay={() => onRequestPay(shipment.id)}
              onPaid={() => onPaid(shipment.id)}
              onReady={() => onReady(shipment.id)}
              onDispatched={() => onDispatched(shipment.id)}
            />
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

const AdminShippingPending = () => {
  const [expandedShipmentId, setExpandedShipmentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPriceDetailsOpen, setIsPriceDetailsOpen] = useState(false);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [shipments, setShipments] = useState<Shipment[]>(pendingShipmentData);
  const [currentShipmentId, setCurrentShipmentId] = useState<string | null>(null);
  const { toast } = useToast();
  
  const totalShipments = shipments.length;
  const totalPages = Math.ceil(totalShipments / parseInt(rowsPerPage));
  
  const toggleShipmentDetails = (shipmentId: string) => {
    if (expandedShipmentId === shipmentId) {
      setExpandedShipmentId(null);
    } else {
      setExpandedShipmentId(shipmentId);
    }
  };
  
  const handleStatusChange = (id: string) => {
    setShipments(prevShipments => 
      prevShipments.map(shipment => 
        shipment.id === id ? { ...shipment, status: "Accepted" } : shipment
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Shipment ${id} status changed to Accepted`,
    });
  };
  
  const handleOpenPriceDetails = (id: string) => {
    setCurrentShipmentId(id);
    setIsPriceDetailsOpen(true);
  };
  
  const handleClosePriceDetails = () => {
    setIsPriceDetailsOpen(false);
    setCurrentShipmentId(null);
  };
  
  const handleSavePriceDetails = () => {
    if (currentShipmentId) {
      setShipments(prevShipments => 
        prevShipments.map(shipment => 
          shipment.id === currentShipmentId 
            ? { ...shipment, priceDetailsAdded: true } 
            : shipment
        )
      );
      
      setIsPriceDetailsOpen(false);
      setCurrentShipmentId(null);
      
      toast({
        title: "Price Details Saved",
        description: "Price details have been successfully saved",
      });
    }
  };
  
  const handleOpenInvoice = (id: string) => {
    setCurrentShipmentId(id);
    setIsInvoiceDialogOpen(true);
  };
  
  const handleCloseInvoice = () => {
    setIsInvoiceDialogOpen(false);
    setCurrentShipmentId(null);
  };
  
  const handleConfirmInvoice = () => {
    if (currentShipmentId) {
      setShipments(prevShipments => 
        prevShipments.map(shipment => 
          shipment.id === currentShipmentId 
            ? { 
                ...shipment, 
                status: "Invoice Generated", 
                invoiceGenerated: true 
              } 
            : shipment
        )
      );
      
      setIsInvoiceDialogOpen(false);
      setCurrentShipmentId(null);
      
      toast({
        title: "Invoice Generated",
        description: "Invoice has been successfully generated",
      });
    }
  };
  
  const handleRequestPay = (id: string) => {
    setShipments(prevShipments => 
      prevShipments.map(shipment => 
        shipment.id === id
          ? { ...shipment, paymentRequested: true }
          : shipment
      )
    );
    
    toast({
      title: "Payment Requested",
      description: `Payment request sent for shipment ${id}`,
    });
  };
  
  const handlePaid = (id: string) => {
    setCurrentShipmentId(id);
    setIsPaymentDialogOpen(true);
  };
  
  const handleClosePayment = () => {
    setIsPaymentDialogOpen(false);
    setCurrentShipmentId(null);
  };
  
  const handleSavePayment = () => {
    if (currentShipmentId) {
      setShipments(prevShipments => 
        prevShipments.map(shipment => 
          shipment.id === currentShipmentId 
            ? { 
                ...shipment, 
                status: "Payment Received", 
                paymentReceived: true,
                paymentProof: "payment.pdf"
              } 
            : shipment
        )
      );
      
      setIsPaymentDialogOpen(false);
      setCurrentShipmentId(null);
      
      toast({
        title: "Payment Verified",
        description: "Payment has been verified and recorded",
      });
    }
  };
  
  const handleReady = (id: string) => {
    setShipments(prevShipments => 
      prevShipments.map(shipment => 
        shipment.id === id
          ? { 
              ...shipment, 
              status: "Ready to Ship", 
              readyToShip: true 
            }
          : shipment
      )
    );
    
    toast({
      title: "Ready to Ship",
      description: `Shipment ${id} is now ready to ship`,
    });
  };
  
  const handleDispatched = (id: string) => {
    setShipments(prevShipments => 
      prevShipments.map(shipment => 
        shipment.id === id
          ? { 
              ...shipment, 
              status: "Dispatched", 
              dispatched: true 
            }
          : shipment
      )
    );
    
    toast({
      title: "Dispatched",
      description: `Shipment ${id} has been dispatched`,
    });
  };
  
  return (
    <AdminLayout>
      <div className="bg-card rounded-lg shadow dark:shadow-purple-900/10">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h1 className="text-2xl font-semibold text-foreground">Shipping Pending</h1>
          <div className="relative w-64">
            <Input
              type="text"
              placeholder="Search by ID or Tracking"
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
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">S.No</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Tracking No</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Request Date</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Customer</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Destination</TableHead>
                <TableHead className="py-3 px-6 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</TableHead>
                <TableHead className="py-3 px-6 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shipment, index) => (
                <ShippingRow 
                  key={`${shipment.id}-${index}`}
                  shipment={shipment}
                  isExpanded={expandedShipmentId === `${shipment.id}-${index}`}
                  onToggle={() => toggleShipmentDetails(`${shipment.id}-${index}`)}
                  onStatusChange={handleStatusChange}
                  onPriceDetailsAdded={handleOpenPriceDetails}
                  onInvoiceGenerated={handleOpenInvoice}
                  onRequestPay={handleRequestPay}
                  onPaid={handlePaid}
                  onReady={handleReady}
                  onDispatched={handleDispatched}
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
              1-{Math.min(parseInt(rowsPerPage), totalShipments)} of {totalShipments}
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
      
      {/* Price Details Dialog */}
      <PriceDetailsDialog 
        open={isPriceDetailsOpen} 
        onClose={handleClosePriceDetails}
        onSave={handleSavePriceDetails}
      />
      
      {/* Invoice Dialog */}
      <InvoiceDialog
        open={isInvoiceDialogOpen}
        onClose={handleCloseInvoice}
        onConfirm={handleConfirmInvoice}
      />
      
      {/* Payment Dialog */}
      <PaymentDialog
        open={isPaymentDialogOpen}
        onClose={handleClosePayment}
        onSave={handleSavePayment}
      />
    </AdminLayout>
  );
};

export default AdminShippingPending;
