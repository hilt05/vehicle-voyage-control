
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        {/* Sidebar component - our custom implementation, not collapsible */}
        <Sidebar />
        
        {/* Main content area */}
        <div className="flex-1 ml-64"> {/* Add ml-64 to offset the sidebar width */}
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6 mt-16">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Render the current route */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
