
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import TopBar from "./TopBar";
import BottomBar from "./BottomBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {!isMobile && <TopBar />}
      <main className={`flex-1 container mx-auto px-4 py-6 ${isMobile ? "pb-24" : ""}`}>
        {children}
      </main>
      {isMobile && <BottomBar />}
    </div>
  );
};

export default DashboardLayout;
