
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Suspense, lazy } from "react";
import SplashScreen from "./components/splash-screen";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import UserForm from "./pages/UserForm";
import StorePage from "./pages/dashboard/StorePage";
import OrdersPage from "./pages/dashboard/OrdersPage";
import DropShipPage from "./pages/dashboard/DropShipPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import ProductDetailPage from "./pages/dashboard/ProductDetailPage";
import OrderDetailPage from "./pages/dashboard/OrderDetailPage";
import NewOrderPage from "./pages/dashboard/NewOrderPage";
import CalculatorPage from "./pages/dashboard/CalculatorPage";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminWalkingPage from "./pages/admin/AdminWalkingPage";
import AdminCustomer from "./pages/admin/AdminCustomer";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminShippingPending from "./pages/admin/AdminShippingPending";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminWarehousePage from "./pages/admin/AdminWarehousePage";
import AdminWarehouseDetailPage from "./pages/admin/AdminWarehouseDetailPage";

const queryClient = new QueryClient();

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-fade-in">
      {children}
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="drop-and-ship-theme">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router>
              <Suspense fallback={<SplashScreen />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Index />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <PageTransition>
                        <Login />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/auth"
                    element={
                      <PageTransition>
                        <Auth />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <PageTransition>
                        <Signup />
                      </PageTransition>
                    }
                  />
                  {/* Add the new user form route */}
                  <Route
                    path="/user-form"
                    element={
                      <PageTransition>
                        <UserForm />
                      </PageTransition>
                    }
                  />
                  
                  <Route
                    path="/dashboard"
                    element={
                      <Navigate to="/dashboard/store" replace />
                    }
                  />
                  <Route
                    path="/dashboard/store"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <StorePage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/product/:productSlug"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <ProductDetailPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/orders"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <OrdersPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/drop-ship"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <DropShipPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/new-order"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <NewOrderPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/settings"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <SettingsPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/orders/:orderId"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <OrderDetailPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/calculator"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <CalculatorPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard/notifications"
                    element={
                      <ProtectedRoute allowedRole="user">
                        <PageTransition>
                          <NotificationsPage />
                        </PageTransition>
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/warehouse" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminWarehousePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/warehouse/:warehouseId" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminWarehouseDetailPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/orders" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminOrders />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/walking" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminWalkingPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/shipping-pending" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminShippingPending />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/ready" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Ready Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/history" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>History Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/customer" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminCustomer />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/export-cost" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Export Cost Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/cost" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Cost Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/special-notice" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Special Notice Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/bulk-cargo" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Bulk Cargo Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/cost-calculation" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Cost Calculation Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/stall-info" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <div>Stall Info Page</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminProducts />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/categories" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminCategories />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/settings" 
                    element={
                      <ProtectedRoute allowedRole="admin">
                        <AdminSettings />
                      </ProtectedRoute>
                    } 
                  />
                  
                  <Route
                    path="*"
                    element={
                      <PageTransition>
                        <NotFound />
                      </PageTransition>
                    }
                  />
                </Routes>
              </Suspense>
            </Router>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
