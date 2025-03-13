
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Notification = {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "New Order Received",
    message: "You have received a new order #ORD-12345.",
    date: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    title: "Order Shipped",
    message: "Order #ORD-12340 has been shipped successfully.",
    date: "Yesterday",
    read: false,
  },
  {
    id: "3",
    title: "Payment Received",
    message: "Payment for order #ORD-12338 has been received.",
    date: "2 days ago",
    read: true,
  },
  {
    id: "4",
    title: "New Product Added",
    message: "A new product has been added to your store.",
    date: "5 days ago",
    read: true,
  },
];

const NotificationsPage = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
        </div>

        <div className="grid gap-4">
          {MOCK_NOTIFICATIONS.map((notification) => (
            <Card 
              key={notification.id} 
              className={notification.read ? "bg-background" : "bg-primary/5 border-primary/20"}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  {!notification.read && (
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  )}
                  {notification.title}
                </CardTitle>
                <CardDescription>{notification.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{notification.message}</p>
              </CardContent>
            </Card>
          ))}

          {MOCK_NOTIFICATIONS.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-center">No notifications yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
