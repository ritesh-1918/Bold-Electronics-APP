
import { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/shared/Logo";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate password reset request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      
      toast({
        title: "Check your inbox",
        description: "We've sent you a password reset link"
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white px-4 py-10 animate-fade-in">
      <div className="mt-10 mb-8 text-center">
        <Link to="/">
          <Logo size="medium" className="inline-block" />
        </Link>
      </div>
      
      <div className="flex-1 flex items-start justify-center">
        <div className="w-full max-w-md">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-center">
                Reset your password
              </CardTitle>
              <CardDescription className="text-center">
                Enter your email and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            
            {submitted ? (
              <CardContent className="space-y-4">
                <div className="bg-green-50 p-4 rounded-md text-green-800 text-center">
                  <p className="font-medium">Password reset email sent!</p>
                  <p className="text-sm mt-1">Please check your inbox at {email}</p>
                </div>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : "Reset password"}
                  </Button>
                </CardContent>
              </form>
            )}
            
            <CardFooter className="flex justify-center">
              <Link to="/login" className="text-sm text-brand-blue hover:underline">
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
