
export interface UsageRecord {
  date: string;
  quantity: number;
  maintenanceId: string;
  vehicle: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  partNumber: string;
  category: string;
  currentStock: number;
  minStockThreshold: number;
  supplier: string;
  supplierContact: string;
  pricePerUnit: number;
  lastPurchaseDate: string;
  imageUrl: string;
  usageHistory: UsageRecord[];
}
