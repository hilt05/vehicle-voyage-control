
import { Menu, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarHeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ collapsed, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-800">
      {!collapsed && (
        <div className="flex items-center gap-2">
          <FileText size={24} className="text-blue-500" />
          <h1 className="text-xl font-bold text-white">VehicleVoyage</h1>
        </div>
      )}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="text-white hover:bg-slate-800 ml-auto"
      >
        {collapsed ? <Menu /> : <X />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
