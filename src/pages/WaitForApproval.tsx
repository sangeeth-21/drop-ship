import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { ArrowLeft, Box, Clock, Mail, ShieldCheck } from "lucide-react";
import { LogisticsAnimation } from "@/components/LogisticsAnimation";
import { Skeleton } from "@/components/ui/skeleton";

const WaitForApproval = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  const handleResendEmail = () => {
    setLoading(true);
    setTimeout(() => {
      setEmailSent(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-4 left-4 z-50">
        <Link to="/">
          <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
      </div>
      
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
              <Link to="/" className="inline-flex items-center justify-center mb-6">
                <Box className="h-8 w-8 text-primary mr-2" />
                <span className="text-2xl font-bold">Drop & Ship</span>
              </Link>
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Clock className="h-10 w-10 text-primary animate-pulse-slight" />
              </div>
              <h1 className="text-3xl font-bold tracking-tighter mb-2">Waiting for Approval</h1>
              <p className="text-muted-foreground">Your account is currently under review by our team</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border rounded-xl p-6 animate-slide-up space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Data Upload Successful</h3>
                    <p className="text-sm text-muted-foreground">
                      Your information has been successfully uploaded and is now awaiting approval.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Estimated Approval Time</h3>
                    <p className="text-sm text-muted-foreground">
                      Our team typically reviews and approves accounts within 24 hours.
                    </p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      <div className="bg-muted/30 rounded-md p-3 text-center">
                        <div className="text-lg font-semibold">{formatTime(timeRemaining.hours)}</div>
                        <div className="text-xs text-muted-foreground">Hours</div>
                      </div>
                      <div className="bg-muted/30 rounded-md p-3 text-center">
                        <div className="text-lg font-semibold">{formatTime(timeRemaining.minutes)}</div>
                        <div className="text-xs text-muted-foreground">Minutes</div>
                      </div>
                      <div className="bg-muted/30 rounded-md p-3 text-center">
                        <div className="text-lg font-semibold">{formatTime(timeRemaining.seconds)}</div>
                        <div className="text-xs text-muted-foreground">Seconds</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Next Steps</h3>
                    <p className="text-sm text-muted-foreground">
                      Once your account is approved, you'll receive an email notification and can immediately access the platform.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="animate-fade-in">
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/">Return to Home</Link>
                </Button>
              </div>
              
              <div className="text-center text-sm animate-fade-in">
                <span className="text-muted-foreground">Need help?</span>{" "}
                <Link to="#" className="text-primary hover:underline font-medium">
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitForApproval;