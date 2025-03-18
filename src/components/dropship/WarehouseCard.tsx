import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Building2, Building, Map, Flag, Globe, Phone, Pencil, Trash2, Copy } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
interface WarehouseCardProps {
  id: string;
  name: string;
  location: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
  items: number;
  revenue: string;
  status: "active" | "inactive";
  onEdit?: () => void;
  onDelete?: () => void;
}
const WarehouseCard = ({
  id,
  name,
  location,
  address1,
  address2,
  city,
  state,
  zipcode,
  country,
  phone,
  items,
  revenue,
  status,
  onEdit,
  onDelete
}: WarehouseCardProps) => {
  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: `${fieldName} copied to clipboard`,
        duration: 2000
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
        duration: 2000
      });
    });
  };
  const renderField = (icon: React.ReactNode, label: string, value: string) => <div className="flex items-start p-4 gap-3 group">
      {icon}
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className="text-base flex items-center gap-2">
          <span>{value}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="p-1.5 rounded-full opacity-0 group-hover:opacity-100 hover:bg-primary/10 transition-all" onClick={() => copyToClipboard(value, label)} aria-label={`Copy ${label}`}>
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>;
  return <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="flex justify-between items-center bg-primary/10 p-4 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-6 overflow-hidden rounded flex items-center justify-center bg-destructive">
            <Flag className="h-3 w-4 text-white" />
          </div>
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex gap-2">
          <Link to={`/admin/warehouse/${id}`}>
            
          </Link>
          {onDelete && <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Delete warehouse</span>
            </Button>}
        </div>
      </div>
      <CardContent className="p-0">
        <div className="divide-y">
          {renderField(<User className="h-5 w-5 text-muted-foreground mt-0.5" />, "User Name - ID", location)}
          {renderField(<MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />, "Address line 1", address1)}
          {address2 && renderField(<MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />, "Address line 2", address2)}
          {renderField(<Building className="h-5 w-5 text-muted-foreground mt-0.5" />, "City", city)}
          {renderField(<Map className="h-5 w-5 text-muted-foreground mt-0.5" />, "State", state)}
          {renderField(<Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />, "Zipcode/Postalcode", zipcode)}
          {renderField(<Globe className="h-5 w-5 text-muted-foreground mt-0.5" />, "Country", country)}
          {renderField(<Phone className="h-5 w-5 text-muted-foreground mt-0.5" />, "Phone", phone)}
        </div>
      </CardContent>
    </Card>;
};
export default WarehouseCard;