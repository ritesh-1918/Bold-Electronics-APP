
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Store } from "lucide-react";
import Logo from "@/components/shared/Logo";

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  
  const slides = [
    {
      title: "Welcome to Bold Electronics",
      description: "Your one-stop shop for all electronics and components",
      icon: <Store size={80} className="text-brand-blue" />
    },
    {
      title: "Discover Quality Products",
      description: "Browse through our wide range of electronic gadgets and components",
      icon: <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-2xl">+100</div>
    },
    {
      title: "Fast & Secure Checkout",
      description: "Experience hassle-free shopping with our secure payment system",
      icon: <div className="w-20 h-20 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold text-2xl">₹</div>
    }
  ];
  
  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };
  
  const handleSkip = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 pb-20">
        <Logo size="medium" className="mb-12" />
        
        <div className="w-full max-w-sm">
          <div className="flex items-center justify-center mb-8">
            {slides[currentSlide].icon}
          </div>
          
          <h1 className="text-2xl font-semibold text-center mb-2">
            {slides[currentSlide].title}
          </h1>
          
          <p className="text-center text-gray-600 mb-8">
            {slides[currentSlide].description}
          </p>
          
          <div className="flex justify-center mb-8 space-x-2">
            {slides.map((_, index) => (
              <div 
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-brand-blue" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          
          <Button onClick={handleNext} className="group">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
