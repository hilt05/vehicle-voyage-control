import { useLocation, Link, Outlet } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Tags, Wrench, Settings2, Save, Bell } from "lucide-react";

const SettingNavItem = ({ icon, label, path, description }: { 
  icon: React.ReactNode; 
  label: string; 
  path: string;
  description: string;
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
    <Link to={path} className="block">
      <div className={`p-4 border rounded-lg transition-all ${
        isActive 
          ? "bg-slate-50 border-slate-300" 
          : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}>
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-full bg-slate-100 ${isActive ? "text-blue-600" : "text-slate-600"}`}>
            {icon}
          </div>
          <h3 className="font-medium">{label}</h3>
        </div>
        <p className="text-sm text-slate-500 pl-11">{description}</p>
      </div>
    </Link>
  );
};

const Settings = () => {
  const location = useLocation();
  
  if (location.pathname !== "/settings") {
    return <Outlet />;
  }
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <div className="text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">System Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SettingNavItem 
              icon={<Users className="w-5 h-5" />} 
              label="User Management"
              description="Add, edit, and manage user accounts and permissions"
              path="/settings/users"
            />
            
            <SettingNavItem 
              icon={<Tags className="w-5 h-5" />} 
              label="Vehicle Categories"
              description="Define and manage vehicle types and classifications"
              path="/settings/categories"
            />
            
            <SettingNavItem 
              icon={<Wrench className="w-5 h-5" />} 
              label="Service Types"
              description="Configure maintenance service types and tasks"
              path="/settings/services"
            />
            
            <SettingNavItem 
              icon={<Settings2 className="w-5 h-5" />} 
              label="System Preferences"
              description="Configure time zone, currency, language and theme"
              path="/settings/preferences"
            />
            
            <SettingNavItem 
              icon={<Save className="w-5 h-5" />} 
              label="Backup & Restore"
              description="Create system backups and restore from previous versions"
              path="/settings/backup"
            />
            
            <SettingNavItem 
              icon={<Bell className="w-5 h-5" />} 
              label="Notifications"
              description="Configure email and in-app notification settings"
              path="/settings/notifications"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current system status and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-slate-500">System Version</div>
                  <div>VehicleVoyage v1.0.0</div>
                  
                  <div className="text-slate-500">Database Status</div>
                  <div className="text-green-600 font-medium">Connected</div>
                  
                  <div className="text-slate-500">Last Backup</div>
                  <div>Never</div>
                  
                  <div className="text-slate-500">Storage Usage</div>
                  <div>125 MB / 5 GB</div>
                  
                  <div className="text-slate-500">Active Users</div>
                  <div>3 / 10 licenses</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link to="/settings/users" className="block w-full py-2 px-4 text-sm text-center bg-blue-50 text-blue-700 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                  Add New User
                </Link>
                <Link to="/settings/backup" className="block w-full py-2 px-4 text-sm text-center bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100 transition-colors">
                  Create System Backup
                </Link>
                <Link to="/settings/preferences" className="block w-full py-2 px-4 text-sm text-center bg-purple-50 text-purple-700 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors">
                  Update System Preferences
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
