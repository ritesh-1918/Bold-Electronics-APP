
import { useEffect } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { mockBanners } from "@/data/mock-data";

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout showSearch={false} showCart={true} hideNavigation={false}>
      <div className="space-y-6 py-4">
        {/* Search Bar */}
        <div className="relative">
          <Link to="/search" className="w-full">
            <div className="relative bg-brand-blue rounded-lg shadow-sm flex items-center h-12 overflow-hidden">
              <div className="bg-white flex-grow flex items-center ml-1 rounded-md h-10">
                <Search 
                  size={18} 
                  className="absolute left-3 text-gray-500" 
                />
                <div className="pl-10 py-2 text-gray-500">Search electronics...</div>
              </div>
              <div className="p-2 text-white text-xs">
                Search
              </div>
            </div>
          </Link>
        </div>
        
        {/* Banner Carousel */}
        <Banner items={mockBanners} className="rounded-lg overflow-hidden" />
        
        {/* Categories */}
        <CategoryGrid />
        
        {/* Featured Products */}
        <FeaturedProducts />
      </div>
    </PageLayout>
  );
};

export default HomePage;
