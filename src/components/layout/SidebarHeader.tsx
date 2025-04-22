
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type SidebarHeaderProps = {
  collapsed: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ collapsed, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-slate-800">
      {!collapsed && (
        <h1 className="text-xl font-bold text-white">VehicleVoyage</h1>
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
  );
};

export default SidebarHeader;
