
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, X } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  // Initialize form with existing user data
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    // Load stored profile data
    const storedProfile = localStorage.getItem("userProfile");
    const storedAvatar = localStorage.getItem("userAvatar");
    
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      form.reset(profile);
    }
    
    if (storedAvatar) {
      setAvatarUrl(storedAvatar);
    }
  }, [form]);

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("userProfile", JSON.stringify(values));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
      
      setLoading(false);
      navigate("/profile");
    }, 1000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Avatar image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setAvatarUrl(result);
      localStorage.setItem("userAvatar", result);
    };
    reader.readAsDataURL(file);
  };

  const removeAvatar = () => {
    setAvatarUrl(null);
    localStorage.removeItem("userAvatar");
  };

  return (
    <PageLayout title="Edit Profile" showBack>
      <div className="py-6 space-y-8">
        {/* Avatar Upload */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt="Profile" />
              ) : (
                <AvatarFallback className="bg-brand-blue text-white text-2xl">
                  {form.watch("fullName")?.charAt(0) || "U"}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="absolute -bottom-2 -right-2 flex gap-1">
              <label htmlFor="avatar-upload" className="bg-brand-blue text-white rounded-full p-2 shadow-md cursor-pointer">
                <Camera size={16} />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
              
              {avatarUrl && (
                <button 
                  className="bg-red-500 text-white rounded-full p-2 shadow-md"
                  onClick={removeAvatar}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Upload a profile picture (max 5MB)
          </p>
        </div>

        {/* Profile Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 9876543210" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </PageLayout>
  );
};

export default EditProfilePage;
