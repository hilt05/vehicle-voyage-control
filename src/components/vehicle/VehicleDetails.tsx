
import { Car, Clock, User, FileText, AlertTriangle, Calendar } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VehicleDetailsProps {
  vehicle: {
    id: string;
    name: string;
    type: string;
    plate: string;
    driver: string;
    lastService: string;
    status: 'active' | 'maintenance' | 'issue' | 'idle';
    fuelLevel: number;
  };
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

const VehicleDetails = ({ vehicle, onEdit, onDelete, onClose }: VehicleDetailsProps) => {
  return (
    <Card className="w-full">
      <CardHeader className="border-b border-slate-200">
        <div className="flex justify-between items-center">
          <CardTitle>Vehicle Details</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-full max-w-[200px] h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
              <Car className="h-24 w-24 text-slate-400" />
            </div>
            
            <div className="mt-4 w-full">
              <StatusBadge status={vehicle.status} className="w-full flex justify-center py-1.5" />
            </div>
            
            <div className="mt-6 w-full space-y-2">
              <Button 
                onClick={onEdit}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Edit Vehicle
              </Button>
              <Button 
                onClick={onDelete}
                variant="outline"
                className="w-full text-red-600 hover:bg-red-50"
              >
                Delete Vehicle
              </Button>
            </div>
          </div>
          
          <div className="md:w-2/3 space-y-6">
            <h2 className="text-xl font-bold">{vehicle.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <DetailItem 
                  icon={<Car className="h-5 w-5 text-slate-500" />}
                  label="Vehicle ID"
                  value={vehicle.id}
                />
                <DetailItem 
                  icon={<Car className="h-5 w-5 text-slate-500" />}
                  label="Type"
                  value={vehicle.type}
                />
                <DetailItem 
                  icon={<FileText className="h-5 w-5 text-slate-500" />}
                  label="License Plate"
                  value={vehicle.plate}
                />
              </div>
              
              <div className="space-y-4">
                <DetailItem 
                  icon={<User className="h-5 w-5 text-slate-500" />}
                  label="Driver"
                  value={vehicle.driver}
                />
                <DetailItem 
                  icon={<Calendar className="h-5 w-5 text-slate-500" />}
                  label="Last Service"
                  value={new Date(vehicle.lastService).toLocaleDateString()}
                />
                <DetailItem 
                  icon={<Clock className="h-5 w-5 text-slate-500" />}
                  label="Fuel Level"
                  value={`${vehicle.fuelLevel}%`}
                  progressValue={vehicle.fuelLevel}
                />
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-amber-800">Maintenance Reminder</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Next scheduled maintenance: {getFutureDate(vehicle.lastService, 180)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper function to get a future date based on days from a starting date
const getFutureDate = (startDate: string, daysToAdd: number): string => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toLocaleDateString();
};

interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  progressValue?: number;
}

const DetailItem = ({ icon, label, value, progressValue }: DetailItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-sm font-medium text-slate-500">{label}</div>
        <div className="font-medium">{value}</div>
        
        {progressValue !== undefined && (
          <div className="w-full h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
            <div 
              className={`h-full ${
                progressValue > 70 
                  ? 'bg-green-500' 
                  : progressValue > 30 
                  ? 'bg-amber-500' 
                  : 'bg-red-500'
              }`} 
              style={{ width: `${progressValue}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleDetails;
