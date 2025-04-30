
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
      {/* Sidebar component */}
      <ShadcnSidebar collapsible="none" variant="sidebar">
        <SidebarContent>
          <Sidebar />
        </SidebarContent>
      </ShadcnSidebar>
      
      {/* Main content area */}
      <SidebarInset className="bg-slate-50">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6 mt-16">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
            
            {/* Render the current route or fallback to dashboard content */}
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Index;
