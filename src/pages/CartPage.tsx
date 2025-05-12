
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, subtotal, cartItemsCount } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  if (cartItemsCount === 0) {
    return (
      <PageLayout title="Cart" showBack>
        <div className="flex flex-col items-center justify-center pt-12 pb-20">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <ShoppingBag size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 text-center mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button onClick={() => navigate("/")}>
            Continue Shopping
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout title="Cart" showBack>
      <div className="pb-36">
        <div className="space-y-4 py-4">
          {items.map((item) => (
            <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <Link to={`/product/${item.product.id}`} className="hover:underline">
                    <h3 className="font-medium line-clamp-2">{item.product.name}</h3>
                  </Link>
                  
                  <p className="text-brand-blue font-bold mt-1">
                    {formatCurrency(item.product.price)}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded">
                      <button 
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val) && val > 0) {
                            updateQuantity(item.product.id, val);
                          }
                        }}
                        className="w-12 h-8 text-center border-0 p-0"
                      />
                      <button 
                        className="w-8 h-8 flex items-center justify-center"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    
                    <button
                      className="text-gray-500 hover:text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t flex justify-end">
                <p className="font-medium">
                  Subtotal: {formatCurrency(item.product.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="font-medium">{formatCurrency(subtotal > 1000 ? 0 : 99)}</span>
          </div>
          <div className="border-t pt-2 mt-2 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-brand-blue">
              {formatCurrency(subtotal + (subtotal > 1000 ? 0 : 99))}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {subtotal > 1000 ? "Free shipping on orders over ₹1000" : ""}
          </p>
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-bottom">
        <div className="container-mobile">
          <Button 
            className="w-full"
            size="lg"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
          <div className="text-center mt-3">
            <Link to="/" className="text-sm text-brand-blue hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CartPage;
