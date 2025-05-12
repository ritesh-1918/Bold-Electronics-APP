
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

const Logo = ({ size = "medium", className }: LogoProps) => {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-2xl",
    large: "text-4xl"
  };
  
  return (
    <div className={cn("font-poppins font-bold text-brand-blue", sizeClasses[size], className)}>
      Bold<span className="text-gray-800">Electronics</span>
    </div>
  );
};

export default Logo;
