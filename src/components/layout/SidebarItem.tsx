
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SidebarItemProps } from "@/types/sidebar";

const SidebarItem = ({ icon, label, to, active = false, collapsed }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
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
      </Link>
    </li>
  );
};

export default SidebarItem;
