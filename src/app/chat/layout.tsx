import Navbar from "@/components/Navbar";
import { AppSidebar } from "@/components/Sidebar/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <div className="w-full">{children}</div>
    </SidebarProvider>
  );
}

export default Layout;
