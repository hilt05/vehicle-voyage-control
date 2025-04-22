import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileEdit, Car, Calendar, User, Hash, Fuel, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/modal";
import VehicleForm from "@/components/vehicle/VehicleForm";
import { toast } from "sonner";

// Define the status type to match the StatusBadge component
type StatusType = 'active' | 'maintenance' | 'issue' | 'idle';

// Mock data for demonstration - Define the Vehicle type
type Vehicle = {
  id: string;
  name: string;
  type: string;
  plate: string;
  driver: string;
  lastService: string;
  status: StatusType;
  fuelLevel: number;
};

// Mock vehicle data for the details page
const mockVehicles: Vehicle[] = [
  {
    id: "VHC-1001",
    name: "Toyota Camry",
    type: "Sedan",
    plate: "ABC-1234",
    driver: "John Doe",
    lastService: "2025-02-15",
    status: "active" as StatusType,
    fuelLevel: 75,
  },
  {
    id: "VHC-1002",
    name: "Honda CR-V",
    type: "SUV",
    plate: "XYZ-5678",
    driver: "Jane Smith",
    lastService: "2025-03-20",
    status: "maintenance" as StatusType,
    fuelLevel: 45,
  },
  {
    id: "VHC-1003",
    name: "Ford F-150",
    type: "Truck",
    plate: "DEF-9012",
    driver: "Mike Johnson",
    lastService: "2024-12-10",
    status: "issue" as StatusType,
    fuelLevel: 30,
  },
  {
    id: "VHC-1004",
    name: "Chevrolet Express",
    type: "Van",
    plate: "GHI-3456",
    driver: "Sarah Williams",
    lastService: "2025-01-05",
    status: "active" as StatusType,
    fuelLevel: 90,
  },
  {
    id: "VHC-1005",
    name: "Nissan Altima",
    type: "Sedan",
    plate: "JKL-7890",
    driver: "Robert Brown",
    lastService: "2025-04-01",
    status: "idle" as StatusType,
    fuelLevel: 60,
  },
  {
    id: "VHC-1006",
    name: "Tesla Model 3",
    type: "Sedan",
    plate: "MNO-1234",
    driver: "Emily Davis",
    lastService: "2025-03-15",
    status: "active" as StatusType,
    fuelLevel: 85,
  },
];

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const foundVehicle = mockVehicles.find((v) => v.id === id);
      setVehicle(foundVehicle);
    }
  }, [id]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateVehicle = (updatedVehicle: Omit<Vehicle, "id">) => {
    if (!vehicle) return;

    // Find the index of the vehicle to update
    const vehicleIndex = mockVehicles.findIndex((v) => v.id === vehicle.id);

    if (vehicleIndex === -1) {
      toast.error("Vehicle not found in the mock data.");
      return;
    }

    // Update the vehicle in the mock data array
    mockVehicles[vehicleIndex] = {
      ...vehicle,
      ...updatedVehicle,
    };

    // Update the state with the updated vehicle
    setVehicle({
      ...vehicle,
      ...updatedVehicle,
    });

    toast.success("Vehicle details updated successfully!");
    handleCloseEditModal();
  };

  if (!vehicle) {
    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center justify-center h-48">
          <span className="text-slate-500">Vehicle not found.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="bg-white rounded-lg shadow-md p-8 mt-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Car className="h-6 w-6" />
            {vehicle.name}
          </h2>
          <div className="space-x-2">
            <Button onClick={handleEditClick} variant="outline">
              <FileEdit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Vehicle Information</h3>
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">ID:</span>
              <span>{vehicle.id}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Car className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">Type:</span>
              <span>{vehicle.type}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">Last Service:</span>
              <span>{new Date(vehicle.lastService).toLocaleDateString()}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Driver Information</h3>
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">Driver:</span>
              <span>{vehicle.driver}</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">License Plate:</span>
              <span>{vehicle.plate}</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Status</h3>
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={vehicle.status} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-slate-700 mb-2">Fuel Level</h3>
            <div className="flex items-center gap-2 mb-2">
              <Fuel className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-500">Fuel:</span>
              <span>{vehicle.fuelLevel}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Vehicle Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal} title="Edit Vehicle Details" size="lg">
        <VehicleForm
          initialData={vehicle}
          onSubmit={(updatedVehicle) => {
            handleUpdateVehicle(updatedVehicle as Omit<Vehicle, "id">);
          }}
          onCancel={handleCloseEditModal}
        />
      </Modal>
    </div>
  );
};

export default VehicleDetails;
