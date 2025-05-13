
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/shared/ProductCard";
import FilterDrawer, { FilterOptions } from "@/components/filters/FilterDrawer";
import { mockProducts, mockCategories } from "@/data/mock-data";
import { Product } from "@/types/product";
import { useTheme } from "@/hooks/use-theme";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Collection of recent search terms - in a real app would be stored in localStorage/backend
const trendingSearches = ["Arduino", "Raspberry Pi", "Sensors", "LED", "ESP32", "NodeMCU"];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]").slice(0, 5)
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    onSale: false,
    brands: [],
    sortBy: "featured"
  });
  
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  // Close suggestions when clicking outside
  useOutsideClick(searchContainerRef, () => {
    setShowSuggestions(false);
  });
  
  // Perform search
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  // Apply filters to search results
  useEffect(() => {
    if (searchResults.length) {
      let results = [...searchResults];
      
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
      
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchResults, activeFilters]);
  
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setFilteredResults([]);
      return;
    }
    
    setIsSearching(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryId.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setIsSearching(false);
      
      // Add to recent searches if it's a new search
      if (searchQuery.trim() && !recentSearches.includes(searchQuery.trim())) {
        const updatedSearches = [searchQuery.trim(), ...recentSearches].slice(0, 5);
        setRecentSearches(updatedSearches);
        localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
      }
    }, 300);
  };
  
  const handleSearch = () => {
    if (query.trim()) {
      setShowSuggestions(false);
      setSearchParams({ q: query.trim() });
      performSearch(query.trim());
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  const handleClearQuery = () => {
    setQuery("");
    setSearchParams({});
    setSearchResults([]);
    setFilteredResults([]);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSearchParams({ q: suggestion });
    setShowSuggestions(false);
    performSearch(suggestion);
  };
  
  const handleClearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };
  
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
  
  return (
    <PageLayout showBack={false} title="" hideNavigation={false} showSearch={false} showCart={true}>
      <div className="pt-2 pb-6">
        {/* Enhanced Search Bar */}
        <div className="relative" ref={searchContainerRef}>
          <div className={cn(
            "flex items-center rounded-lg overflow-hidden shadow-sm",
            theme === "dark" ? "bg-gray-800" : "bg-brand-blue"
          )}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-white hover:bg-opacity-80",
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-brand-blue/80"
              )}
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="relative flex-grow">
              <Input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                className={cn(
                  "border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 rounded-none h-10 text-sm",
                  theme === "dark" ? "bg-gray-700 text-white placeholder:text-gray-300" : "bg-white"
                )}
                placeholder="Search electronics..."
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-full"
                  onClick={handleClearQuery}
                >
                  <X size={16} />
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-white hover:bg-opacity-80",
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-brand-blue/80"
              )}
              onClick={handleSearch}
            >
              <Search size={18} />
            </Button>
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && !isSearching && (
            <div className={cn(
              "absolute top-full left-0 right-0 rounded-b-lg shadow-lg z-50 border-t animate-fade-in",
              theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white"
            )}>
              {query && (
                <div className={cn(
                  "p-2 border-b",
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                )}>
                  <div className="flex items-center justify-between">
                    <div className={cn(
                      "flex items-center gap-2",
                      theme === "dark" ? "text-brand-light-blue" : "text-brand-blue"
                    )}>
                      <Search size={14} />
                      <span className="font-medium text-sm">{query}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={cn(
                        "text-xs h-7 px-2",
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      )}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={cn(
                      "text-xs font-semibold",
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    )}>Recent Searches</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-xs h-6 py-0 px-2",
                        theme === "dark" ? "text-gray-300" : "text-gray-500"
                      )}
                      onClick={handleClearHistory}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center p-2 rounded-md cursor-pointer text-sm",
                          theme === "dark" ? "hover:bg-gray-700 text-gray-100" : "hover:bg-gray-100 text-gray-800"
                        )}
                        onClick={() => handleSuggestionClick(search)}
                      >
                        <span>{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Trending Searches */}
              <div className={cn(
                "p-2 border-t",
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              )}>
                <h3 className={cn(
                  "text-xs font-semibold mb-2",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>Trending Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <div
                      key={index}
                      className={cn(
                        "px-3 py-1 rounded-full text-xs cursor-pointer",
                        theme === "dark" 
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-200" 
                          : "bg-gray-100 hover:bg-gray-200"
                      )}
                      onClick={() => handleSuggestionClick(trend)}
                    >
                      {trend}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Results Area */}
        <div className="mt-3">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className={cn(
                "w-8 h-8 rounded-full border-4 border-t-transparent animate-spin",
                theme === "dark" ? "border-brand-light-blue" : "border-brand-blue"
              )}></div>
              <p className={cn(
                "mt-4 text-sm",
                theme === "dark" ? "text-gray-300" : "text-gray-500"
              )}>Searching for products...</p>
            </div>
          ) : searchParams.has("q") ? (
            filteredResults.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h2 className={cn(
                    "text-base font-semibold",
                    theme === "dark" ? "text-white" : ""
                  )}>
                    Results ({filteredResults.length})
                  </h2>
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
                
                <div className="grid grid-cols-2 gap-3">
                  {filteredResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className={cn(
                  "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4",
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <Search size={24} className={theme === "dark" ? "text-gray-500" : "text-gray-400"} />
                </div>
                <h2 className={cn(
                  "text-lg font-semibold mb-2",
                  theme === "dark" ? "text-white" : ""
                )}>No results found</h2>
                <p className={cn(
                  "text-sm mb-4",
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                )}>
                  We couldn't find any products matching '{searchParams.get("q")}'
                </p>
                <div className="mt-5">
                  <h3 className={cn(
                    "font-medium mb-2 text-sm",
                    theme === "dark" ? "text-gray-300" : ""
                  )}>Popular Categories</h3>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {mockCategories.slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className={cn(
                          "px-3 py-1.5 rounded-md text-xs",
                          theme === "dark" 
                            ? "bg-gray-800 hover:bg-gray-700 text-gray-300" 
                            : "bg-gray-100 hover:bg-gray-200"
                        )}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="py-4">
              <h2 className={cn(
                "text-base font-semibold mb-3",
                theme === "dark" ? "text-white" : ""
              )}>Browse Categories</h2>
              <div className="grid grid-cols-3 gap-2">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className={cn(
                      "rounded-lg shadow-sm p-3 flex flex-col items-center text-center hover:shadow-md transition-shadow",
                      theme === "dark" ? "bg-gray-800 text-white" : "bg-white"
                    )}
                  >
                    {category.icon ? (
                      <img src={category.icon} alt={category.name} className="w-10 h-10 mb-2" />
                    ) : (
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center mb-2",
                        theme === "dark" ? "bg-brand-blue/20 text-brand-light-blue" : "bg-brand-blue/10 text-brand-blue"
                      )}>
                        <span className="font-semibold">{category.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-xs font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
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

// Helper function to conditionally join class names
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export default SearchPage;
