
import Filters from "@/components/dashboard/Filters";
import VehicleList from "@/components/dashboard/VehicleList";

const Vehicles = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Vehicles</h1>
      </div>
      
      <Filters />
      <VehicleList />
    </>
  );
};

export default Vehicles;
