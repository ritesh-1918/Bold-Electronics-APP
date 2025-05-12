
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";

const SplashScreen = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user has seen the splash screen before
    const hasSeen = localStorage.getItem("hasSeenSplash");
    
    const timer = setTimeout(() => {
      if (hasSeen) {
        // If authenticated, go to home, otherwise go to onboarding
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        navigate(isAuthenticated ? "/" : "/onboarding");
      } else {
        localStorage.setItem("hasSeenSplash", "true");
        navigate("/onboarding");
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 animate-fade-in">
      <div className="w-full max-w-xs flex flex-col items-center">
        <Logo size="large" className="mb-8" />
        <div className="w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
