
import { useState } from "react";
import { CarFront, MoreVertical, FileEdit, AlertCircle } from "lucide-react";
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

// Mock data for demonstration
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

const VehicleList = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Vehicle Fleet</h2>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CarFront className="mr-2 h-4 w-4" /> Add Vehicle
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
            {mockVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
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
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <FileEdit className="mr-2 h-4 w-4" /> 
                        Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <AlertCircle className="mr-2 h-4 w-4" /> 
                        Report Issue
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VehicleList;
