
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { 
  Car, 
  BarChart2, 
  Wrench, 
  Settings, 
  Calendar, 
  History, 
  FileClock, 
  Package, 
  Building,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ className }: { className?: string }) => {
  const [collapsed] = useState(false);
  const location = useLocation();

  // Determine if a path is active or one of its subpaths is active
  const isPathActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={cn(
        "h-full bg-slate-900 text-white transition-all duration-300 flex flex-col overflow-y-auto",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">VehicleVoyage</h1>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto scrollbar-thin">
        <ul className="space-y-2">
          <SidebarItem 
            icon={<BarChart2 />} 
            label="Dashboard" 
            to="/" 
            active={location.pathname === "/"} 
            collapsed={false} 
          />
          
          <SidebarItem 
            icon={<Car />} 
            label="Vehicles" 
            to="/vehicles" 
            active={isPathActive("/vehicles")} 
            collapsed={false} 
          />
          
          <SidebarItem 
            icon={<Wrench />} 
            label="Maintenance" 
            to="/maintenance" 
            active={isPathActive("/maintenance")} 
            collapsed={false}
            subItems={[
              { 
                label: "Upcoming Maintenance", 
                to: "/maintenance/upcoming",
                active: location.pathname === "/maintenance/upcoming"
              },
              { 
                label: "Maintenance History", 
                to: "/maintenance/history",
                active: location.pathname === "/maintenance/history"
              },
              { 
                label: "Schedule Maintenance", 
                to: "/maintenance/schedule",
                active: location.pathname === "/maintenance/schedule"
              },
              { 
                label: "Parts & Inventory", 
                to: "/maintenance/parts",
                active: location.pathname === "/maintenance/parts"
              },
              { 
                label: "Service Providers", 
                to: "/maintenance/providers",
                active: location.pathname === "/maintenance/providers"
              }
            ]}
          />
          
          <SidebarItem 
            icon={<FileText />} 
            label="Reports" 
            to="/reports" 
            active={isPathActive("/reports")} 
            collapsed={false}
            subItems={[
              { 
                label: "Vehicle Status", 
                to: "/reports/status",
                active: location.pathname === "/reports/status"
              },
              { 
                label: "Maintenance Report", 
                to: "/reports/maintenance",
                active: location.pathname === "/reports/maintenance"
              },
              { 
                label: "Usage Report", 
                to: "/reports/usage",
                active: location.pathname === "/reports/usage"
              },
              { 
                label: "Incident Report", 
                to: "/reports/incidents",
                active: location.pathname === "/reports/incidents"
              },
              { 
                label: "Custom Reports", 
                to: "/reports/custom",
                active: location.pathname === "/reports/custom"
              }
            ]}
          />
          
          <SidebarItem 
            icon={<Settings />} 
            label="Settings" 
            to="/settings" 
            active={isPathActive("/settings")} 
            collapsed={false}
            subItems={[
              { 
                label: "User Management", 
                to: "/settings/users",
                active: location.pathname === "/settings/users"
              },
              { 
                label: "Vehicle Categories", 
                to: "/settings/categories",
                active: location.pathname === "/settings/categories"
              },
              { 
                label: "Service Types", 
                to: "/settings/services",
                active: location.pathname === "/settings/services"
              },
              { 
                label: "System Preferences", 
                to: "/settings/preferences",
                active: location.pathname === "/settings/preferences"
              },
              { 
                label: "Backup & Restore", 
                to: "/settings/backup",
                active: location.pathname === "/settings/backup"
              },
              { 
                label: "Notifications", 
                to: "/settings/notifications",
                active: location.pathname === "/settings/notifications"
              }
            ]}
          />
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="text-xs text-slate-400">
          &copy; 2025 VehicleVoyage
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
