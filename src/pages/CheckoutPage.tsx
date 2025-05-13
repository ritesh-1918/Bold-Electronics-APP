
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PageLayout from "@/components/layout/PageLayout";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type CheckoutStep = 'address' | 'payment' | 'confirmation';

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('address');
  const [loading, setLoading] = useState(false);
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentStep === 'address') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setLoading(true);
      // Simulate payment processing
      setTimeout(() => {
        setLoading(false);
        setCurrentStep('confirmation');
      }, 1500);
    } else {
      // Order confirmed, clear cart and go to home
      clearCart();
      navigate('/');
    }
  };
  
  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('address');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('payment');
    }
  };
  
  return (
    <PageLayout title="Checkout" showBack>
      <div className="pb-32">
        {/* Checkout Progress */}
        <div className="flex items-center justify-center py-4">
          <div className={`w-8 h-8 rounded-full ${currentStep === 'address' ? 'bg-brand-blue text-white' : 'bg-green-500 text-white'} flex items-center justify-center`}>
            {currentStep === 'address' ? <Home size={16} /> : <Check size={16} />}
          </div>
          <div className={`h-1 w-12 ${currentStep === 'address' ? 'bg-gray-300 dark:bg-gray-700' : 'bg-green-500'}`}></div>
          <div className={`w-8 h-8 rounded-full ${currentStep === 'payment' ? 'bg-brand-blue text-white' : currentStep === 'confirmation' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-500 dark:bg-gray-700'} flex items-center justify-center`}>
            {currentStep === 'payment' ? <CreditCard size={16} /> : currentStep === 'confirmation' ? <Check size={16} /> : '2'}
          </div>
          <div className={`h-1 w-12 ${currentStep === 'confirmation' ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'}`}></div>
          <div className={`w-8 h-8 rounded-full ${currentStep === 'confirmation' ? 'bg-brand-blue text-white' : 'bg-gray-300 text-gray-500 dark:bg-gray-700'} flex items-center justify-center`}>
            {currentStep === 'confirmation' ? <Check size={16} /> : '3'}
          </div>
        </div>
        
        <div className="mt-8">
          {currentStep === 'address' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold dark:text-white">Shipping Address</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pin Code</Label>
                    <Input id="pincode" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input id="state" />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'payment' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold dark:text-white">Payment Method</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" />
                </div>
                
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="XXXX XXXX XXXX XXXX" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" type="password" placeholder="XXX" />
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
                  <h3 className="font-medium mb-2 dark:text-white">Order Summary</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Subtotal ({items.length} items)</span>
                      <span className="dark:text-white">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                      <span className="dark:text-white">{formatCurrency(subtotal > 1000 ? 0 : 99)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-1 border-t dark:border-gray-700">
                      <span className="dark:text-white">Total</span>
                      <span className="text-brand-blue">{formatCurrency(subtotal + (subtotal > 1000 ? 0 : 99))}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 'confirmation' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-green-900">
                <Check size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 dark:text-white">Order Confirmed!</h2>
              <p className="text-gray-500 mb-8 dark:text-gray-400">
                Your order has been placed successfully
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-8 text-left dark:bg-gray-800">
                <h3 className="font-medium mb-2 dark:text-white">Order #BD12345678</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Estimated delivery: 3-5 business days</p>
              </div>
              <Button onClick={() => handleNext()}>
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {currentStep !== 'confirmation' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 safe-bottom dark:bg-gray-800 dark:border-gray-700">
          <div className="container-mobile">
            <div className="flex gap-4">
              {currentStep !== 'address' && (
                <Button variant="outline" className="flex-1" onClick={handleBack}>
                  Back
                </Button>
              )}
              <Button 
                className="flex-1"
                onClick={handleNext}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : currentStep === 'address' ? "Continue to Payment" : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default CheckoutPage;
