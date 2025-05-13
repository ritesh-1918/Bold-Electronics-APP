
import { useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { mockBanners } from "@/data/mock-data";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

// Updated mock banners with real images
const enhancedBanners = [
  {
    id: "1",
    title: "New Arduino Kits",
    description: "Start your electronics journey with our starter kits",
    image: "https://cdn.sparkfun.com//assets/parts/1/8/8/00/17523-SparkFun_Inventors_Kit_-_v4.1-01.jpg",
    link: "/category/arduino"
  },
  {
    id: "2",
    title: "Raspberry Pi 5 Available",
    description: "Get the latest and most powerful Pi yet",
    image: "https://cdn.sparkfun.com//assets/parts/1/9/6/3/3/19526-Raspberry_Pi_5-Feature.jpg",
    link: "/product/raspberry-pi-5"
  },
  {
    id: "3",
    title: "IoT Starter Kit",
    description: "Build smart projects with our complete IoT kit",
    image: "https://cdn.sparkfun.com//assets/parts/1/6/2/3/2/17160-SparkFun_Inventor_s_Kit_for_RedBot-08.jpg",
    link: "/product/iot-starter-kit"
  }
];

const HomePage = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout 
      showSearch={false} 
      showCart={true} 
      hideNavigation={false} 
      className={cn(
        "transition-colors",
        theme === "dark" ? "bg-gray-900" : "tech-pattern"
      )}
    >
      <div className="space-y-4 py-3">
        {/* Search Bar */}
        <div className="relative">
          <Link to="/search" className="w-full">
            <div className={cn(
              "relative rounded-lg shadow-sm flex items-center h-10 overflow-hidden",
              theme === "dark" ? "bg-gray-800 shadow-gray-800/50" : "bg-brand-blue"
            )}>
              <div className={cn(
                "flex-grow flex items-center ml-1 rounded-md h-8",
                theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-white"
              )}>
                <Search 
                  size={16} 
                  className={cn(
                    "absolute left-3",
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  )} 
                />
                <div className={cn(
                  "pl-9 py-1.5 text-sm",
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                )}>
                  Search electronics...
                </div>
              </div>
              <div className={cn(
                "p-2 text-xs",
                theme === "dark" ? "text-gray-300" : "text-white"
              )}>
                Search
              </div>
            </div>
          </Link>
        </div>
        
        {/* Banner Carousel */}
        <Banner 
          items={enhancedBanners} 
          className="rounded-lg overflow-hidden shadow-lg" 
        />
        
        {/* Welcome Section */}
        <div className={cn(
          "p-3 rounded-lg",
          theme === "dark" 
            ? "bg-gray-800/80 backdrop-blur-md border border-gray-700" 
            : "glass-card"
        )}>
          <h1 className={cn(
            "text-base font-semibold mb-1",
            theme === "dark" ? "text-white" : ""
          )}>
            Welcome to Bold Electronics
          </h1>
          <p className={cn(
            "text-xs",
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          )}>
            Your one-stop shop for all electronic components, development boards, and DIY project essentials.
          </p>
        </div>
        
        {/* Categories */}
        <CategoryGrid />
        
        {/* Featured Products */}
        <FeaturedProducts />
      </div>
    </PageLayout>
  );
};

export default HomePage;
