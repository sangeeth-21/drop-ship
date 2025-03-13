
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Package,
  MapPin,
  CreditCard,
  FileText,
  Box,
  Clock,
  Pen,
  X,
  ShoppingCart,
  Truck,
  Phone,
  Building2,
  CircleDollarSign,
  Ruler,
  Weight,
} from "lucide-react";

// Define the order type
interface OrderDetails {
  id: string;
  itemCount: number;
  packingType: string;
  totalWeight: string;
  orderDate: string;
  orderTime: string;
  totalPrice: string;
  departureDate: string;
  departureTime: string;
  status: string;
  receiver: string;
  address: string;
  email?: string;
  phone?: string;
  company?: string;
  courier?: string;
  shippingNumber?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  itemDescription?: string;
  purpose?: string;
  value?: string;
  packagingDetails?: {
    method: string;
    weight: string;
    length: string;
    height: string;
  };
  paymentDetails?: {
    shippingCharge: string;
    tax: string;
    total: string;
  };
}

interface OrderDetailDialogProps {
  order: OrderDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderDetailDialog = ({ order, open, onOpenChange }: OrderDetailDialogProps) => {
  if (!order) return null;

  // Format address for display
  const addressLines = order.address.split('\n');
  
  // Default values for payment if not provided
  const paymentDetails = order.paymentDetails || {
    shippingCharge: "LKR 1000.00",
    tax: "LKR 200.00",
    total: "LKR 1200.00"
  };

  // Generate a status message based on the order status
  const getStatusMessage = (status: string) => {
    switch (status.toLowerCase()) {
      case "departured":
        return "Your order is in transit.";
      case "delivered":
        return "Your order has been delivered.";
      case "processing":
        return "Your order is being processed.";
      default:
        return "Your order will be received soon.";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <ShoppingCart className="h-6 w-6 text-primary" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        {/* Header with greeting and status */}
        <div className="bg-muted/30 rounded-lg p-4 mb-4">
          <h2 className="text-lg font-semibold">Hi {order.receiver.split(' ')[0]} !</h2>
          <p className="text-muted-foreground">{getStatusMessage(order.status)}</p>
        </div>

        {/* Order ID and Shipping Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-medium">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shipping No</p>
                <p className="font-medium">{order.shippingNumber || '01'}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 px-3 py-2 rounded-md">
              <p className="text-sm font-medium">Status</p>
            </div>
            <Badge className={`
              ${order.status.toLowerCase() === 'departured' ? 'bg-blue-500 hover:bg-blue-600' : ''}
              ${order.status.toLowerCase() === 'delivered' ? 'bg-green-500 hover:bg-green-600' : ''}
              ${order.status.toLowerCase() === 'processing' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
              ${order.status.toLowerCase() === 'ordered' ? 'bg-purple-500 hover:bg-purple-600' : ''}
            `}>
              {order.status}
            </Badge>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Order Status
          </h3>
          <div className="relative pl-6 border-l-2 border-primary/20 space-y-6">
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary"></div>
              <p className="text-sm font-medium">Order Scheduled</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.orderDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary/50"></div>
              <p className="text-sm font-medium">Processing</p>
              <p className="text-xs text-muted-foreground">
                {new Date(order.orderDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            {order.status.toLowerCase() === 'departured' && (
              <div className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary/50"></div>
                <p className="text-sm font-medium">Departed</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.departureDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          {/* Receiver Information */}
          <div className="col-span-1 md:col-span-1">
            <div className="border rounded-lg p-4 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Receiver Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer Name</p>
                  <p className="font-medium">{order.receiver}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium">{order.id.substring(0, 6)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{order.email || `${order.receiver.toLowerCase().replace(' ', '')}@gmail.com`}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Customer Mobile</p>
                  <p className="font-medium">{order.phone || "+1 234 567 8900"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium">{order.company || "The Dedas"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Courier Service</p>
                  <p className="font-medium">{order.courier || "Singapore Malaiyan Regitt"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="col-span-1 md:col-span-1">
            <div className="border rounded-lg p-4 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Address Details
              </h3>
              
              <div className="space-y-4">
                {addressLines.map((line, index) => (
                  <div key={index}>
                    <p className="text-sm text-muted-foreground">Address Line {index + 1}</p>
                    <p className="font-medium">{line}</p>
                  </div>
                ))}
                
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{order.city || addressLines[0].split('-')[0].trim()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{order.state || "Dubai"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Zip Code</p>
                  <p className="font-medium">{order.zipCode || "636002"}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Item Information */}
          <div className="col-span-1 md:col-span-1">
            <div className="border rounded-lg p-4 h-full">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Item Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Item Description</p>
                  <p className="font-medium line-clamp-3">{order.itemDescription || "Package contents (miscellaneous items)"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Purpose</p>
                  <p className="font-medium">{order.purpose || "Commercial"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Value</p>
                  <p className="font-medium">{order.value || order.totalPrice}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{order.totalWeight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Package Information & Payment Information (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Package Information */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Box className="h-5 w-5 text-primary" />
              Package Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Packaging method</p>
                <p className="font-medium">{order.packagingDetails?.method || order.packingType}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{order.packagingDetails?.weight || order.totalWeight}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Length</p>
                <p className="font-medium">{order.packagingDetails?.length || "30 cm"}</p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{order.packagingDetails?.height || "20 cm"}</p>
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm">Shipping charge</p>
                <p className="font-medium">{paymentDetails.shippingCharge}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <p className="text-sm">Tax</p>
                <p className="font-medium">{paymentDetails.tax}</p>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold">Total</p>
                <p className="font-bold text-lg">{paymentDetails.total}</p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3">
          <Button className="w-full sm:w-auto order-2 sm:order-1" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <div className="flex gap-3 w-full sm:w-auto order-1 sm:order-2">
            <Button className="flex-1" variant="outline">
              <Pen className="mr-2 h-4 w-4" />
              Edit Shipment
            </Button>
            <Button className="flex-1" variant="destructive">
              <X className="mr-2 h-4 w-4" />
              Cancel Shipment
            </Button>
            <Button className="flex-1">
              Pay Now
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
