
import { useLocation, Link, Outlet } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, History, FileClock, Package, Building } from "lucide-react";

const MaintenanceNavItem = ({ icon, label, path }: { icon: React.ReactNode; label: string; path: string }) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link 
      to={path} 
      className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
        isActive 
          ? "bg-slate-100 text-slate-900 font-medium" 
          : "text-slate-600 hover:bg-slate-50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Maintenance = () => {
  const location = useLocation();
  
  // If we're on a subpage, render the outlet
  if (location.pathname !== "/maintenance") {
    return <Outlet />;
  }
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Maintenance Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Upcoming Services</CardTitle>
              <CardDescription>Services scheduled in next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">7</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vehicles in Service</CardTitle>
              <CardDescription>Currently under maintenance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">3</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Parts to Reorder</CardTitle>
              <CardDescription>Parts below minimum stock</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">5</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Maintenance Portal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <MaintenanceNavItem 
              icon={<Calendar className="w-5 h-5 text-blue-500" />} 
              label="Upcoming Maintenance"
              path="/maintenance/upcoming"
            />
            <MaintenanceNavItem 
              icon={<History className="w-5 h-5 text-green-500" />} 
              label="Maintenance History"
              path="/maintenance/history"
            />
            <MaintenanceNavItem 
              icon={<FileClock className="w-5 h-5 text-purple-500" />} 
              label="Schedule Maintenance"
              path="/maintenance/schedule"
            />
            <MaintenanceNavItem 
              icon={<Package className="w-5 h-5 text-amber-500" />} 
              label="Parts & Inventory"
              path="/maintenance/parts"
            />
            <MaintenanceNavItem 
              icon={<Building className="w-5 h-5 text-slate-500" />} 
              label="Service Providers"
              path="/maintenance/providers"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Maintenance Activities</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Vehicle #{item} - Oil Change</div>
                  <span className="text-xs text-slate-500">3 days ago</span>
                </div>
                <div className="text-sm text-slate-600">
                  Regular maintenance performed by ServiceCenter #{item}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <Link to="/maintenance/history" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View all maintenance records →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
