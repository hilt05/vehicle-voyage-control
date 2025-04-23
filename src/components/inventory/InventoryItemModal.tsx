
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Upload, Trash2 } from "lucide-react";
import { InventoryItem } from "./types";

interface InventoryItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSave: (item: InventoryItem) => void;
  onDelete: (itemId: string) => void;
}

// Categories for the form
const categories = ["Engine", "Brakes", "Electrical", "Fluids", "Tires", "Other"];

const InventoryItemModal = ({
  isOpen,
  onClose,
  item,
  onSave,
  onDelete
}: InventoryItemModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const isEditing = !!item;
  
  const form = useForm<Omit<InventoryItem, 'id' | 'usageHistory'> & { id?: string }>({
    defaultValues: {
      name: "",
      partNumber: "",
      category: "Engine",
      currentStock: 0,
      minStockThreshold: 0,
      supplier: "",
      supplierContact: "",
      pricePerUnit: 0,
      lastPurchaseDate: new Date().toISOString().split('T')[0],
      imageUrl: ""
    }
  });
  
  // Reset form when item changes
  useEffect(() => {
    if (item) {
      form.reset({
        id: item.id,
        name: item.name,
        partNumber: item.partNumber,
        category: item.category,
        currentStock: item.currentStock,
        minStockThreshold: item.minStockThreshold,
        supplier: item.supplier,
        supplierContact: item.supplierContact,
        pricePerUnit: item.pricePerUnit,
        lastPurchaseDate: item.lastPurchaseDate,
        imageUrl: item.imageUrl
      });
      
      if (item.imageUrl) {
        setImagePreview(item.imageUrl);
      } else {
        setImagePreview(null);
      }
    } else {
      form.reset({
        name: "",
        partNumber: "",
        category: "Engine",
        currentStock: 0,
        minStockThreshold: 0,
        supplier: "",
        supplierContact: "",
        pricePerUnit: 0,
        lastPurchaseDate: new Date().toISOString().split('T')[0],
        imageUrl: ""
      });
      setImagePreview(null);
    }
    setShowDeleteConfirm(false);
  }, [item, form]);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server and get a URL back
      // For now, we'll use a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        form.setValue("imageUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = form.handleSubmit((data) => {
    // Preserve the existing usage history if editing
    const usageHistory = item?.usageHistory || [];
    
    onSave({
      ...data,
      id: item?.id || "",
      usageHistory
    });
  });
  
  const handleDelete = () => {
    if (item?.id) {
      onDelete(item.id);
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Part Details" : "Add New Part"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update the information for this inventory item." 
              : "Fill in the details to add a new part to inventory."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Part name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter part name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="partNumber"
                rules={{ required: "Part number is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Part Number / SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter part number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                        {...field}
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supplier"
                rules={{ required: "Supplier name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter supplier name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="supplierContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Supplier Contact</FormLabel>
                    <FormControl>
                      <Input placeholder="Email or phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="pricePerUnit"
                rules={{ 
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Per Unit ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="currentStock"
                rules={{ 
                  required: "Current stock is required",
                  min: { value: 0, message: "Stock cannot be negative" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Stock</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="minStockThreshold"
                rules={{ 
                  required: "Threshold is required",
                  min: { value: 0, message: "Threshold cannot be negative" }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Min. Stock Threshold</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      System will alert when stock falls below this level
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastPurchaseDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Purchase Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border rounded-md p-4">
              <h3 className="font-medium mb-2">Part Image</h3>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="relative w-24 h-24 border rounded overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Part preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        form.setValue("imageUrl", "");
                      }}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                )}
                
                <div>
                  <label className="cursor-pointer">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                      <Upload className="h-4 w-4" />
                      <span>{imagePreview ? "Change Image" : "Upload Image"}</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="text-xs text-muted-foreground mt-1">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>
            </div>
            
            {isEditing && item?.usageHistory && item.usageHistory.length > 0 && (
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Usage History</h3>
                <div className="max-h-40 overflow-y-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Date</th>
                        <th className="text-left py-2">Quantity</th>
                        <th className="text-left py-2">Vehicle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.usageHistory.map((record, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                          <td className="py-2">{new Date(record.date).toLocaleDateString()}</td>
                          <td className="py-2">{record.quantity}</td>
                          <td className="py-2">{record.vehicle}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex justify-between">
              {isEditing ? (
                <div className="flex gap-2">
                  {!showDeleteConfirm ? (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => setShowDeleteConfirm(true)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                      >
                        Confirm Delete
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div />
              )}
              
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update Part" : "Add Part"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryItemModal;
