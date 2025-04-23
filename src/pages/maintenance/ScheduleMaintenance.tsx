
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock, Upload, AlertCircle } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import AttachmentPreview from "@/components/maintenance/AttachmentPreview";
import ScheduleCalendarView from "@/components/maintenance/ScheduleCalendarView";

// Form schema validation
const scheduleFormSchema = z.object({
  vehicleId: z.string({
    required_error: "Please select a vehicle",
  }),
  serviceType: z.string({
    required_error: "Please select a service type",
  }),
  scheduledDate: z.date({
    required_error: "Please select a date for the maintenance",
  }),
  scheduledTime: z.string().optional(),
  technician: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  notes: z.string().optional(),
  isRecurring: z.boolean().default(false),
  recurringInterval: z.string().optional(),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

// Mock data for dropdowns
const vehicles = [
  { id: "1", label: "Toyota Camry - ABC-1234" },
  { id: "2", label: "Honda Accord - XYZ-5678" },
  { id: "3", label: "Ford F-150 - DEF-9012" },
  { id: "4", label: "Nissan Altima - GHI-3456" },
  { id: "5", label: "Chevrolet Malibu - JKL-7890" },
];

const serviceTypes = [
  { id: "oil-change", label: "Oil Change" },
  { id: "tire-rotation", label: "Tire Rotation" },
  { id: "brake-inspection", label: "Brake Inspection" },
  { id: "full-service", label: "Full Service" },
  { id: "engine-diagnostics", label: "Engine Diagnostics" },
  { id: "filter-replacement", label: "Filter Replacement" },
  { id: "fluid-check", label: "Fluid Check & Replacement" },
];

const technicians = [
  { id: "1", label: "John Smith" },
  { id: "2", label: "Sarah Johnson" },
  { id: "3", label: "Mike Wilson" },
  { id: "4", label: "Jessica Brown" },
  { id: "5", label: "David Lee" },
  { id: "external", label: "External Service Provider" },
];

const locations = [
  { id: "1", label: "Main Garage" },
  { id: "2", label: "Downtown Workshop" },
  { id: "3", label: "North Service Center" },
  { id: "4", label: "Mobile Service" },
  { id: "external", label: "External Location" },
];

const recurringOptions = [
  { id: "weekly", label: "Weekly" },
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Every 3 months" },
  { id: "biannually", label: "Every 6 months" },
  { id: "annually", label: "Yearly" },
];

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const hour = i < 10 ? `0${i}` : `${i}`;
  return [
    { id: `${hour}:00`, label: `${hour}:00` },
    { id: `${hour}:30`, label: `${hour}:30` },
  ];
}).flat();

const ScheduleMaintenance = () => {
  const [viewMode, setViewMode] = useState<"form" | "calendar">("form");
  const [attachments, setAttachments] = useState<{ name: string; url: string; type: string }[]>([]);
  
  // Initialize form with default values
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      isRecurring: false,
    },
  });
  
  // Handle file uploads
  const handleFileUpload = (files: FileList) => {
    const newAttachments = Array.from(files).map(file => ({
      name: file.name,
      // Create a temporary URL for preview
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    
    setAttachments(prev => [...prev, ...newAttachments]);
  };
  
  // Check for scheduling conflicts (mock implementation)
  const checkForConflicts = (vehicleId: string, date: Date) => {
    // This would typically be an API call to check the database
    // For demo purposes, we'll randomly return a conflict
    return Math.random() > 0.8;
  };
  
  const onSubmit = (data: ScheduleFormValues) => {
    // Check for conflicts
    const hasConflict = checkForConflicts(data.vehicleId, data.scheduledDate);
    
    if (hasConflict) {
      toast.error("Scheduling Conflict", {
        description: "This vehicle already has maintenance scheduled at this time. Please select a different time or resolve the conflict."
      });
      return;
    }
    
    // In a real app, you would send this data to your API
    console.log("Form submitted:", data);
    console.log("Attachments:", attachments);
    
    // Show success notification
    toast.success("Maintenance Scheduled", {
      description: `${vehicles.find(v => v.id === data.vehicleId)?.label} has been scheduled for ${serviceTypes.find(s => s.id === data.serviceType)?.label} on ${format(data.scheduledDate, "PPP")}${data.scheduledTime ? ` at ${data.scheduledTime}` : ""}.`
    });
    
    // Reset form fields if needed
    // form.reset();
  };
  
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Schedule Maintenance</h1>
            <p className="text-slate-500 mt-1">Plan and schedule maintenance tasks for your fleet</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "form" ? "default" : "outline"}
              onClick={() => setViewMode("form")}
            >
              Form View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => setViewMode("calendar")}
            >
              Calendar View
            </Button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {viewMode === "form" ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vehicle Selection */}
                  <FormField
                    control={form.control}
                    name="vehicleId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a vehicle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vehicles.map(vehicle => (
                              <SelectItem key={vehicle.id} value={vehicle.id}>
                                {vehicle.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Service Type */}
                  <FormField
                    control={form.control}
                    name="serviceType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select service type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {serviceTypes.map(service => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Scheduled Date */}
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Scheduled Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Scheduled Time */}
                  <FormField
                    control={form.control}
                    name="scheduledTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Scheduled Time (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map(time => (
                              <SelectItem key={time.id} value={time.id}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select an approximate time for the service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Technician */}
                  <FormField
                    control={form.control}
                    name="technician"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Technician (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Assign a technician" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {technicians.map(tech => (
                              <SelectItem key={tech.id} value={tech.id}>
                                {tech.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location / Workshop (Optional)</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem key={location.id} value={location.id}>
                                {location.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Estimated Duration */}
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated Duration (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2 hours" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the expected time to complete this service
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Recurring Option */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="isRecurring"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Recurring Maintenance</FormLabel>
                            <FormDescription>
                              Set this maintenance to repeat at regular intervals
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Recurring Interval - only shown if isRecurring is checked */}
                  {form.watch("isRecurring") && (
                    <FormField
                      control={form.control}
                      name="recurringInterval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recurring Interval</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {recurringOptions.map(option => (
                                <SelectItem key={option.id} value={option.id}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {/* Notes/Instructions */}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes/Instructions (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter any additional instructions or notes for the technician..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* File Upload Section */}
                  <div className="md:col-span-2">
                    <FormItem>
                      <FormLabel>Attachments (Optional)</FormLabel>
                      <FormControl>
                        <AttachmentPreview
                          attachments={attachments}
                          onUpload={handleFileUpload}
                        />
                      </FormControl>
                      <FormDescription>
                        Upload relevant documents such as service manuals, previous reports, or warranty information
                      </FormDescription>
                    </FormItem>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t">
                  <Button variant="outline" type="button" onClick={() => form.reset()}>
                    Cancel
                  </Button>
                  <Button type="submit">Schedule Maintenance</Button>
                </div>
              </form>
            </Form>
          ) : (
            <ScheduleCalendarView />
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleMaintenance;
