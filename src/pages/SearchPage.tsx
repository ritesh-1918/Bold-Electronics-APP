
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import ProductCard from "@/components/shared/ProductCard";
import { mockProducts, mockCategories } from "@/data/mock-data";
import { Product } from "@/types/product";

// Collection of recent search terms - in a real app would be stored in localStorage/backend
const trendingSearches = ["Arduino", "Raspberry Pi", "Sensors", "LED", "ESP32", "NodeMCU"];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const navigate = useNavigate();
  
  const [query, setQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]").slice(0, 5)
  );
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Perform search
  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);
  
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
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
    }, 500);
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
  
  return (
    <PageLayout showBack={false} title="" hideNavigation={false} showSearch={false} showCart={true}>
      <div className="pt-2 pb-6">
        {/* Enhanced Search Bar */}
        <div className="relative">
          <div className="flex items-center bg-brand-blue rounded-lg overflow-hidden shadow-sm">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-brand-blue/80"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={20} />
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
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 pl-2 rounded-none h-12"
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
                  <X size={18} />
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-brand-blue/80"
              onClick={handleSearch}
            >
              <Search size={20} />
            </Button>
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && !isSearching && (
            <div className="absolute top-full left-0 right-0 bg-white rounded-b-lg shadow-lg z-50 border-t animate-fade-in">
              {query && (
                <div className="p-2 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-blue">
                      <Search size={16} />
                      <span className="font-medium">{query}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs text-gray-500"
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
                    <h3 className="text-sm font-semibold text-gray-600">Recent Searches</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-gray-500 h-auto py-1"
                      onClick={handleClearHistory}
                    >
                      Clear All
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <div
                        key={index}
                        className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        <span className="text-gray-800">{search}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Trending Searches */}
              <div className="p-2 border-t">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Trending Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((trend, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
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
        <div className="mt-4">
          {isSearching ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
              <p className="mt-4 text-gray-500">Searching for products...</p>
            </div>
          ) : searchParams.has("q") ? (
            searchResults.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">
                    Search Results ({searchResults.length})
                  </h2>
                  <Button variant="outline" size="sm" className="gap-2">
                    <SlidersHorizontal size={16} />
                    <span>Filter</span>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-500 mb-4">
                  We couldn't find any products matching '{searchParams.get("q")}'
                </p>
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Popular Categories</h3>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {mockCategories.slice(0, 6).map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="py-6">
              <h2 className="text-lg font-semibold mb-4">Browse Categories</h2>
              <div className="grid grid-cols-3 gap-3">
                {mockCategories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                  >
                    {category.icon ? (
                      <img src={category.icon} alt={category.name} className="w-12 h-12 mb-2" />
                    ) : (
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mb-2">
                        <span className="text-brand-blue font-semibold">{category.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchPage;
