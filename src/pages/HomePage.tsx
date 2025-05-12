
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import Banner from "@/components/home/Banner";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { mockBanners } from "@/data/mock-data";

const HomePage = () => {
  const [showSearch, setShowSearch] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <PageLayout showSearch={false} showCart={true} hideNavigation={false}>
      <div className="space-y-6 py-4">
        {/* Search Bar */}
        <div className="relative">
          <Link to="/search" className="w-full">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search electronics..."
                className="pl-10 bg-white"
                readOnly
              />
              <Search 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" 
              />
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
