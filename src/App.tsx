
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import VehicleDetails from "./pages/VehicleDetails";
import NotFound from "./pages/NotFound";

// Maintenance sub-pages
import UpcomingMaintenance from "./pages/maintenance/UpcomingMaintenance";
import MaintenanceHistory from "./pages/maintenance/MaintenanceHistory";
import ScheduleMaintenance from "./pages/maintenance/ScheduleMaintenance";
import PartsInventory from "./pages/maintenance/PartsInventory";
import ServiceProviders from "./pages/maintenance/ServiceProviders";

// Reports sub-pages
import VehicleStatusReport from "./pages/reports/VehicleStatusReport";
import MaintenanceReport from "./pages/reports/MaintenanceReport";
import UsageReport from "./pages/reports/UsageReport";
import IncidentReport from "./pages/reports/IncidentReport";
import CustomReports from "./pages/reports/CustomReports";

// Settings sub-pages
import UserManagement from "./pages/settings/UserManagement";
import VehicleCategories from "./pages/settings/VehicleCategories";
import ServiceTypes from "./pages/settings/ServiceTypes";
import SystemPreferences from "./pages/settings/SystemPreferences";
import BackupRestore from "./pages/settings/BackupRestore";
import NotificationSettings from "./pages/settings/NotificationSettings";

// Dashboard components
import Stats from "@/components/dashboard/Stats";
import VehicleList from "@/components/dashboard/VehicleList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}>
            {/* Dashboard as default route */}
            <Route index element={
              <>
                <Stats />
                <VehicleList />
              </>
            } />
            
            {/* Vehicles routes */}
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="vehicles/:id" element={<VehicleDetails />} />
            
            {/* Maintenance Routes */}
            <Route path="maintenance" element={<Maintenance />}>
              <Route path="upcoming" element={<UpcomingMaintenance />} />
              <Route path="history" element={<MaintenanceHistory />} />
              <Route path="schedule" element={<ScheduleMaintenance />} />
              <Route path="parts" element={<PartsInventory />} />
              <Route path="providers" element={<ServiceProviders />} />
            </Route>
            
            {/* Reports Routes */}
            <Route path="reports" element={<Reports />}>
              <Route path="status" element={<VehicleStatusReport />} />
              <Route path="maintenance" element={<MaintenanceReport />} />
              <Route path="usage" element={<UsageReport />} />
              <Route path="incidents" element={<IncidentReport />} />
              <Route path="custom" element={<CustomReports />} />
            </Route>
            
            {/* Settings Routes */}
            <Route path="settings" element={<Settings />}>
              <Route path="users" element={<UserManagement />} />
              <Route path="categories" element={<VehicleCategories />} />
              <Route path="services" element={<ServiceTypes />} />
              <Route path="preferences" element={<SystemPreferences />} />
              <Route path="backup" element={<BackupRestore />} />
              <Route path="notifications" element={<NotificationSettings />} />
            </Route>
          </Route>
          
          {/* 404 route outside of the layout */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
