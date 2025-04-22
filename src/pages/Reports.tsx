import { useLocation, Link, Outlet } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileBarChart, AlertTriangle, FileSearch } from "lucide-react";

const ReportNavItem = ({ icon, label, path, description }: { 
  icon: React.ReactNode; 
  label: string; 
  path: string;
  description: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link to={path}>
      <Card className={`h-full transition-colors hover:border-blue-200 hover:shadow-md ${
        isActive ? "bg-blue-50 border-blue-300" : ""
      }`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-100">{icon}</div>
            <CardTitle className="text-lg">{label}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-slate-600">{description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

const Reports = () => {
  const location = useLocation();
  
  // If we're on a subpage, render the outlet
  if (location.pathname !== "/reports") {
    return <Outlet />;
  }
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Reports</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="p-4 rounded-lg bg-blue-500 text-white md:col-span-2 flex items-center">
            <div>
              <div className="text-sm opacity-80">Vehicles Maintained</div>
              <div className="text-3xl font-bold">128</div>
              <div className="text-sm mt-1 opacity-80">Last 12 months</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-green-500 text-white flex items-center">
            <div>
              <div className="text-sm opacity-80">Active</div>
              <div className="text-3xl font-bold">18</div>
              <div className="text-sm mt-1 opacity-80">Vehicles</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-amber-500 text-white flex items-center">
            <div>
              <div className="text-sm opacity-80">Inactive</div>
              <div className="text-3xl font-bold">4</div>
              <div className="text-sm mt-1 opacity-80">Vehicles</div>
            </div>
          </div>
          
          <div className="p-4 rounded-lg bg-purple-500 text-white flex items-center">
            <div>
              <div className="text-sm opacity-80">Total Cost</div>
              <div className="text-3xl font-bold">$24k</div>
              <div className="text-sm mt-1 opacity-80">Maintenance</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-xl font-semibold mb-6">Available Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <ReportNavItem 
              icon={<FileText className="w-5 h-5 text-blue-600" />} 
              label="Vehicle Status"
              description="Active, inactive, and maintenance status of all vehicles"
              path="/reports/status"
            />
            <ReportNavItem 
              icon={<FileText className="w-5 h-5 text-green-600" />} 
              label="Maintenance"
              description="Maintenance costs and frequency analysis over time"
              path="/reports/maintenance"
            />
            <ReportNavItem 
              icon={<FileBarChart className="w-5 h-5 text-purple-600" />} 
              label="Usage"
              description="Vehicle usage, mileage, and fuel consumption metrics"
              path="/reports/usage"
            />
            <ReportNavItem 
              icon={<AlertTriangle className="w-5 h-5 text-red-600" />} 
              label="Incidents"
              description="Accidents, damage reports, and resolution status"
              path="/reports/incidents"
            />
            <ReportNavItem 
              icon={<FileSearch className="w-5 h-5 text-slate-600" />} 
              label="Custom"
              description="Build and export custom filtered reports"
              path="/reports/custom"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Recent Exports</h2>
            <Link to="/reports/custom" className="text-sm text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-200 rounded-md hover:bg-blue-50">
              Generate New Report
            </Link>
          </div>
          
          <div className="space-y-4">
            {[
              { name: 'Monthly Status Report', date: '2 days ago', format: 'PDF' },
              { name: 'Maintenance Cost Summary', date: '1 week ago', format: 'Excel' },
              { name: 'Vehicle Inventory', date: '2 weeks ago', format: 'CSV' }
            ].map((report, idx) => (
              <div key={idx} className="p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors flex justify-between items-center">
                <div>
                  <div className="font-medium">{report.name}</div>
                  <div className="text-sm text-slate-500">Generated {report.date}</div>
                </div>
                <span className="text-xs px-2 py-1 bg-slate-100 rounded font-medium">{report.format}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
