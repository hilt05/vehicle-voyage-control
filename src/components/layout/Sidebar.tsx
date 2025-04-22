
import { useState } from "react";
import { Car, Sliders, BarChart2, Wrench, Settings, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

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
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        {!collapsed && (
          <h1 className="text-xl font-bold">VehicleVoyage</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-white hover:bg-slate-800"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          <SidebarItem icon={<BarChart2 />} label="Dashboard" active={true} collapsed={collapsed} />
          <SidebarItem icon={<Car />} label="Vehicles" collapsed={collapsed} />
          <SidebarItem icon={<Wrench />} label="Maintenance" collapsed={collapsed} />
          <SidebarItem icon={<Sliders />} label="Reports" collapsed={collapsed} />
          <SidebarItem icon={<Settings />} label="Settings" collapsed={collapsed} />
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        {!collapsed && (
          <div className="text-xs text-slate-400">
            &copy; 2025 VehicleVoyage
          </div>
        )}
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed: boolean;
}

const SidebarItem = ({ icon, label, active = false, collapsed }: SidebarItemProps) => {
  return (
    <li>
      <a
        href="#"
        className={cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
          active
            ? "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
          collapsed ? "justify-center" : "space-x-3"
        )}
      >
        <span className="text-lg">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </a>
    </li>
  );
};

export default Sidebar;
