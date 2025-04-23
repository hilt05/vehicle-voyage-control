
import React, { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  Package, 
  Download, 
  Upload, 
  Table as TableIcon, 
  Grid2X2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { useToast } from "@/hooks/use-toast";
import InventoryItemModal from "@/components/inventory/InventoryItemModal";
import InventoryGridView from "@/components/inventory/InventoryGridView";
import { InventoryItem } from "@/components/inventory/types";

// Mock data for demonstration
const mockInventoryData: InventoryItem[] = [
  {
    id: "1",
    name: "Oil Filter",
    partNumber: "OF-1234",
    category: "Engine",
    currentStock: 15,
    minStockThreshold: 5,
    supplier: "AutoParts Inc.",
    supplierContact: "contact@autoparts.com",
    pricePerUnit: 12.99,
    lastPurchaseDate: "2025-03-15",
    imageUrl: "",
    usageHistory: [
      { date: "2025-04-10", quantity: 1, maintenanceId: "m123", vehicle: "Toyota Camry (ABC-123)" }
    ]
  },
  {
    id: "2",
    name: "Brake Pad Set",
    partNumber: "BP-5678",
    category: "Brakes",
    currentStock: 4,
    minStockThreshold: 6,
    supplier: "BrakeMasters Co.",
    supplierContact: "sales@brakemasters.com",
    pricePerUnit: 45.50,
    lastPurchaseDate: "2025-02-20",
    imageUrl: "",
    usageHistory: [
      { date: "2025-04-05", quantity: 1, maintenanceId: "m124", vehicle: "Honda Civic (XYZ-789)" }
    ]
  },
  {
    id: "3",
    name: "Windshield Wiper Fluid",
    partNumber: "WWF-9012",
    category: "Fluids",
    currentStock: 25,
    minStockThreshold: 10,
    supplier: "Clean View Supply",
    supplierContact: "orders@cleanview.com",
    pricePerUnit: 3.99,
    lastPurchaseDate: "2025-03-01",
    imageUrl: "",
    usageHistory: []
  },
  {
    id: "4",
    name: "Air Filter",
    partNumber: "AF-3456",
    category: "Engine",
    currentStock: 8,
    minStockThreshold: 5,
    supplier: "AutoParts Inc.",
    supplierContact: "contact@autoparts.com",
    pricePerUnit: 15.99,
    lastPurchaseDate: "2025-03-10",
    imageUrl: "",
    usageHistory: []
  },
  {
    id: "5",
    name: "Spark Plug Set",
    partNumber: "SP-7890",
    category: "Engine",
    currentStock: 6,
    minStockThreshold: 4,
    supplier: "IgnitionTech",
    supplierContact: "info@ignitiontech.com",
    pricePerUnit: 24.99,
    lastPurchaseDate: "2025-01-15",
    imageUrl: "",
    usageHistory: []
  },
  {
    id: "6",
    name: "Transmission Fluid",
    partNumber: "TF-1357",
    category: "Fluids",
    currentStock: 12,
    minStockThreshold: 5,
    supplier: "FluidSystems Ltd.",
    supplierContact: "sales@fluidsystems.com",
    pricePerUnit: 18.50,
    lastPurchaseDate: "2025-03-05",
    imageUrl: "",
    usageHistory: []
  },
  {
    id: "7",
    name: "Tire Set - All Season",
    partNumber: "TS-2468",
    category: "Tires",
    currentStock: 2,
    minStockThreshold: 4,
    supplier: "TireWorld",
    supplierContact: "orders@tireworld.com",
    pricePerUnit: 450.00,
    lastPurchaseDate: "2025-02-01",
    imageUrl: "",
    usageHistory: []
  },
  {
    id: "8",
    name: "Battery 12V",
    partNumber: "BAT-9876",
    category: "Electrical",
    currentStock: 3,
    minStockThreshold: 2,
    supplier: "PowerSource Inc.",
    supplierContact: "support@powersource.com",
    pricePerUnit: 89.99,
    lastPurchaseDate: "2025-01-25",
    imageUrl: "",
    usageHistory: []
  }
];

// Categories for filters
const categories = ["All", "Engine", "Brakes", "Electrical", "Fluids", "Tires", "Other"];
const stockStatusOptions = ["All", "In Stock", "Low Stock", "Out of Stock"];

const PartsInventory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockStatusFilter, setStockStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [inventory, setInventory] = useState<InventoryItem[]>(mockInventoryData);
  
  const itemsPerPage = 5;

  // Filter inventory items based on search and filters
  const filteredItems = useMemo(() => {
    return inventory.filter(item => {
      // Search query filter
      const matchesSearch = 
        searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category filter
      const matchesCategory = 
        categoryFilter === "All" || 
        item.category === categoryFilter;
      
      // Stock status filter
      let matchesStockStatus = true;
      if (stockStatusFilter === "Low Stock") {
        matchesStockStatus = item.currentStock <= item.minStockThreshold && item.currentStock > 0;
      } else if (stockStatusFilter === "Out of Stock") {
        matchesStockStatus = item.currentStock === 0;
      } else if (stockStatusFilter === "In Stock") {
        matchesStockStatus = item.currentStock > item.minStockThreshold;
      }
      
      return matchesSearch && matchesCategory && matchesStockStatus;
    });
  }, [inventory, searchQuery, categoryFilter, stockStatusFilter]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, currentPage]);

  // Handle adding a new item
  const handleAddItem = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };

  // Handle editing an item
  const handleEditItem = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // Handle saving an item (new or edited)
  const handleSaveItem = (item: InventoryItem) => {
    if (item.id) {
      // Update existing item
      setInventory(prev => prev.map(i => i.id === item.id ? item : i));
      toast({
        title: "Part Updated",
        description: `${item.name} has been updated successfully.`
      });
    } else {
      // Add new item
      const newItem = {
        ...item,
        id: Date.now().toString(),
        usageHistory: []
      };
      setInventory(prev => [...prev, newItem]);
      toast({
        title: "Part Added",
        description: `${item.name} has been added to inventory.`
      });
    }
    setIsModalOpen(false);
  };

  // Handle deleting an item
  const handleDeleteItem = (itemId: string) => {
    setInventory(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Part Removed",
      description: "The part has been removed from inventory."
    });
  };

  // Handle exporting data to CSV
  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      "Part Name", 
      "Part Number", 
      "Category", 
      "Current Stock", 
      "Min Stock", 
      "Supplier", 
      "Price", 
      "Last Purchase"
    ].join(",");
    
    const rows = inventory.map(item => [
      `"${item.name}"`,
      `"${item.partNumber}"`,
      `"${item.category}"`,
      item.currentStock,
      item.minStockThreshold,
      `"${item.supplier}"`,
      item.pricePerUnit,
      `"${item.lastPurchaseDate}"`
    ].join(","));
    
    const csvContent = [headers, ...rows].join("\n");
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `inventory_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Inventory data has been exported to CSV."
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Parts & Inventory</h1>
          <Button onClick={handleAddItem}>
            <Package className="mr-2 h-4 w-4" />
            Add New Part
          </Button>
        </div>

        <Card className="mb-6 p-4">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search parts by name, number or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="h-4 w-4" />}
                className="w-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                className="h-10 rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                className="h-10 rounded-md border border-input px-3 py-2 text-sm bg-background"
                value={stockStatusFilter}
                onChange={(e) => setStockStatusFilter(e.target.value)}
              >
                {stockStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              
              <div className="flex border rounded-md overflow-hidden">
                <Button 
                  variant={viewMode === "table" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("table")}
                  className="rounded-none border-0"
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-0"
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>
              
              <Button variant="outline" onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {stockStatusFilter === "Low Stock" && filteredItems.some(item => item.currentStock <= item.minStockThreshold && item.currentStock > 0) && (
            <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 mb-4">
              <p className="font-medium">Low Stock Alert</p>
              <p className="text-sm">Some items are below the minimum stock threshold. Consider reordering soon.</p>
            </div>
          )}
        </Card>

        {viewMode === "table" ? (
          <Card className="mb-6 overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Part Name</TableHead>
                    <TableHead>Part Number</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Last Purchase</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedItems.length > 0 ? (
                    paginatedItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.partNumber}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{item.currentStock}</span>
                            {item.currentStock === 0 ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                Out
                              </span>
                            ) : item.currentStock <= item.minStockThreshold ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                Low
                              </span>
                            ) : null}
                          </div>
                        </TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>${item.pricePerUnit.toFixed(2)}</TableCell>
                        <TableCell>{new Date(item.lastPurchaseDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditItem(item)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        No items found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        ) : (
          <InventoryGridView 
            items={paginatedItems} 
            onEdit={handleEditItem} 
          />
        )}

        {filteredItems.length > itemsPerPage && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        <InventoryItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={currentItem}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />
      </div>
    </div>
  );
};

export default PartsInventory;
