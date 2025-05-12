
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Category } from "@/types/product";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard = ({ category, className }: CategoryCardProps) => {
  return (
    <Link to={`/category/${category.id}`}>
      <Card className={cn(
        "overflow-hidden flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow",
        className
      )}>
        <div className="w-12 h-12 flex items-center justify-center mb-2">
          {category.icon ? (
            <img 
              src={category.icon} 
              alt={category.name} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              {category.name.charAt(0)}
            </div>
          )}
        </div>
        <h3 className="text-xs font-medium text-center line-clamp-1">{category.name}</h3>
      </Card>
    </Link>
  );
};

export default CategoryCard;
