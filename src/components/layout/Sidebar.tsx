
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Car, BarChart2, Wrench, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";
import SidebarHeader from "./SidebarHeader";
import SidebarFooter from "./SidebarFooter";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "h-screen bg-slate-900 text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <SidebarHeader collapsed={collapsed} toggleSidebar={toggleSidebar} />

      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          <SidebarItem 
            icon={<BarChart2 />} 
            label="Dashboard" 
            to="/" 
            active={location.pathname === "/"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={<Car />} 
            label="Vehicles" 
            to="/vehicles" 
            active={location.pathname === "/vehicles"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={<Wrench />} 
            label="Maintenance" 
            to="/maintenance" 
            active={location.pathname === "/maintenance"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={<BarChart2 />} 
            label="Reports" 
            to="/reports" 
            active={location.pathname === "/reports"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={<Settings />} 
            label="Settings" 
            to="/settings" 
            active={location.pathname === "/settings"} 
            collapsed={collapsed} 
          />
        </ul>
      </nav>

      <SidebarFooter collapsed={collapsed} />
    </div>
  );
};

export default Sidebar;
