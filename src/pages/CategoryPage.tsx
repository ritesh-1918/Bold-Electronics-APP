
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/shared/ProductCard";
import FilterDrawer, { FilterOptions } from "@/components/filters/FilterDrawer";
import { Category, Product } from "@/types/product";
import { mockProducts, mockCategories } from "@/data/mock-data";
import { useTheme } from "@/hooks/use-theme";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    onSale: false,
    brands: [],
    sortBy: "featured"
  });
  const { theme } = useTheme();
  
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
  
  // Apply filters to category products
  useEffect(() => {
    if (products.length) {
      let results = [...products];
      
      // Filter by price
      results = results.filter(product => 
        product.price >= activeFilters.minPrice && 
        product.price <= activeFilters.maxPrice
      );
      
      // Filter by in stock
      if (activeFilters.inStock) {
        results = results.filter(product => product.stock > 0 || product.inStock === true);
      }
      
      // Filter by on sale
      if (activeFilters.onSale) {
        results = results.filter(product => product.salePrice !== undefined);
      }
      
      // Filter by brands
      if (activeFilters.brands.length > 0) {
        results = results.filter(product => 
          product.brand && activeFilters.brands.includes(product.brand)
        );
      }
      
      // Sort results
      switch (activeFilters.sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          results.sort((a, b) => {
            const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
            const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
            return dateB - dateA;
          });
          break;
        case 'best-rated':
          results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        default:
          // 'featured' is default sorting
          break;
      }
      
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]);
    }
  }, [products, activeFilters]);
  
  const handleApplyFilters = (newFilters: FilterOptions) => {
    setActiveFilters(newFilters);
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (activeFilters.minPrice > 0) count++;
    if (activeFilters.maxPrice < 1000) count++;
    if (activeFilters.inStock) count++;
    if (activeFilters.onSale) count++;
    if (activeFilters.brands.length > 0) count++;
    if (activeFilters.sortBy !== 'featured') count++;
    
    return count;
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-[60vh]">
          <div className={`w-8 h-8 rounded-full border-4 border-t-transparent animate-spin ${
            theme === "dark" ? "border-brand-light-blue" : "border-brand-blue"
          }`}></div>
        </div>
      </PageLayout>
    );
  }
  
  if (!category) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center pt-12 pb-20">
          <h2 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : ""}`}>
            Category not found
          </h2>
          <p className={`text-center mb-6 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
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
      <div className="py-3 space-y-3">
        {/* Category Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {category.icon ? (
              <img src={category.icon} alt={category.name} className="w-7 h-7 mr-2" />
            ) : (
              <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-2 ${
                theme === "dark" 
                  ? "bg-brand-blue/20 text-brand-light-blue" 
                  : "bg-brand-blue/10 text-brand-blue"
              }`}>
                {category.name.charAt(0)}
              </div>
            )}
            <h1 className={`text-base font-semibold ${theme === "dark" ? "text-white" : ""}`}>
              {category.name}
            </h1>
          </div>
          <Button 
            variant={theme === "dark" ? "secondary" : "outline"} 
            size="sm" 
            className="gap-1 h-8 text-xs"
            onClick={() => setShowFilterDrawer(true)}
          >
            <SlidersHorizontal size={14} />
            <span>Filter</span>
            {getActiveFilterCount() > 0 && (
              <Badge variant="default" className="ml-1 h-5 w-5 p-0 text-[10px] flex items-center justify-center">
                {getActiveFilterCount()}
              </Badge>
            )}
          </Button>
        </div>
        
        {/* Product Count */}
        <div className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {filteredProducts.length} products found
        </div>
        
        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              No products found in this category
            </p>
            <Button variant="outline" className="mt-4" onClick={() => navigate("/")}>
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
      
      <FilterDrawer 
        isOpen={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </PageLayout>
  );
};

export default CategoryPage;
