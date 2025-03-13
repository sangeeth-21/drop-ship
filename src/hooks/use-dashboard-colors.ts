
import { useTheme } from "@/components/theme/theme-provider";

export const useDashboardColors = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const colors = {
    primary: isDark ? 'hsl(var(--primary))' : 'hsl(var(--primary))',
    secondary: isDark ? 'hsl(var(--secondary))' : 'hsl(var(--secondary))',
    accent: isDark ? 'hsl(var(--accent))' : 'hsl(var(--accent))',
    
    // Card gradients
    orderGradient: isDark 
      ? 'from-purple-950 to-purple-900' 
      : 'from-purple-50 to-purple-100',
    customersGradient: isDark 
      ? 'from-blue-950 to-blue-900' 
      : 'from-blue-50 to-blue-100',
    revenueGradient: isDark 
      ? 'from-green-950 to-green-900' 
      : 'from-green-50 to-green-100',
    growthGradient: isDark 
      ? 'from-orange-950 to-orange-900' 
      : 'from-orange-50 to-orange-100',
      
    // Icons
    orderIcon: isDark ? 'text-purple-400' : 'text-purple-600',
    customersIcon: isDark ? 'text-blue-400' : 'text-blue-600',
    revenueIcon: isDark ? 'text-green-400' : 'text-green-600',
    growthIcon: isDark ? 'text-orange-400' : 'text-orange-600',
  };
  
  return colors;
};
