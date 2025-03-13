
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Package, Store, ShoppingCart, Settings, Calculator, Bell, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { icon: Store, label: "Store", path: "/dashboard/store" },
    { icon: ShoppingCart, label: "Orders", path: "/dashboard/orders" },
    { icon: Package, label: "Drop & Ship", path: "/dashboard/drop-ship" },
    { icon: Calculator, label: "Calculator", path: "/dashboard/calculator" },
    { icon: Settings, label: "Settings", path: "/dashboard/settings" }
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-primary">Drop & Ship</span>
        </div>
        
        <nav className="flex items-center space-x-4">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors px-3 py-2 rounded-md",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 transition-all duration-300 hover:bg-primary/10"
            aria-label="Notifications"
            asChild
          >
            <Link to="/dashboard/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full w-9 h-9 transition-all duration-300 hover:bg-destructive/10"
            aria-label="Logout"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 text-destructive" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
