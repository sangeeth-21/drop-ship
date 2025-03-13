import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Settings, ChevronLeft, ChevronRight, Package, Building, ShoppingCart, Users, Truck, FileText, Check, History, Mail, DollarSign, Info, ShoppingBag, List, ChevronDown, ChevronUp, User, Moon, Sun, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useTheme } from "@/components/theme/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LogoutButton } from "@/components/layout/LogoutButton";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({
  children
}: AdminLayoutProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const {
    theme
  } = useTheme();
  const isMobile = useIsMobile();

  // Handle responsive layout
  useEffect(() => {
    if (isMobile) {
      setCollapsed(true);
    }
  }, [isMobile]);

  // Define menu structure with nested items
  const primaryNavItems = [{
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/admin/dashboard"
  }, {
    icon: Warehouse,
    label: "Warehouse",
    path: "/admin/warehouse"
  }, {
    icon: Building,
    label: "Office",
    isDropdown: true,
    subItems: [{
      icon: ShoppingCart,
      label: "Orders",
      path: "/admin/orders"
    }, {
      icon: Users,
      label: "Walking",
      path: "/admin/walking"
    }]
  }, {
    icon: Truck,
    label: "Shipping",
    isDropdown: true,
    subItems: [{
      icon: FileText,
      label: "Pending",
      path: "/admin/shipping-pending"
    }, {
      icon: Check,
      label: "Ready",
      path: "/admin/ready"
    }, {
      icon: History,
      label: "History",
      path: "/admin/history"
    }]
  }, {
    icon: Users,
    label: "Accounts",
    isDropdown: true,
    subItems: [{
      icon: User,
      label: "Customer",
      path: "/admin/customer"
    }]
  }, {
    icon: Mail,
    label: "Mail",
    isDropdown: true,
    subItems: [{
      icon: DollarSign,
      label: "Export Cost",
      path: "/admin/export-cost"
    }, {
      icon: DollarSign,
      label: "Cost",
      path: "/admin/cost"
    }, {
      icon: FileText,
      label: "Special Notice",
      path: "/admin/special-notice"
    }, {
      icon: Package,
      label: "Bulk Cargo",
      path: "/admin/bulk-cargo"
    }, {
      icon: DollarSign,
      label: "Cost Calculation",
      path: "/admin/cost-calculation"
    }]
  }, {
    icon: ShoppingBag,
    label: "Stall",
    isDropdown: true,
    subItems: [{
      icon: Info,
      label: "Stall Info",
      path: "/admin/stall-info"
    }, {
      icon: ShoppingBag,
      label: "Products",
      path: "/admin/products"
    }, {
      icon: List,
      label: "Categories",
      path: "/admin/categories"
    }]
  }, {
    icon: Settings,
    label: "Settings",
    path: "/admin/settings"
  }];

  // Expand sidebar on hover if it's collapsed
  const handleMouseEnter = () => {
    if (collapsed) {
      setIsHovering(true);
    }
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn("bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 flex flex-col fixed h-full z-30", collapsed && !isHovering ? "w-[70px]" : "w-[240px]")} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className={cn("flex items-center gap-2", collapsed && !isHovering && "hidden")}>
            <Package className="h-6 w-6 text-sidebar-foreground" />
            <span className="font-bold text-lg text-sidebar-foreground">Company</span>
          </div>
          {/* Always show logo when collapsed */}
          {collapsed && !isHovering && <div className="mx-auto">
              <Package className="h-6 w-6 text-sidebar-foreground" />
            </div>}
          {/* Only show toggle button when expanded */}
          {!collapsed || isHovering}
        </div>
        
        <nav className="flex-1 p-2 overflow-y-auto hide-scrollbar">
          {primaryNavItems.map((item, idx) => item.isDropdown ? <div key={`dropdown-${idx}`} className="mb-2">
                {collapsed && !isHovering ?
          // Show only icon when collapsed with proper spacing
          <div className="flex items-center justify-center p-3 rounded-md mb-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer">
                    <item.icon className="h-5 w-5" />
                  </div> :
          // Show accordion when expanded
          <Accordion type="single" collapsible className="w-full bg-transparent">
                    <AccordionItem value={`item-${idx}`} className="border-0">
                      <AccordionTrigger className="px-3 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground no-underline hover:no-underline">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 min-w-5" />
                          <span>{item.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-0 pb-0">
                        {item.subItems.map((subItem, subIdx) => <Link key={`subitem-${subIdx}`} to={subItem.path} className={cn("flex items-center gap-3 pl-9 py-2 rounded-md mb-1 transition-colors", location.pathname === subItem.path ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                            <subItem.icon className="h-4 w-4 min-w-4" />
                            <span>{subItem.label}</span>
                          </Link>)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>}
              </div> :
        // Regular menu item with proper spacing
        <Link key={item.path} to={item.path} className={cn("flex items-center gap-3 px-3 py-2 rounded-md mb-2 transition-colors", collapsed && !isHovering && "justify-center", location.pathname === item.path ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")}>
                <item.icon className="h-5 w-5" />
                {(!collapsed || isHovering) && <span>{item.label}</span>}
              </Link>)}
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 mt-auto">
          <Separator className="mb-4 bg-sidebar-border" />
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content with TopBar */}
      <div className={cn("flex-1 transition-all duration-300", collapsed && !isHovering ? "ml-[70px]" : "ml-[240px]")}>
        {/* TopBar */}
        <header className="sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Admin Portal</h1>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="rounded-full transition-all duration-300 hover:bg-primary/10">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="container mx-auto p-6">
          {children}
        </main>
      </div>
    </div>;
};

export default AdminLayout;
