
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BannerItem {
  id: string;
  image: string;
  title: string;
  url?: string;
  link?: string;
}

interface BannerProps {
  items: BannerItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
}

const Banner = ({ 
  items, 
  autoPlay = true, 
  interval = 5000,
  className 
}: BannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };
  
  useEffect(() => {
    if (!autoPlay) return;
    
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [autoPlay, interval]);
  
  if (items.length === 0) return null;
  
  return (
    <div className={cn("relative overflow-hidden rounded-xl", className)}>
      <div 
        className="flex transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div 
            key={item.id}
            className="w-full flex-shrink-0"
          >
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        ))}
      </div>
      
      {items.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={16} />
          </Button>
          
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === currentIndex ? "bg-white w-4" : "bg-white/60"
                )}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
