
import { ReactNode } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import TopBar from "@/components/navigation/TopBar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  hideNavigation?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const PageLayout = ({
  children,
  title,
  showBack = false,
  showSearch = false,
  showCart = true,
  hideNavigation = false,
  className,
  fullWidth = false,
}: PageLayoutProps) => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen",
      theme === "dark" ? "bg-gray-900 text-white" : "bg-surface-light"
    )}>
      <TopBar 
        title={title} 
        showBack={showBack} 
        showSearch={showSearch} 
        showCart={showCart} 
      />
      
      <main className={cn(
        "flex-1 pb-20",
        !fullWidth && "container-mobile",
        className
      )}>
        {children}
      </main>
      
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default PageLayout;
