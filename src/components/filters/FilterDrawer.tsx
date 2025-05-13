
import { useState, useEffect } from "react";
import { X, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useTheme } from "@/hooks/use-theme";

const MOCK_BRANDS = ["Arduino", "Raspberry Pi", "Adafruit", "SparkFun", "Seeed Studio", "Elegoo", "DFRobot"];

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  inStock: boolean;
  onSale: boolean;
  brands: string[];
  sortBy: string;
}

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters?: Partial<FilterOptions>;
}

const DEFAULT_FILTERS: FilterOptions = {
  minPrice: 0,
  maxPrice: 1000,
  inStock: false,
  onSale: false,
  brands: [],
  sortBy: "featured"
};

const FilterDrawer = ({ 
  isOpen, 
  onClose, 
  onApplyFilters,
  initialFilters = {}
}: FilterDrawerProps) => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<FilterOptions>({
    ...DEFAULT_FILTERS,
    ...initialFilters
  });
  
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice, 
    filters.maxPrice
  ]);
  
  const [openSections, setOpenSections] = useState({
    price: true,
    availability: true,
    brands: true,
    sort: true
  });
  
  useEffect(() => {
    // Update filters when price range changes
    setFilters(prev => ({
      ...prev,
      minPrice: priceRange[0],
      maxPrice: priceRange[1]
    }));
  }, [priceRange]);
  
  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  const handleBrandToggle = (brand: string) => {
    setFilters(prev => {
      if (prev.brands.includes(brand)) {
        return {
          ...prev,
          brands: prev.brands.filter(b => b !== brand)
        };
      } else {
        return {
          ...prev,
          brands: [...prev.brands, brand]
        };
      }
    });
  };
  
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setPriceRange([DEFAULT_FILTERS.minPrice, DEFAULT_FILTERS.maxPrice]);
  };
  
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };
  
  // Function to handle slider value change with proper typing
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className={theme === "dark" ? "bg-gray-900 text-white border-gray-800" : ""}>
        <SheetHeader>
          <SheetTitle className={theme === "dark" ? "text-white" : ""}>Filter Products</SheetTitle>
        </SheetHeader>
        
        <div className="py-4 overflow-y-auto h-full">
          {/* Price Range */}
          <Collapsible 
            open={openSections.price} 
            onOpenChange={() => toggleSection('price')}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-sm font-medium">Price Range</span>
                {openSections.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-2">
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    ${priceRange[0]}
                  </span>
                  <span className="text-sm">
                    ${priceRange[1]}
                  </span>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Availability */}
          <Collapsible 
            open={openSections.availability} 
            onOpenChange={() => toggleSection('availability')}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-sm font-medium">Availability</span>
                {openSections.availability ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-2">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="in-stock" className="text-sm">In Stock Only</Label>
                  <Switch 
                    id="in-stock" 
                    checked={filters.inStock}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, inStock: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="on-sale" className="text-sm">On Sale</Label>
                  <Switch 
                    id="on-sale" 
                    checked={filters.onSale}
                    onCheckedChange={(checked) => setFilters(prev => ({ ...prev, onSale: checked }))}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Brands */}
          <Collapsible 
            open={openSections.brands} 
            onOpenChange={() => toggleSection('brands')}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-sm font-medium">Brands</span>
                {openSections.brands ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-2">
              <div className="space-y-2">
                {MOCK_BRANDS.map(brand => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-sm">{brand}</Label>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* Sort By */}
          <Collapsible 
            open={openSections.sort} 
            onOpenChange={() => toggleSection('sort')}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="text-sm font-medium">Sort By</span>
                {openSections.sort ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2 px-2">
              <div className="space-y-2">
                {['featured', 'newest', 'price-low', 'price-high', 'best-rated'].map(sortOption => (
                  <div key={sortOption} className="flex items-center">
                    <Button
                      variant={filters.sortBy === sortOption ? "default" : "ghost"}
                      size="sm"
                      className="justify-start w-full text-xs h-8"
                      onClick={() => setFilters(prev => ({ ...prev, sortBy: sortOption }))}
                    >
                      {sortOption === 'featured' && 'Featured'}
                      {sortOption === 'newest' && 'Newest First'}
                      {sortOption === 'price-low' && 'Price: Low to High'}
                      {sortOption === 'price-high' && 'Price: High to Low'}
                      {sortOption === 'best-rated' && 'Best Rating'}
                      {filters.sortBy === sortOption && <Check className="ml-1 h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <SheetFooter className="flex flex-row gap-2 mt-auto pt-2">
          <Button variant="outline" onClick={resetFilters} className="flex-1">
            Reset
          </Button>
          <Button onClick={handleApplyFilters} className="flex-1">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterDrawer;
