
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/types/product";
import { formatCurrency } from "@/lib/utils";
import { mockProducts } from "@/data/mock-data";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast({
          title: "Product not found",
          description: "The requested product could not be found",
          variant: "destructive"
        });
        navigate("/");
      }
      
      setLoading(false);
    }, 500);
  }, [id, navigate, toast]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (loading) {
    return (
      <PageLayout showBack title="Product Detail" fullWidth>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-12 h-12 rounded-full border-4 border-brand-blue border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </PageLayout>
    );
  }
  
  if (!product) return null;
  
  return (
    <PageLayout showBack title={product.name} fullWidth>
      <div className="pb-8">
        {/* Product Image */}
        <div className="w-full bg-white">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full object-contain max-h-[300px]"
          />
        </div>
        
        {/* Product Info */}
        <div className="container-mobile pt-4">
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h1 className="text-xl font-semibold">{product.name}</h1>
            
            <div className="flex items-center mt-2">
              <div className="flex items-center text-yellow-500">
                {Array(5).fill(0).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    className={i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-brand-blue mt-3">
              {formatCurrency(product.price)}
            </p>
            
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mt-1">
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-sm text-red-600 mt-1">
                Out of Stock
              </p>
            )}
          </div>
          
          {/* Description */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className={showFullDescription ? "" : "line-clamp-3"}>
              {product.description}
            </p>
            {product.description.length > 150 && (
              <Button
                variant="link"
                className="p-0 h-auto text-brand-blue"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Read less" : "Read more"}
              </Button>
            )}
          </div>
          
          {/* Specifications */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="text-lg font-semibold mb-2">Specifications</h2>
            <div className="divide-y">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="py-2 flex justify-between">
                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 safe-bottom">
        <div className="container-mobile flex items-center space-x-4">
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-none h-10"
              onClick={increaseQuantity}
            >
              <Plus size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 flex-1">
            <Button
              variant="outline"
              className="border-brand-blue text-brand-blue hover:bg-brand-blue/10"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </Button>
            <Button
              variant="default"
              className="bg-brand-blue hover:bg-brand-dark-blue"
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductDetailPage;
