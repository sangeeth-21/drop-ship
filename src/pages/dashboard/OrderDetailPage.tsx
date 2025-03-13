
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User, Package, MapPin, CreditCard, Box,
  Clock, Pen, X, Phone, Building2,
  CircleDollarSign, Ruler, Weight, ArrowLeft
} from "lucide-react";

// Using the same mock data structure from OrdersPage
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
    },
    timeline: [
      { status: "Order Placed", date: "02 July 2024", completed: true },
      { status: "Processing", date: "03 July 2024", completed: true },
      { status: "Shipped", date: "04 July 2024", completed: true },
      { status: "Out for Delivery", date: "05 July 2024", completed: false },
      { status: "Delivered", date: "Expected 06 July 2024", completed: false }
    ]
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
    address: "U A E - Dubai Main road\nDubai - 636002",
    timeline: [
      { status: "Order Placed", date: "02 July 2024", completed: true },
      { status: "Processing", date: "Pending", completed: false },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
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
    address: "U A E - Dubai Main road\nDubai - 636002",
    timeline: [
      { status: "Order Placed", date: "02 July 2024", completed: true },
      { status: "Processing", date: "03 July 2024", completed: true },
      { status: "Shipped", date: "Pending", completed: false },
      { status: "Delivered", date: "Pending", completed: false }
    ]
  }
];

const OrderTimelineItem = ({ status, date, completed, isLast = false }) => {
  return (
    <div className="flex items-start mb-6 last:mb-0">
      <div className="relative">
        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 
          ${completed ? 'bg-primary border-primary' : 'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600'}`}>
          {completed && <div className="w-2 h-2 rounded-full bg-white"></div>}
        </div>
        {!isLast && (
          <div className={`absolute top-6 left-1/2 w-0.5 h-10 -translate-x-1/2 
            ${completed ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
        )}
      </div>
      <div className="ml-4">
        <p className={`font-medium ${completed ? 'text-foreground' : 'text-muted-foreground'}`}>
          {status}
        </p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
  );
};

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <Button onClick={() => navigate('/dashboard/orders')}>
            Back to Orders
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Generate timeline data based on order status if timeline is not defined
  const timeline = order.timeline || [
    { status: "Order Placed", date: order.orderDate, completed: true },
    { status: "Processing", date: order.status === "Processing" || order.status === "Departured" ? order.orderDate : "Pending", completed: order.status === "Processing" || order.status === "Departured" },
    { status: "Shipped", date: order.status === "Departured" ? order.departureDate : "Pending", completed: order.status === "Departured" },
    { status: "Delivered", date: "Pending", completed: false }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          </div>
          <Button variant="outline" onClick={() => navigate('/dashboard/orders')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
        </div>

        {/* Status and Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 md:col-span-1">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Order Timeline
            </h3>
            <div className="pl-2">
              {timeline.map((item, index) => (
                <OrderTimelineItem 
                  key={index} 
                  status={item.status} 
                  date={item.date} 
                  completed={item.completed}
                  isLast={index === timeline.length - 1}
                />
              ))}
            </div>
          </Card>

          <div className="md:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
                  <Badge className={`
                    ${order.status.toLowerCase() === 'departured' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                    ${order.status.toLowerCase() === 'delivered' ? 'bg-green-500 hover:bg-green-600' : ''}
                    ${order.status.toLowerCase() === 'processing' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                    ${order.status.toLowerCase() === 'ordered' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                  `}>
                    {order.status}
                  </Badge>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm text-muted-foreground">
                    You will receive payment link once your order is delivered
                  </p>
                </div>
              </div>
            </Card>

            {/* Receiver Information and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
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
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{order.email || `${order.receiver.toLowerCase().replace(' ', '')}@gmail.com`}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{order.phone || "+1 234 567 8900"}</p>
                  </div>
                  
                  {order.company && (
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium">{order.company}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Address Details */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Address Details
                </h3>
                
                <div className="space-y-4">
                  {order.address.split('\n').map((line, index) => (
                    <div key={index}>
                      <p className="text-sm text-muted-foreground">Address Line {index + 1}</p>
                      <p className="font-medium">{line}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Package and Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Box className="h-5 w-5 text-primary" />
                  Package Information
                </h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Items</p>
                      <p className="font-medium">{order.itemCount}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-medium">{order.totalWeight}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Package Type</p>
                      <p className="font-medium">{order.packingType}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Information
                </h3>
                
                <div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm">Shipping charge</p>
                      <p className="font-medium">{order.paymentDetails?.shippingCharge || "LKR 1000.00"}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <p className="text-sm">Tax</p>
                      <p className="font-medium">{order.paymentDetails?.tax || "LKR 200.00"}</p>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="flex justify-between items-center">
                      <p className="text-base font-semibold">Total</p>
                      <p className="font-bold text-lg">{order.paymentDetails?.total || order.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button variant="outline">
                <Pen className="mr-2 h-4 w-4" />
                Edit Shipment
              </Button>
              <Button variant="destructive">
                <X className="mr-2 h-4 w-4" />
                Cancel Shipment
              </Button>
              <Button>
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetailPage;
