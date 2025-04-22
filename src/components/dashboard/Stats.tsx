
import { Car, Wrench, AlertTriangle, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard = ({ title, value, description, icon, colorClass }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClass}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Vehicles"
        value="24"
        description="2 added this month"
        icon={<Car className="h-6 w-6 text-blue-600" />}
        colorClass="bg-blue-50"
      />
      <StatCard
        title="In Maintenance"
        value="5"
        description="3 scheduled today"
        icon={<Wrench className="h-6 w-6 text-amber-600" />}
        colorClass="bg-amber-50"
      />
      <StatCard
        title="Issues Reported"
        value="3"
        description="1 critical issue"
        icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
        colorClass="bg-red-50"
      />
      <StatCard
        title="Due for Service"
        value="7"
        description="Within 7 days"
        icon={<Clock className="h-6 w-6 text-purple-600" />}
        colorClass="bg-purple-50"
      />
    </div>
  );
};

export default Stats;
