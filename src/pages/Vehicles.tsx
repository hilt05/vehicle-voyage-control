
import Filters from "@/components/dashboard/Filters";
import VehicleList from "@/components/dashboard/VehicleList";

const Vehicles = () => {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Vehicles</h1>
        </div>
        
        <Filters />
        <VehicleList />
      </div>
    </div>
  );
};

export default Vehicles;
