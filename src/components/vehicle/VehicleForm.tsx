
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Car, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Form validation schema
const vehicleFormSchema = z.object({
  name: z.string().min(2, { message: "Vehicle name must be at least 2 characters." }),
  type: z.string().min(1, { message: "Please select a vehicle type." }),
  plate: z.string().min(1, { message: "License plate is required." }),
  driver: z.string().min(2, { message: "Driver name must be at least 2 characters." }),
  lastService: z.string().min(1, { message: "Last service date is required." }),
  status: z.string().min(1, { message: "Please select a status." }),
  fuelLevel: z.coerce.number().min(0).max(100, { message: "Fuel level must be between 0 and 100." }),
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

interface VehicleFormProps {
  initialData?: VehicleFormValues;
  onSubmit: (data: VehicleFormValues) => void;
  onCancel: () => void;
}

const defaultValues: VehicleFormValues = {
  name: "",
  type: "",
  plate: "",
  driver: "",
  lastService: new Date().toISOString().split("T")[0],
  status: "active",
  fuelLevel: 50,
};

const VehicleForm = ({ initialData, onSubmit, onCancel }: VehicleFormProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: initialData || defaultValues,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {initialData ? "Edit Vehicle" : "Add New Vehicle"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 flex justify-center mb-4">
                <div className="relative w-40 h-40 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Vehicle preview" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <Car className="w-12 h-12 text-slate-400" />
                      <p className="text-sm text-slate-500 mt-2">Vehicle Image</p>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow">
                    <Upload className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Toyota Camry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="plate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Plate</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ABC-1234" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastService"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Service Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="maintenance">In Maintenance</SelectItem>
                        <SelectItem value="issue">Issue Reported</SelectItem>
                        <SelectItem value="idle">Idle</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fuelLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fuel Level (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        {...field} 
                        onChange={e => field.onChange(parseInt(e.target.value, 10))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {initialData ? "Update Vehicle" : "Add Vehicle"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
