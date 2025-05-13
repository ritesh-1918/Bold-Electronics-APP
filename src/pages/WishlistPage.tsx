
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, this would fetch from an API or local storage
    // For demo, we'll use a few random products from the mock data
    const randomProducts = [...mockProducts]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
      
    setWishlistItems(randomProducts);
  }, []);
  
  if (wishlistItems.length === 0) {
    return (
      <PageLayout title="Wishlist" showBack>
        <div className="flex flex-col items-center justify-center pt-12 pb-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4 dark:bg-gray-800">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Your wishlist is empty</h2>
          <p className="text-gray-500 text-center mb-6 dark:text-gray-400">
            Add products to your wishlist to keep track of items you're interested in
          </p>
          <Button onClick={() => navigate("/")}>
            Browse Products
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout title="Wishlist" showBack>
      <div className="py-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {wishlistItems.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default WishlistPage;
