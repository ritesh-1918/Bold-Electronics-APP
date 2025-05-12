
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  return (
    <Card className={cn("overflow-hidden h-full flex flex-col", className)}>
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 rounded-full h-8 w-8"
          aria-label="Add to wishlist"
        >
          <Heart size={18} />
        </Button>
      </div>
      
      <div className="p-3 flex flex-col flex-1">
        <Link to={`/product/${product.id}`} className="hover:underline">
          <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        </Link>
        
        <div className="mt-2 mb-3">
          <p className="text-brand-blue font-bold">{formatCurrency(product.price)}</p>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
