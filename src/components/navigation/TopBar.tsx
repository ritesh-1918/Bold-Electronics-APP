
import { ArrowLeft, Search, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
}

const TopBar = ({ 
  title, 
  showBack = false, 
  showSearch = false,
  showCart = true 
}: TopBarProps) => {
  const navigate = useNavigate();
  const { cartItemsCount } = useCart();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <header className="sticky top-0 z-40 bg-white border-b">
      <div className={cn(
        "h-16 flex items-center justify-between px-4",
        title ? "container-mobile" : ""
      )}>
        <div className="flex items-center">
          {showBack && (
            <button 
              onClick={handleBack}
              className="p-2 -ml-2 mr-1 rounded-full hover:bg-gray-100"
              aria-label="Go back"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          {title ? (
            <h1 className="font-semibold text-lg truncate">{title}</h1>
          ) : (
            <Link to="/" className="flex items-center">
              <Logo size="small" />
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {showSearch && (
            <Link to="/search" className="p-2 rounded-full hover:bg-gray-100">
              <Search size={20} />
            </Link>
          )}
          
          {showCart && (
            <Link to="/cart" className="p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
