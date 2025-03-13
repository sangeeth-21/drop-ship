
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Package, Store, ShoppingCart, Settings, Bell, Sun, Moon, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useTheme } from "@/components/theme/theme-provider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const navItems = [
    { icon: Store, label: "Store", path: "/dashboard/store" },
    { icon: ShoppingCart, label: "Orders", path: "/dashboard/orders" },
    { icon: Package, label: "Drop & Ship", path: "/dashboard/drop-ship" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              location.pathname === item.path
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
        
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center w-full h-full transition-colors",
                location.pathname === "/dashboard/settings"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">More</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3 rounded-lg">
            <div className="flex flex-col space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start px-2"
                onClick={() => navigate("/dashboard/notifications")}
              >
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start px-2"
                onClick={() => navigate("/dashboard/calculator")}
              >
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start px-2"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? (
                  <>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Light Mode</span>
                  </>
                )}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="flex justify-start px-2"
                onClick={() => navigate("/dashboard/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </nav>
    </div>
  );
};

export default BottomBar;
