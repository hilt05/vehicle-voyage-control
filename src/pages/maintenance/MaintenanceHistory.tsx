
import MaintenanceHistoryTable from "@/components/maintenance/MaintenanceHistoryTable";

const MaintenanceHistory = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          Maintenance History
        </h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <MaintenanceHistoryTable />
        </div>
      </div>
    </div>
  );
};

export default MaintenanceHistory;
