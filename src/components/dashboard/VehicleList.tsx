
import { useState } from "react";
import { CarFront, MoreVertical, FileEdit, AlertCircle, Plus, Trash2 } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import VehicleForm from "@/components/vehicle/VehicleForm";
import VehicleDetails from "@/components/vehicle/VehicleDetails";
import { toast } from "sonner";

// Define the status type to ensure type safety
type StatusType = 'active' | 'maintenance' | 'issue' | 'idle';

// Mock data for demonstration
const mockVehicles = [
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

// Define the Vehicle type based on the mock data structure
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

type ModalType = "none" | "add" | "edit" | "delete" | "view";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [modalType, setModalType] = useState<ModalType>("none");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const closeModal = () => {
    setModalType("none");
    setSelectedVehicle(null);
  };

  const handleAddVehicle = (data: Omit<Vehicle, "id">) => {
    // Generate a new ID using a simple format
    const newId = `VHC-${1000 + vehicles.length + 1}`;
    const newVehicle = {
      id: newId,
      ...data,
    } as Vehicle;

    setVehicles([...vehicles, newVehicle]);
    toast.success("Vehicle added successfully");
    closeModal();
  };

  const handleEditVehicle = (data: Partial<Vehicle>) => {
    if (!selectedVehicle) return;
    
    const updatedVehicles = vehicles.map((vehicle) => 
      vehicle.id === selectedVehicle.id ? { ...vehicle, ...data } : vehicle
    );
    
    setVehicles(updatedVehicles);
    toast.success("Vehicle updated successfully");
    closeModal();
  };

  const handleDeleteVehicle = () => {
    if (!selectedVehicle) return;
    
    const updatedVehicles = vehicles.filter(
      (vehicle) => vehicle.id !== selectedVehicle.id
    );
    
    setVehicles(updatedVehicles);
    toast.success("Vehicle deleted successfully");
    closeModal();
  };

  const openAddModal = () => {
    setModalType("add");
    setSelectedVehicle(null);
  };

  const openEditModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType("edit");
  };

  const openDeleteModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType("delete");
  };

  const openViewModal = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setModalType("view");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Vehicle Fleet</h2>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={openAddModal}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle ID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>License Plate</TableHead>
              <TableHead>Driver</TableHead>
              <TableHead>Last Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fuel Level</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id} 
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => openViewModal(vehicle)}
              >
                <TableCell className="font-medium">{vehicle.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-100 rounded-md flex items-center justify-center">
                      <CarFront className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <div className="font-medium">{vehicle.name}</div>
                      <div className="text-xs text-slate-500">{vehicle.type}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.plate}</TableCell>
                <TableCell>{vehicle.driver}</TableCell>
                <TableCell>{new Date(vehicle.lastService).toLocaleDateString()}</TableCell>
                <TableCell>
                  <StatusBadge status={vehicle.status as any} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          vehicle.fuelLevel > 70 
                            ? 'bg-green-500' 
                            : vehicle.fuelLevel > 30 
                            ? 'bg-amber-500' 
                            : 'bg-red-500'
                        }`} 
                        style={{ width: `${vehicle.fuelLevel}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{vehicle.fuelLevel}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditModal(vehicle)}>
                        <FileEdit className="mr-2 h-4 w-4" /> 
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openDeleteModal(vehicle)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> 
                        Delete Vehicle
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openViewModal(vehicle)}>
                        <AlertCircle className="mr-2 h-4 w-4" /> 
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Vehicle Modal */}
      <Modal 
        isOpen={modalType === "add" || modalType === "edit"} 
        onClose={closeModal}
        size="lg"
      >
        <VehicleForm 
          initialData={modalType === "edit" ? selectedVehicle || undefined : undefined}
          onSubmit={modalType === "add" ? handleAddVehicle : handleEditVehicle}
          onCancel={closeModal}
        />
      </Modal>

      {/* View Vehicle Details Modal */}
      <Modal 
        isOpen={modalType === "view"} 
        onClose={closeModal}
        size="lg"
      >
        {selectedVehicle && (
          <VehicleDetails 
            vehicle={selectedVehicle}
            onEdit={() => setModalType("edit")}
            onDelete={() => setModalType("delete")}
            onClose={closeModal}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={modalType === "delete"} 
        onClose={closeModal}
        size="sm"
      >
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Trash2 className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Delete Vehicle</h3>
          <p className="text-slate-600 mb-6">
            Are you sure you want to delete {selectedVehicle?.name}? This action cannot be undone.
          </p>
          <div className="flex gap-3 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-red-600 hover:bg-red-700"
              onClick={handleDeleteVehicle}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VehicleList;
