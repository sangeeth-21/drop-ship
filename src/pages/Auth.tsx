
import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Key, LogIn, User } from "lucide-react";
import { toast } from "sonner";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, userRole, login } = useAuth();

  // If already authenticated, redirect to the appropriate dashboard
  if (isAuthenticated) {
    if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (userRole === 'user') {
      return <Navigate to="/dashboard/store" />;
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        const redirectPath = email === 'admin@example.com' 
          ? '/admin/dashboard' 
          : '/dashboard/store';
        
        toast.success("Login successful!");
        navigate(redirectPath);
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      <div className="flex-1 flex lg:flex-row flex-col items-stretch">
        <div className="lg:w-1/2 hidden lg:block bg-gradient-to-br from-purple-600/10 to-purple-800/20 relative overflow-hidden">
          <div className="absolute inset-0">
            <LogisticsAnimation />
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full flex items-center justify-center p-4">
          <div className="w-full max-w-md mx-auto animate-scale-in">
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-flex items-center justify-center mb-6">
                <Box className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold">Drop & Ship</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Authentication</h1>
              <p className="text-muted-foreground">Sign in with your credentials</p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <div className="space-y-6">
                <div className="space-y-2 text-center">
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Key className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">Login Credentials</h2>
                  <p className="text-sm text-muted-foreground">
                    <strong>Admin:</strong> admin@example.com / admin123<br />
                    <strong>User:</strong> user@example.com / user123
                  </p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4 animate-slide-up">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full h-12">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <LogIn className="h-5 w-5" />
                        <span>Sign in</span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
