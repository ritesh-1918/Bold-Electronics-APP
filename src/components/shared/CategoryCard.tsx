
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Category } from "@/types/product";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard = ({ category, className }: CategoryCardProps) => {
  const { theme } = useTheme();
  
  // Generate a fallback image URL based on category name
  const getFallbackImage = (name: string) => {
    const categoryImages: Record<string, string> = {
      "Arduino": "https://cdn.sparkfun.com//assets/parts/1/1/5/2/0/13676-01.jpg",
      "Sensors": "https://cdn.sparkfun.com//assets/parts/1/3/5/2/9/15173-SparkFun_Triple_Axis_Magnetometer_-_MMC5983MA__Qwiic_-01.jpg",
      "Raspberry Pi": "https://cdn.sparkfun.com//assets/parts/1/9/6/3/3/19526-Raspberry_Pi_5-01.jpg",
      "Micro Controller": "https://cdn.sparkfun.com//assets/parts/1/6/6/5/4/17523-SparkFun_ESP32_Thing_Plus_-_Wroom-03.jpg",
      "Displays": "https://cdn.sparkfun.com//assets/parts/1/1/4/1/9/13664-01.jpg",
      "Capacitors": "https://cdn.sparkfun.com//assets/parts/5/0/3/4/10312-01.jpg",
      "Resistors": "https://cdn.sparkfun.com//assets/parts/1/2/4/9/5/Resistor_Kit-02.jpg",
      "LEDs": "https://cdn.sparkfun.com//assets/parts/1/2/8/4/7/14563-02.jpg",
      "Power": "https://cdn.sparkfun.com//assets/parts/1/1/1/5/3/13656-02.jpg",
      "Tools": "https://cdn.sparkfun.com//assets/parts/9/0/4/3/12822-01.jpg",
      "Robotics": "https://cdn.sparkfun.com//assets/parts/1/3/8/7/5/15449-Servo_-_Generic_Metal_Gear__Micro_Size__HD-T1711__-02.jpg"
    };
    
    return categoryImages[name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a46e5&color=fff&size=100`;
  };
  
  return (
    <Link to={`/category/${category.id}`}>
      <Card className={cn(
        "overflow-hidden flex flex-col items-center justify-center p-2 hover:shadow-md transition-shadow h-full",
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white",
        className
      )}>
        <div className="w-8 h-8 flex items-center justify-center mb-1 overflow-hidden rounded-full">
          {category.icon ? (
            <img 
              src={category.icon} 
              alt={category.name} 
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={getFallbackImage(category.name)}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h3 className={cn(
          "text-[11px] font-medium text-center line-clamp-1",
          theme === "dark" ? "text-gray-200" : ""
        )}>{category.name}</h3>
      </Card>
    </Link>
  );
};

export default CategoryCard;
