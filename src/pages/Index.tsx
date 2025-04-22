
import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import Stats from "@/components/dashboard/Stats";
import Filters from "@/components/dashboard/Filters";
import VehicleList from "@/components/dashboard/VehicleList";

const Index = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <div className="text-sm text-slate-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
            
            <Stats />
            
            <Filters />
            
            <VehicleList />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
