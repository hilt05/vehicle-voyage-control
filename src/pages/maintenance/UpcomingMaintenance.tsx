
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Car, User, Wrench } from "lucide-react";

const UpcomingMaintenance = () => {
  // Example data
  const upcomingMaintenance = [
    {
      id: 1,
      vehicleName: "Toyota Camry",
      plateNumber: "ABC-1234",
      serviceType: "Oil Change",
      dueDate: "2025-05-01",
      technician: "John Smith",
      status: "Scheduled"
    },
    {
      id: 2,
      vehicleName: "Honda Accord",
      plateNumber: "XYZ-5678",
      serviceType: "Brake Inspection",
      dueDate: "2025-05-03",
      technician: "Sarah Johnson",
      status: "Pending"
    },
    {
      id: 3,
      vehicleName: "Ford F-150",
      plateNumber: "DEF-9012",
      serviceType: "Tire Rotation",
      dueDate: "2025-05-05",
      technician: "Mike Wilson",
      status: "Scheduled"
    },
    {
      id: 4,
      vehicleName: "Nissan Altima",
      plateNumber: "GHI-3456",
      serviceType: "Full Inspection",
      dueDate: "2025-05-10",
      technician: "Jessica Brown",
      status: "Pending"
    },
    {
      id: 5,
      vehicleName: "Chevrolet Malibu",
      plateNumber: "JKL-7890",
      serviceType: "Filter Replacement",
      dueDate: "2025-05-12",
      technician: "David Lee",
      status: "Scheduled"
    }
  ];
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Upcoming Maintenance</h1>
            <p className="text-slate-500 mt-1">Scheduled services for the next 30 days</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Calendar className="mr-2 h-4 w-4" /> Schedule New
          </Button>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Service Type</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingMaintenance.map((maintenance) => (
                  <TableRow key={maintenance.id}>
                    <TableCell className="font-medium">{maintenance.vehicleName}</TableCell>
                    <TableCell>{maintenance.plateNumber}</TableCell>
                    <TableCell>{maintenance.serviceType}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                        {new Date(maintenance.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{maintenance.technician}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        maintenance.status === 'Scheduled' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {maintenance.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4" />
                          <span className="sr-only">Reschedule</span>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Wrench className="h-4 w-4" />
                          <span className="sr-only">Start Service</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMaintenance;
