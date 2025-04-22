
type SidebarFooterProps = {
  collapsed: boolean;
};

const SidebarFooter = ({ collapsed }: SidebarFooterProps) => {
  return (
    <div className="p-4 border-t border-slate-800">
      {!collapsed && (
        <div className="text-xs text-slate-400">
          &copy; 2025 VehicleVoyage
        </div>
      )}
    </div>
  );
};

export default SidebarFooter;
