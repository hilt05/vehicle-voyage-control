
import { useState } from "react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Star, Check, X, Info, Calendar, FileText, Link, Upload, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import StatusBadge from "@/components/ui/StatusBadge";

// Service provider type definition
interface ServiceProvider {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  serviceTypes: string[];
  location: string;
  rating: number;
  status: "active" | "inactive";
  notes?: string;
  website?: string;
  maintenanceCount: number;
  lastService?: string;
}

// Service types options
const serviceTypeOptions = [
  "Oil Change",
  "Tire Replacement",
  "Brake Service",
  "Engine Diagnostics",
  "Battery Service",
  "Air Conditioning",
  "Transmission Service",
  "Electrical Repairs",
  "Body Work",
  "General Maintenance"
];

// Mock data for service providers
const mockServiceProviders: ServiceProvider[] = [
  {
    id: "sp1",
    name: "AutoFix Solutions",
    contactPerson: "John Smith",
    phone: "(555) 123-4567",
    email: "service@autofix.com",
    serviceTypes: ["Oil Change", "Tire Replacement", "Brake Service"],
    location: "123 Main St, Anytown, USA",
    rating: 4.8,
    status: "active",
    website: "https://autofix.example.com",
    maintenanceCount: 47,
    lastService: "2025-04-10"
  },
  {
    id: "sp2",
    name: "Express Fleet Services",
    contactPerson: "Jane Doe",
    phone: "(555) 987-6543",
    email: "jane@expressfleet.com",
    serviceTypes: ["Engine Diagnostics", "Electrical Repairs", "Transmission Service"],
    location: "456 Tech Drive, Mechanicsville, USA",
    rating: 4.5,
    status: "active",
    website: "https://expressfleet.example.com",
    maintenanceCount: 32,
    lastService: "2025-04-18"
  },
  {
    id: "sp3",
    name: "Premium Auto Care",
    contactPerson: "Robert Johnson",
    phone: "(555) 456-7890",
    email: "service@premiumauto.com",
    serviceTypes: ["Body Work", "Air Conditioning", "General Maintenance"],
    location: "789 Service Lane, Repairville, USA",
    rating: 3.9,
    status: "inactive",
    notes: "Temporarily unavailable due to facility upgrade",
    maintenanceCount: 19,
    lastService: "2025-02-22"
  }
];

// Rating Star component
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      <div className="flex mr-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${
              i < fullStars 
                ? 'text-amber-500 fill-amber-500' 
                : i === fullStars && hasHalfStar 
                  ? 'text-amber-500 fill-amber-500 opacity-60' 
                  : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
      <span className="text-sm text-slate-600 font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const ServiceProviders = () => {
  const [providers, setProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] = useState<ServiceProvider[]>(mockServiceProviders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState<ServiceProvider | null>(null);

  // Setup React Hook Form
  const form = useForm<Omit<ServiceProvider, 'id' | 'maintenanceCount' | 'lastService'>>({
    defaultValues: {
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      serviceTypes: [],
      location: "",
      rating: 5,
      status: "active",
      notes: "",
      website: ""
    }
  });

  // Handle filtering providers
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterProviders(term, selectedServiceType);
  };

  const handleServiceTypeFilter = (type: string) => {
    setSelectedServiceType(type);
    filterProviders(searchTerm, type);
  };

  const filterProviders = (term: string, serviceType: string) => {
    let filtered = providers;
    
    if (term) {
      filtered = filtered.filter(
        provider => 
          provider.name.toLowerCase().includes(term.toLowerCase()) ||
          provider.contactPerson.toLowerCase().includes(term.toLowerCase()) ||
          provider.email.toLowerCase().includes(term.toLowerCase()) ||
          provider.location.toLowerCase().includes(term.toLowerCase())
      );
    }
    
    if (serviceType) {
      filtered = filtered.filter(
        provider => provider.serviceTypes.includes(serviceType)
      );
    }
    
    setFilteredProviders(filtered);
  };

  // Handle provider operations
  const openAddDialog = () => {
    form.reset({
      name: "",
      contactPerson: "",
      phone: "",
      email: "",
      serviceTypes: [],
      location: "",
      rating: 5,
      status: "active",
      notes: "",
      website: ""
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (provider: ServiceProvider) => {
    setCurrentProvider(provider);
    form.reset({
      name: provider.name,
      contactPerson: provider.contactPerson,
      phone: provider.phone,
      email: provider.email,
      serviceTypes: provider.serviceTypes,
      location: provider.location,
      rating: provider.rating,
      status: provider.status,
      notes: provider.notes || "",
      website: provider.website || ""
    });
    setIsEditDialogOpen(true);
  };

  const openViewDialog = (provider: ServiceProvider) => {
    setCurrentProvider(provider);
    setIsViewDialogOpen(true);
  };

  const handleSubmit = (data: Omit<ServiceProvider, 'id' | 'maintenanceCount' | 'lastService'>) => {
    if (isAddDialogOpen) {
      // Add new provider - ensure status is correctly typed
      const newProvider: ServiceProvider = {
        ...data,
        id: `sp${providers.length + 1}`,
        maintenanceCount: 0,
        status: data.status as "active" | "inactive" // Ensure it's properly typed
      };
      
      // Create a new array with the proper ServiceProvider type
      const updatedProviders: ServiceProvider[] = [...providers, newProvider];
      setProviders(updatedProviders);
      setFilteredProviders(updatedProviders);
      setIsAddDialogOpen(false);
    } else if (isEditDialogOpen && currentProvider) {
      // Update existing provider - ensure status is correctly typed
      const updatedProviders: ServiceProvider[] = providers.map(p => 
        p.id === currentProvider.id ? { 
          ...p, 
          ...data,
          status: data.status as "active" | "inactive" // Ensure it's properly typed
        } : p
      );
      
      setProviders(updatedProviders);
      setFilteredProviders(updatedProviders);
      setIsEditDialogOpen(false);
    }
  };

  const toggleProviderStatus = (provider: ServiceProvider) => {
    const updatedProviders: ServiceProvider[] = providers.map(p => 
      p.id === provider.id 
        ? { ...p, status: p.status === "active" ? "inactive" : "active" } 
        : p
    );
    setProviders(updatedProviders);
    setFilteredProviders(updatedProviders);
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Service Providers</h1>
          <Button onClick={openAddDialog}>Add New Provider</Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Input
                  placeholder="Search providers..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  startIcon={<Info className="w-4 h-4" />}
                />
              </div>
              <div>
                <Select value={selectedServiceType} onValueChange={handleServiceTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Service Types</SelectItem>
                    {serviceTypeOptions.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Provider Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium">{provider.name}</TableCell>
                    <TableCell>{provider.contactPerson}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          <Phone className="w-4 h-4 mr-2 text-slate-500" />
                          {provider.phone}
                        </div>
                        <div className="flex items-center text-sm">
                          <Mail className="w-4 h-4 mr-2 text-slate-500" />
                          {provider.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {provider.serviceTypes.slice(0, 2).map(service => (
                          <span key={service} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {service}
                          </span>
                        ))}
                        {provider.serviceTypes.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                            +{provider.serviceTypes.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="truncate max-w-[150px]">{provider.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RatingStars rating={provider.rating} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge 
                        status={provider.status === "active" ? "active" : "idle"}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openViewDialog(provider)}
                        >
                          <Info className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openEditDialog(provider)}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant={provider.status === "active" ? "destructive" : "outline"} 
                          size="sm"
                          onClick={() => toggleProviderStatus(provider)}
                        >
                          {provider.status === "active" ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredProviders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="h-32 text-center">
                      No service providers found matching your filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add Provider Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Add New Service Provider</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Provider Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Contact Person" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone Number" startIcon={<Phone className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email Address" startIcon={<Mail className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Location" startIcon={<MapPin className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Website URL" startIcon={<Link className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseFloat(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(rating => (
                              <SelectItem key={rating} value={rating.toString()}>
                                <div className="flex items-center">
                                  <RatingStars rating={rating} />
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: "active" | "inactive") => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="serviceTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-slate-50">
                      {serviceTypeOptions.map(service => {
                        const isSelected = field.value?.includes(service);
                        return (
                          <div
                            key={service}
                            className={`py-1 px-3 rounded-full text-sm cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-white border border-slate-200 hover:bg-slate-100"
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                field.onChange(field.value.filter(s => s !== service));
                              } else {
                                field.onChange([...(field.value || []), service]);
                              }
                            }}
                          >
                            {service}
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes/Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Additional notes about this provider..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => isAddDialogOpen ? setIsAddDialogOpen(false) : setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isAddDialogOpen ? "Add Provider" : "Save Changes"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Provider Dialog - reuses the same form as Add */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Service Provider</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Same form fields as Add Provider */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Provider Name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contactPerson"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact Person</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Contact Person" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Phone Number" startIcon={<Phone className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Email Address" startIcon={<Mail className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Location" startIcon={<MapPin className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Website URL" startIcon={<Link className="w-4 h-4" />} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rating (1-5)</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value.toString()}
                          onValueChange={(value) => field.onChange(parseFloat(value))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Rating" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(rating => (
                              <SelectItem key={rating} value={rating.toString()}>
                                <div className="flex items-center">
                                  <RatingStars rating={rating} />
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: "active" | "inactive") => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="serviceTypes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-slate-50">
                      {serviceTypeOptions.map(service => {
                        const isSelected = field.value?.includes(service);
                        return (
                          <div
                            key={service}
                            className={`py-1 px-3 rounded-full text-sm cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-white border border-slate-200 hover:bg-slate-100"
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                field.onChange(field.value.filter(s => s !== service));
                              } else {
                                field.onChange([...(field.value || []), service]);
                              }
                            }}
                          >
                            {service}
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes/Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Additional notes about this provider..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* View Provider Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Service Provider Details</DialogTitle>
          </DialogHeader>
          
          {currentProvider && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{currentProvider.name}</h3>
                    <StatusBadge 
                      status={currentProvider.status === "active" ? "active" : "idle"}
                      className="mt-2"
                    />
                  </div>
                  
                  <div className="border rounded-lg p-4 space-y-3 bg-slate-50">
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2">
                        <Info className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Contact Person</p>
                        <p className="text-sm text-slate-600">{currentProvider.contactPerson}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2">
                        <Phone className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Phone</p>
                        <p className="text-sm text-slate-600">{currentProvider.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2">
                        <Mail className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Email</p>
                        <p className="text-sm text-slate-600">{currentProvider.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2">
                        <MapPin className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Location</p>
                        <p className="text-sm text-slate-600">{currentProvider.location}</p>
                      </div>
                    </div>
                    
                    {currentProvider.website && (
                      <div className="flex items-start">
                        <div className="w-5 h-5 mt-0.5 mr-2">
                          <Link className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">Website</p>
                          <a 
                            href={currentProvider.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            {currentProvider.website}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <div className="w-5 h-5 mt-0.5 mr-2">
                        <Star className="w-5 h-5 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">Rating</p>
                        <RatingStars rating={currentProvider.rating} />
                      </div>
                    </div>
                  </div>
                  
                  {currentProvider.notes && (
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <div className="flex items-start">
                        <div className="w-5 h-5 mt-0.5 mr-2">
                          <FileText className="w-5 h-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-700">Notes</p>
                          <p className="text-sm text-slate-600 whitespace-pre-line">{currentProvider.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-medium mb-2">Services Offered</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProvider.serviceTypes.map(service => (
                        <span key={service} className="inline-flex items-center px-2.5 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-2">Maintenance History</h3>
                    <div className="border rounded-lg p-4 bg-slate-50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-500" />
                          <span className="text-sm font-medium">Service Records</span>
                        </div>
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                          {currentProvider.maintenanceCount} Jobs
                        </span>
                      </div>
                      
                      {currentProvider.maintenanceCount > 0 ? (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm p-2 bg-white rounded border border-slate-200">
                            <div>
                              <p className="font-medium">Vehicle ID: TRK-2023-042</p>
                              <p className="text-slate-500">Oil Change & Filter Replacement</p>
                            </div>
                            <div className="text-right">
                              <p>{currentProvider.lastService}</p>
                              <p className="text-green-600 font-medium">Completed</p>
                            </div>
                          </div>
                          
                          {currentProvider.maintenanceCount > 1 && (
                            <Button variant="outline" size="sm" className="w-full">
                              <Calendar className="mr-2 h-4 w-4" />
                              View All Maintenance Records
                            </Button>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-500 text-center py-2">
                          No maintenance records yet
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-medium mb-2">Service Documentation</h3>
                    <div className="border border-dashed rounded-lg p-6 bg-slate-50 flex flex-col items-center justify-center text-center">
                      <Upload className="h-8 w-8 text-slate-400 mb-2" />
                      <p className="text-sm text-slate-600">Drop service pricing sheet or click to upload</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Document
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    openEditDialog(currentProvider);
                  }}
                >
                  Edit Provider
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServiceProviders;
