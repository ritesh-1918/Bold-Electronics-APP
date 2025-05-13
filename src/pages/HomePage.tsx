
import { useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { mockBanners } from "@/data/mock-data";
import { useTheme } from "@/hooks/use-theme";

const HomePage = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout showSearch={false} showCart={true} hideNavigation={false} className="tech-pattern">
      <div className="space-y-6 py-4">
        {/* Search Bar */}
        <div className="relative">
          <Link to="/search" className="w-full">
            <div className="relative bg-brand-blue rounded-lg shadow-sm flex items-center h-12 overflow-hidden dark:shadow-brand-blue/20">
              <div className="bg-white dark:bg-gray-800 flex-grow flex items-center ml-1 rounded-md h-10">
                <Search 
                  size={18} 
                  className="absolute left-3 text-gray-500" 
                />
                <div className="pl-10 py-2 text-gray-500 dark:text-gray-400">Search electronics...</div>
              </div>
              <div className="p-2 text-white text-xs">
                Search
              </div>
            </div>
          </Link>
        </div>
        
        {/* Banner Carousel */}
        <Banner items={mockBanners} className="rounded-lg overflow-hidden shadow-lg" />
        
        {/* Welcome Section */}
        <div className="glass-card p-4 rounded-lg">
          <h1 className="text-xl font-semibold mb-2 dark:text-white">
            Welcome to Bold Electronics
          </h1>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            Your one-stop shop for all electronic components, development boards, and DIY project essentials.
          </p>
        </div>
        
        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold dark:text-white">Categories</h2>
            <Link to="/categories" className="text-sm text-brand-blue">View all</Link>
          </div>
          <CategoryGrid />
        </div>
        
        {/* Featured Products */}
        <FeaturedProducts />
      </div>
    </PageLayout>
  );
};

export default HomePage;
