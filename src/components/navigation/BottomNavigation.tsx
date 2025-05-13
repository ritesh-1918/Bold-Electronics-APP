
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useTheme } from "@/hooks/use-theme";

const BottomNavigation = () => {
  const isMobile = useIsMobile();
  const { cartItemsCount } = useCart();
  const { theme } = useTheme();
  
  if (!isMobile) return null;
  
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 border-t z-50 safe-bottom",
      theme === "dark" 
        ? "bg-gray-900 border-gray-800" 
        : "bg-white border-gray-200"
    )}>
      <nav className="flex items-center justify-around h-14">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-[10px] w-1/4",
            theme === "dark"
              ? isActive ? "text-brand-light-blue" : "text-gray-400"
              : isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <Home size={18} className="mb-0.5" />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-[10px] w-1/4",
            theme === "dark"
              ? isActive ? "text-brand-light-blue" : "text-gray-400"
              : isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <Search size={18} className="mb-0.5" />
          <span>Search</span>
        </NavLink>
        <NavLink 
          to="/cart" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-[10px] w-1/4 relative",
            theme === "dark"
              ? isActive ? "text-brand-light-blue" : "text-gray-400"
              : isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <div className="relative">
            <ShoppingCart size={18} className="mb-0.5" />
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1.5 -right-1.5 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
              >
                {cartItemsCount}
              </Badge>
            )}
          </div>
          <span>Cart</span>
        </NavLink>
        <NavLink 
          to="/profile" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-[10px] w-1/4",
            theme === "dark"
              ? isActive ? "text-brand-light-blue" : "text-gray-400"
              : isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <User size={18} className="mb-0.5" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;
