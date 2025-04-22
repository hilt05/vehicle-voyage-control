
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Car } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import VehicleDetailsComponent from "@/components/vehicle/VehicleDetails";

// Mock data - in a real app, you would fetch this from an API
const mockVehicles = [
  {
    id: "VHC-1001",
    name: "Toyota Camry",
    type: "Sedan",
    plate: "ABC-1234",
    driver: "John Doe",
    lastService: "2025-02-15",
    status: "active",
    fuelLevel: 75,
  },
  {
    id: "VHC-1002",
    name: "Honda CR-V",
    type: "SUV",
    plate: "XYZ-5678",
    driver: "Jane Smith",
    lastService: "2025-03-20",
    status: "maintenance",
    fuelLevel: 45,
  },
  {
    id: "VHC-1003",
    name: "Ford F-150",
    type: "Truck",
    plate: "DEF-9012",
    driver: "Mike Johnson",
    lastService: "2024-12-10",
    status: "issue",
    fuelLevel: 30,
  },
  {
    id: "VHC-1004",
    name: "Chevrolet Express",
    type: "Van",
    plate: "GHI-3456",
    driver: "Sarah Williams",
    lastService: "2025-01-05",
    status: "active",
    fuelLevel: 90,
  },
  {
    id: "VHC-1005",
    name: "Nissan Altima",
    type: "Sedan",
    plate: "JKL-7890",
    driver: "Robert Brown",
    lastService: "2025-04-01",
    status: "idle",
    fuelLevel: 60,
  },
  {
    id: "VHC-1006",
    name: "Tesla Model 3",
    type: "Sedan",
    plate: "MNO-1234",
    driver: "Emily Davis",
    lastService: "2025-03-15",
    status: "active",
    fuelLevel: 85,
  },
];

type Vehicle = (typeof mockVehicles)[0];

const VehicleDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setLoading(true);
    setTimeout(() => {
      const foundVehicle = mockVehicles.find(v => v.id === id) || null;
      setVehicle(foundVehicle);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleEdit = () => {
    // In a real app, you would navigate to an edit page or open a modal
    console.log("Edit vehicle", id);
  };

  const handleDelete = () => {
    // In a real app, you would show a confirmation dialog and delete the vehicle
    console.log("Delete vehicle", id);
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <Button
              variant="ghost"
              className="flex items-center text-slate-600 hover:text-slate-900"
              onClick={() => navigate("/")}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Button>
            
            {loading ? (
              <div className="p-12 flex justify-center">
                <div className="animate-pulse flex flex-col items-center">
                  <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded w-32 mb-3"></div>
                  <div className="h-3 bg-slate-200 rounded w-24"></div>
                </div>
              </div>
            ) : vehicle ? (
              <VehicleDetailsComponent 
                vehicle={vehicle} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onClose={() => navigate("/")} 
              />
            ) : (
              <div className="bg-white p-12 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                <Car className="h-16 w-16 text-slate-300 mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Vehicle Not Found</h2>
                <p className="text-slate-500 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/")}
                >
                  Return to Dashboard
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;
