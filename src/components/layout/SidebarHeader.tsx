
import { FileText } from "lucide-react";

const SidebarHeader = () => {
  return (
    <div className="flex items-center p-4 border-b border-slate-800">
      <div className="flex items-center gap-2">
        <FileText size={24} className="text-blue-500" />
        <h1 className="text-xl font-bold text-white">VehicleVoyage</h1>
      </div>
    </div>
  );
};

export default SidebarHeader;
