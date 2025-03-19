
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

export const LogoutButton = () => {
  const handleLogout = () => {
    toast.success("Logout clicked! In a real app, this would log you out.");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="text-muted-foreground hover:text-foreground"
      onClick={handleLogout}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
};
