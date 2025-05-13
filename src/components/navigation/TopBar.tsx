
import { ArrowLeft, Search, ShoppingCart, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const { theme, setTheme } = useTheme();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  return (
    <header className={cn("sticky top-0 z-40 border-b", 
      theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")}>
      <div className={cn(
        "h-14 flex items-center justify-between px-4",
        title ? "container-mobile" : ""
      )}>
        <div className="flex items-center">
          {showBack && (
            <button 
              onClick={handleBack}
              className={cn("p-2 -ml-2 mr-1 rounded-full", 
                theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100")}
              aria-label="Go back"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          
          {title ? (
            <h1 className={cn("font-semibold text-base truncate", 
              theme === "dark" ? "text-white" : "text-gray-900")}>{title}</h1>
          ) : (
            <Link to="/" className="flex items-center">
              <Logo size="small" />
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  onClick={toggleTheme} 
                  variant="ghost" 
                  size="icon" 
                  className={cn("rounded-full", 
                    theme === "dark" ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100")}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Switch to {theme === 'dark' ? 'light' : 'dark'} mode</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          {showSearch && (
            <Link to="/search" className={cn("p-2 rounded-full", 
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100")}>
              <Search size={18} />
            </Link>
          )}
          
          {showCart && (
            <Link to="/cart" className={cn("p-2 rounded-full relative", 
              theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100")}>
              <ShoppingCart size={18} />
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
