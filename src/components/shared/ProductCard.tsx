
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist`,
    });
  };
  
  return (
    <Card className={cn(
      "overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-md dark:bg-gray-800 dark:border-gray-700", 
      className
    )}>
      <div className="relative group">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className={`absolute top-2 right-2 ${isWishlisted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-white/80 hover:bg-white text-gray-700 dark:bg-gray-700/80 dark:hover:bg-gray-700 dark:text-gray-200'} rounded-full h-8 w-8 opacity-80 group-hover:opacity-100 transition-opacity`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleToggleWishlist}
        >
          <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
        </Button>
      </div>
      
      <div className="p-3 flex flex-col flex-1 dark:text-gray-200">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        </Link>
        
        <div className="flex items-center text-xs text-yellow-500 mt-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>
              {i < Math.floor(product.rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="ml-1 text-gray-500 dark:text-gray-400">({product.rating})</span>
        </div>
        
        <div className="mt-2 mb-3">
          <p className="text-brand-blue font-bold dark:text-brand-light-blue">{formatCurrency(product.price)}</p>
          {product.stock < 10 && (
            <p className="text-xs text-red-500 mt-1">Only {product.stock} left!</p>
          )}
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full hover:bg-brand-blue hover:text-white dark:border-gray-600 dark:hover:bg-brand-blue"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
