
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

const BottomNavigation = () => {
  const isMobile = useIsMobile();
  const { cartItemsCount } = useCart();
  
  if (!isMobile) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white z-50 safe-bottom">
      <nav className="flex items-center justify-around h-16">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-xs w-1/4",
            isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <Home size={20} className="mb-1" />
          <span>Home</span>
        </NavLink>
        <NavLink 
          to="/search" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-xs w-1/4",
            isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <Search size={20} className="mb-1" />
          <span>Search</span>
        </NavLink>
        <NavLink 
          to="/cart" 
          className={({ isActive }) => cn(
            "flex flex-col items-center justify-center text-xs w-1/4 relative",
            isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <div className="relative">
            <ShoppingCart size={20} className="mb-1" />
            {cartItemsCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
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
            "flex flex-col items-center justify-center text-xs w-1/4",
            isActive ? "text-brand-blue" : "text-gray-500"
          )}
        >
          <User size={20} className="mb-1" />
          <span>Profile</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavigation;
