
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Filters = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="flex-1">
        <label className="text-sm font-medium mb-1.5 block text-slate-700">Search</label>
        <Input
          type="text"
          placeholder="Search by ID, plate number..."
          className="w-full"
        />
      </div>
      
      <div className="flex-1">
        <label className="text-sm font-medium mb-1.5 block text-slate-700">Status</label>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="maintenance">In Maintenance</SelectItem>
            <SelectItem value="issue">Issue Reported</SelectItem>
            <SelectItem value="idle">Idle</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <label className="text-sm font-medium mb-1.5 block text-slate-700">Vehicle Type</label>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger>
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="sedan">Sedan</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="truck">Truck</SelectItem>
            <SelectItem value="van">Van</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default Filters;
