
import { cn } from "@/lib/utils";

type StatusType = 'active' | 'maintenance' | 'issue' | 'idle';

interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

const getStatusConfig = (status: StatusType) => {
  switch (status) {
    case 'active':
      return {
        label: 'Active',
        className: 'bg-green-100 text-green-800 border-green-200'
      };
    case 'maintenance':
      return {
        label: 'In Maintenance',
        className: 'bg-amber-100 text-amber-800 border-amber-200'
      };
    case 'issue':
      return {
        label: 'Issue Reported',
        className: 'bg-red-100 text-red-800 border-red-200'
      };
    case 'idle':
      return {
        label: 'Idle',
        className: 'bg-slate-100 text-slate-800 border-slate-200'
      };
    default:
      return {
        label: 'Unknown',
        className: 'bg-slate-100 text-slate-800 border-slate-200'
      };
  }
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = getStatusConfig(status);
  
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        config.className,
        className
      )}
    >
      <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'active' ? 'bg-green-500' : status === 'maintenance' ? 'bg-amber-500' : status === 'issue' ? 'bg-red-500' : 'bg-slate-500'}`}></div>
      {config.label}
    </div>
  );
};

export default StatusBadge;
