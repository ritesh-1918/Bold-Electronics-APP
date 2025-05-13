
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shared/CategoryCard";
import { Link } from "react-router-dom";
import { Category } from "@/types/product";
import { mockCategories } from "@/data/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // In a real app, you'd fetch from an API
    setCategories(mockCategories);
  }, []);
  
  if (!categories.length) return null;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className={cn(
          "text-base font-semibold",
          theme === "dark" ? "text-white" : ""
        )}>Categories</h2>
        <Link to="/categories">
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-xs group h-8",
              theme === "dark" ? "text-brand-light-blue hover:bg-gray-800" : "text-brand-blue hover:bg-gray-100"
            )}
          >
            View all
            <ArrowRight size={14} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {categories.slice(0, isMobile ? 8 : 12).map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
