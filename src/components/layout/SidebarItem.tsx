
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { SidebarItemProps, SubItemProps } from "@/types/sidebar";

const SidebarItem = ({ icon, label, to, active = false, collapsed, subItems }: SidebarItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubItems = subItems && subItems.length > 0;

  const toggleSubMenu = (e: React.MouseEvent) => {
    if (hasSubItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <li className="relative">
      <Link
        to={hasSubItems ? "#" : to}
        onClick={toggleSubMenu}
        className={cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
          active
            ? "bg-slate-800 text-white"
            : "text-slate-300 hover:bg-slate-800 hover:text-white",
          collapsed ? "justify-center" : "justify-between"
        )}
      >
        <div className={cn("flex items-center", collapsed ? "" : "space-x-3")}>
          <span className="text-lg">{icon}</span>
          {!collapsed && <span>{label}</span>}
        </div>
        {!collapsed && hasSubItems && (
          <span>{isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}</span>
        )}
      </Link>

      {!collapsed && hasSubItems && isOpen && (
        <ul className="pl-10 mt-1 space-y-1">
          {subItems.map((subItem: SubItemProps, index: number) => (
            <li key={index}>
              <Link
                to={subItem.to}
                className={cn(
                  "block py-2 px-3 text-sm rounded-md transition-colors",
                  subItem.active
                    ? "bg-slate-800/60 text-white"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                )}
              >
                {subItem.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
