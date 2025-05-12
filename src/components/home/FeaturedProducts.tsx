
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shared/ProductCard";
import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-data";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // In a real app, you'd fetch from an API
    const featured = mockProducts.slice(0, 6);
    setFeaturedProducts(featured);
  }, []);
  
  if (!featuredProducts.length) return null;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Featured Products</h2>
        <Link to="/search">
          <Button variant="ghost" size="sm" className="text-brand-blue group">
            View all
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {featuredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
