
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ShoppingCart, 
  Package, 
  Weight, 
  CalendarDays, 
  DollarSign, 
  ArrowRight, 
  User, 
  MapPin,
  Box,
  Store
} from "lucide-react";

// Mock order data for demonstration
const orders = [
  {
    id: "ABN873911",
    itemCount: 5,
    packingType: "Box",
    totalWeight: "5 Kg",
    orderDate: "03 Oct 2024",
    orderTime: "11:45 AM",
    totalPrice: "LKR 1200.00",
    departureDate: "04 Oct 2024",
    departureTime: "09:40 AM",
    status: "Departured",
    receiver: "Ryan Dias",
    address: "U A E - Dubai Main road\nDubai - 636002",
    email: "ryan.dias@gmail.com",
    phone: "+971 52 123 4567",
    company: "The Dedas",
    courier: "Singapore Malaiyan Regitt",
    shippingNumber: "01",
    paymentDetails: {
      shippingCharge: "LKR 1000.00",
      tax: "LKR 200.00",
      total: "LKR 1200.00"
    },
    packagingDetails: {
      method: "Box",
      weight: "5 Kg",
      length: "30 cm",
      height: "20 cm"
    }
  },
  {
    id: "ABN873912",
    itemCount: 3,
    packingType: "-",
    totalWeight: "-",
    orderDate: "03 Oct 2024",
    orderTime: "11:45 AM",
    totalPrice: "LKR 1200.00",
    departureDate: "04 Oct 2024",
    departureTime: "09:40 AM",
    status: "Ordered",
    receiver: "Sarah Chen",
    address: "U A E - Dubai Main road\nDubai - 636002"
  },
  {
    id: "ABN873913",
    itemCount: 2,
    packingType: "-",
    totalWeight: "-",
    orderDate: "03 Oct 2024",
    orderTime: "11:45 AM",
    totalPrice: "LKR 1200.00",
    departureDate: "04 Oct 2024",
    departureTime: "09:40 AM",
    status: "Processing",
    receiver: "Michael Brown",
    address: "U A E - Dubai Main road\nDubai - 636002"
  }
];

const OrderCard = ({ order, onClick }) => {
  const isMobile = useIsMobile();
  
  return (
    <Card 
      className="h-full overflow-hidden transition-all hover:shadow-lg cursor-pointer relative"
      onClick={onClick}
    >
      {/* Display icon in the top-right corner on mobile */}
      {isMobile && (
        <div className="absolute top-2 right-2">
          {order.packingType === "Box" ? 
            <Box className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" /> : 
            <Store className="h-8 w-8 p-1.5 bg-primary/10 text-primary rounded-full" />
          }
        </div>
      )}
      
      <CardContent className="p-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {/* Order ID and Item Count Row */}
          <div className="flex items-start gap-2">
            <ShoppingCart className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Order ID</p>
              <p className="font-medium">{order.id}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Package className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">No of Items</p>
              <p className="font-medium">{order.itemCount}</p>
            </div>
          </div>
          
          {/* Only show in desktop view */}
          <div className="hidden md:flex justify-end">
            {order.packingType === "Box" ? 
              <Box className="h-12 w-12 p-2 bg-primary/10 text-primary rounded-full" /> : 
              <Store className="h-12 w-12 p-2 bg-primary/10 text-primary rounded-full" />
            }
          </div>
          
          {/* Packing Type and Weight Row */}
          <div className="flex items-start gap-2">
            <Box className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Packing Type</p>
              <p className="font-medium">{order.packingType}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Weight className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Total Weight</p>
              <p className="font-medium">{order.totalWeight}</p>
            </div>
          </div>
          
          {/* Remove the mobile view box that was here previously */}
        </div>

        <Separator className="my-1" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {/* Order Date and Total Price Row */}
          <div className="flex items-start gap-2">
            <CalendarDays className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{order.orderDate}</p>
              <p className="text-sm text-muted-foreground">{order.orderTime}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <DollarSign className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Total Price</p>
              <p className="font-medium">{order.totalPrice}</p>
            </div>
          </div>
          
          {/* Departure Date Row */}
          <div className="flex items-start gap-2">
            <ArrowRight className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Departure Date</p>
              <p className="font-medium">{order.departureDate}</p>
              <p className="text-sm text-muted-foreground">{order.departureTime}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 col-span-2 md:col-span-3">
            <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs max-w-[200px]">
              You will receive payment link once your order is delivered
            </div>
            <Badge className="text-xs py-0 px-2 bg-green-500 hover:bg-green-600">
              {order.status}
            </Badge>
          </div>
        </div>
        
        <Separator className="my-1" />
        
        {/* Receiver and Address Row */}
        <div className="grid grid-cols-2 gap-4 p-4">
          <div className="flex items-start gap-2">
            <User className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Receiver</p>
              <p className="font-medium">{order.receiver}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium whitespace-pre-line">{order.address}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const OrdersPage = () => {
  const navigate = useNavigate();

  const handleOrderClick = (order) => {
    navigate(`/dashboard/orders/${order.id}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        </div>
        <p className="text-muted-foreground">
          Track and manage your customer orders
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order, index) => (
            <OrderCard 
              key={index} 
              order={order} 
              onClick={() => handleOrderClick(order)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
