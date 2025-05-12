
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/shared/CategoryCard";
import { Link } from "react-router-dom";
import { Category } from "@/types/product";
import { mockCategories } from "@/data/mock-data";

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    // In a real app, you'd fetch from an API
    setCategories(mockCategories);
  }, []);
  
  if (!categories.length) return null;
  
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <Link to="/categories">
          <Button variant="ghost" size="sm" className="text-brand-blue group">
            View all
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {categories.slice(0, 8).map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
