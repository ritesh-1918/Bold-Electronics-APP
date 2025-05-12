
import { ReactNode } from "react";
import BottomNavigation from "@/components/navigation/BottomNavigation";
import TopBar from "@/components/navigation/TopBar";
import { cn } from "@/lib/utils";

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
  return (
    <div className="flex flex-col min-h-screen bg-surface-light">
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
