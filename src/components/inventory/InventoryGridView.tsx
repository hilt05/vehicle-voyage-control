
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InventoryItem } from "./types";
import { Package } from "lucide-react";

interface InventoryGridViewProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
}

const InventoryGridView = ({ items, onEdit }: InventoryGridViewProps) => {
  // Default placeholder image for parts without an image
  const defaultImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_18dda25d93c%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_18dda25d93c%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23eeeeee%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22106.5%22%20y%3D%2296.3%22%3EPart%20Image%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.length > 0 ? (
        items.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Package size={40} />
                  <span className="mt-2 text-sm">{item.partNumber}</span>
                </div>
              )}
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                {item.currentStock === 0 ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Out
                  </span>
                ) : item.currentStock <= item.minStockThreshold ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                    Low
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    In Stock
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-500 mb-1">
                <span className="font-medium text-gray-700">{item.category}</span> • {item.partNumber}
              </div>
              
              <div className="mt-3 space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Stock:</span>
                  <span className="text-sm font-medium">{item.currentStock}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="text-sm font-medium">${item.pricePerUnit.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Supplier:</span>
                  <span className="text-sm font-medium line-clamp-1">{item.supplier}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="p-4 pt-0 flex justify-end">
              <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex items-center justify-center h-48 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <div className="text-center">
            <Package className="mx-auto h-10 w-10 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No parts found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryGridView;
