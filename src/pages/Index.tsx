
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { 
  SidebarProvider, 
  Sidebar as ShadcnSidebar,
  SidebarContent, 
  SidebarInset 
} from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      {/* Fixed sidebar with permanent visibility */}
      <ShadcnSidebar collapsible="none" variant="sidebar">
        <SidebarContent>
          <Sidebar />
        </SidebarContent>
      </ShadcnSidebar>
      
      {/* Main content area */}
      <SidebarInset className="bg-slate-50 min-h-screen">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 pt-20">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
