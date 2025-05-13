
import { ReactNode } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import TopBar from "@/components/navigation/TopBar";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className={cn(
      "flex flex-col min-h-screen transition-colors duration-200",
      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-surface-light text-gray-900"
    )}>
      <TopBar 
        title={title} 
        showBack={showBack} 
        showSearch={showSearch} 
        showCart={showCart} 
      />
      
      <main className={cn(
        "flex-1",
        isMobile ? "pb-16" : "pb-8",
        !fullWidth && "container-mobile md:max-w-4xl",
        className
      )}>
        {children}
      </main>
      
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};

export default PageLayout;
