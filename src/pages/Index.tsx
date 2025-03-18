
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowRight, ChevronDown, Box, TruckIcon, CreditCard, BarChart, Globe, Shield, CheckCircle2 } from "lucide-react";
import SplashScreen from "@/components/splash-screen";

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <Box className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Drop & Ship</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/signup">
                <Button className="bg-primary hover:bg-primary/90 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
            
            <div className="md:hidden flex">
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-secondary transition-all">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 container animate-fade-in">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <div className="inline-block rounded-full bg-primary/10 py-1 px-3 text-sm text-primary mb-6 animate-fade-in">
            <span className="font-medium">Welcome to Drop & Ship</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 animate-slide-down">
            Your Ultimate <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">Dropshipping</span> Solution
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up delay-100">
            Streamline your e-commerce business with our powerful platform. Automate product sourcing, inventory management, and order fulfillment.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in delay-200">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl group">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="mt-20 flex justify-center">
            <Button variant="ghost" className="rounded-full animate-bounce-slight" aria-label="Scroll down">
              <ChevronDown className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
              Why Choose Drop & Ship?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to start, manage, and grow your dropshipping business in one place.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TruckIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Shipping</h3>
              <p className="text-muted-foreground">
                Automatically fulfill orders and track shipments from multiple suppliers.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in delay-100">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Payments</h3>
              <p className="text-muted-foreground">
                Process payments securely and manage refunds with ease.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in delay-200">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-muted-foreground">
                Track performance metrics and get insights to optimize your business.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in delay-300">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-muted-foreground">
                Connect with suppliers worldwide and sell to customers anywhere.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in delay-400">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security to protect your business and customer data.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border animate-fade-in delay-500">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Integration</h3>
              <p className="text-muted-foreground">
                Seamlessly connect with your existing e-commerce store and tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="glass dark:glass-dark rounded-3xl p-8 md:p-12 relative overflow-hidden animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-400/20 opacity-30"></div>
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground mb-8">
                Join thousands of successful entrepreneurs who've scaled their dropshipping businesses with our platform.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-all">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border mt-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Box className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold">Drop & Ship</span>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© 2023 Drop & Ship. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
