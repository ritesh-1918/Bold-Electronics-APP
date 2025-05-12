
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, User, Clock, Bell, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";

interface ProfileMenuItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    setLoading(true);
    
    setTimeout(() => {
      localStorage.removeItem("isAuthenticated");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully"
      });
      navigate("/login");
    }, 500);
  };
  
  const menuItems: ProfileMenuItem[] = [
    {
      icon: <Clock size={20} className="text-brand-blue" />,
      label: "Order History",
      href: "/orders"
    },
    {
      icon: <Heart size={20} className="text-brand-blue" />,
      label: "Wishlist",
      href: "/wishlist"
    },
    {
      icon: <Bell size={20} className="text-brand-blue" />,
      label: "Notifications",
      href: "/notifications"
    },
    {
      icon: <Settings size={20} className="text-brand-blue" />,
      label: "Settings",
      href: "/settings"
    },
    {
      icon: <LogOut size={20} className="text-red-500" />,
      label: "Logout",
      onClick: handleLogout
    }
  ];
  
  return (
    <PageLayout title="Profile">
      <div className="space-y-4 py-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-brand-blue text-white text-xl">
                JD
              </AvatarFallback>
            </Avatar>
            
            <div className="ml-4">
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-500">john.doe@example.com</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate("/edit-profile")}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="border-b last:border-b-0"
              onClick={item.onClick || (() => item.href && navigate(item.href))}
            >
              <button className="w-full flex items-center justify-between p-4 text-left">
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </div>
                {!item.onClick && <ChevronRight size={18} className="text-gray-400" />}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8">
          <p>Version 1.0.0</p>
          <p className="mt-1">Bold Electronics © 2023</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
