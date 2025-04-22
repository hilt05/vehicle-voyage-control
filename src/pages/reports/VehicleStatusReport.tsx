
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, Car, RefreshCw } from "lucide-react";

const VehicleStatusReport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Example vehicle data
  const vehicles = [
    { id: 1, name: "Toyota Camry", plateNumber: "ABC-1234", category: "Sedan", owner: "John Smith", status: "Active" },
    { id: 2, name: "Honda CR-V", plateNumber: "DEF-5678", category: "SUV", owner: "Sarah Johnson", status: "Active" },
    { id: 3, name: "Ford F-150", plateNumber: "GHI-9012", category: "Truck", owner: "Mike Williams", status: "Maintenance" },
    { id: 4, name: "Nissan Altima", plateNumber: "JKL-3456", category: "Sedan", owner: "Jessica Brown", status: "Inactive" },
    { id: 5, name: "Chevrolet Equinox", plateNumber: "MNO-7890", category: "SUV", owner: "David Lee", status: "Active" },
    { id: 6, name: "BMW X5", plateNumber: "PQR-1234", category: "SUV", owner: "Emily Chen", status: "Maintenance" },
    { id: 7, name: "Mercedes C-Class", plateNumber: "STU-5678", category: "Sedan", owner: "Robert Taylor", status: "Active" },
    { id: 8, name: "Audi A4", plateNumber: "VWX-9012", category: "Sedan", owner: "Michelle Wilson", status: "Inactive" }
  ];
  
  const generateReport = () => {
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };
  
  // Status counts
  const activeCount = vehicles.filter(v => v.status === "Active").length;
  const maintenanceCount = vehicles.filter(v => v.status === "Maintenance").length;
  const inactiveCount = vehicles.filter(v => v.status === "Inactive").length;
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Vehicle Status Report</h1>
            <p className="text-slate-500 mt-1">Overview of all vehicle statuses</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-slate-300">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            <Button 
              onClick={generateReport} 
              disabled={isGenerating}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" /> Export Report
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Vehicles</CardTitle>
              <CardDescription>Currently in service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{activeCount}</div>
              <div className="text-sm text-slate-500 mt-1">
                {Math.round((activeCount / vehicles.length) * 100)}% of fleet
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">In Maintenance</CardTitle>
              <CardDescription>Currently being serviced</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{maintenanceCount}</div>
              <div className="text-sm text-slate-500 mt-1">
                {Math.round((maintenanceCount / vehicles.length) * 100)}% of fleet
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Inactive Vehicles</CardTitle>
              <CardDescription>Out of service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{inactiveCount}</div>
              <div className="text-sm text-slate-500 mt-1">
                {Math.round((inactiveCount / vehicles.length) * 100)}% of fleet
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Vehicle Status Details</h2>
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Plate Number</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Car className="h-4 w-4 text-slate-400" />
                      {vehicle.name}
                    </TableCell>
                    <TableCell>{vehicle.plateNumber}</TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>{vehicle.owner}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        vehicle.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : vehicle.status === 'Maintenance'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {vehicle.status}
                      </span>
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

export default VehicleStatusReport;
