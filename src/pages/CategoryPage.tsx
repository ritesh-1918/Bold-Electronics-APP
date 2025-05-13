
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/shared/ProductCard";
import { Category, Product } from "@/types/product";
import { mockProducts, mockCategories } from "@/data/mock-data";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    setLoading(true);
    
    // In a real app, you'd fetch from an API
    // Find the category
    const foundCategory = mockCategories.find(cat => cat.id === id);
    setCategory(foundCategory || null);
    
    // Find products for this category
    const categoryProducts = mockProducts.filter(product => product.categoryId === id);
    setProducts(categoryProducts);
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
        </div>
      </PageLayout>
    );
  }
  
  if (!category) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center pt-12 pb-20">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Category not found</h2>
          <p className="text-gray-500 text-center mb-6 dark:text-gray-400">
            The category you're looking for doesn't exist
          </p>
          <Button onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout title={category.name} showBack>
      <div className="py-4 space-y-4">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {category.icon ? (
              <img src={category.icon} alt={category.name} className="w-8 h-8 mr-2" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mr-2">
                {category.name.charAt(0)}
              </div>
            )}
            <h1 className="text-xl font-semibold dark:text-white">{category.name}</h1>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal size={16} />
            <span>Filter</span>
          </Button>
        </div>
        
        {/* Product Count */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {products.length} products found
        </div>
        
        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No products found in this category</p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CategoryPage;
