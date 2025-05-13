
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, User, Clock, Bell, Heart, Settings, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PageLayout from "@/components/layout/PageLayout";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme, setTheme } = useTheme();
  
  // Get user profile from localStorage
  const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const userAvatar = localStorage.getItem("userAvatar");
  
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
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    toast({
      title: `${theme === "dark" ? "Light" : "Dark"} mode activated`,
      description: `Switched to ${theme === "dark" ? "light" : "dark"} theme`
    });
  };
  
  const menuItems: ProfileMenuItem[] = [
    {
      icon: <User size={20} className="text-brand-blue" />,
      label: "Edit Profile",
      href: "/edit-profile"
    },
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
      icon: theme === "dark" ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-indigo-600" />,
      label: `${theme === "dark" ? "Light" : "Dark"} Mode`,
      onClick: toggleTheme
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
  
  const fullName = userProfile.fullName || "John Doe";
  const email = userProfile.email || "john.doe@example.com";
  const initials = fullName.split(' ').map(name => name[0]).join('').toUpperCase().slice(0, 2);
  
  return (
    <PageLayout title="Profile">
      <div className="space-y-4 py-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center">
            <Avatar className="h-20 w-20">
              {userAvatar ? (
                <AvatarImage src={userAvatar} alt={fullName} />
              ) : (
                <AvatarFallback className="bg-brand-blue text-white text-xl dark:bg-brand-light-blue">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="ml-4">
              <h2 className="text-xl font-semibold dark:text-white">{fullName}</h2>
              <p className="text-gray-500 dark:text-gray-400">{email}</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => navigate("/edit-profile")}>
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        {/* Menu Items */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden dark:bg-gray-800">
          {menuItems.map((item, index) => (
            <div 
              key={index}
              className="border-b last:border-b-0 dark:border-gray-700"
              onClick={item.onClick || (() => item.href && navigate(item.href))}
            >
              <button className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center">
                  {item.icon}
                  <span className="ml-3 dark:text-white">{item.label}</span>
                </div>
                {!item.onClick && <ChevronRight size={18} className="text-gray-400" />}
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center text-xs text-gray-500 mt-8 dark:text-gray-400">
          <p>Version 1.0.0</p>
          <p className="mt-1">Bold Electronics © 2023</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
