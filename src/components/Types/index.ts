// types.ts
export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  warehouse: string;
}

export interface ShipmentItem {
  id: number;
  origin: string;
  destination: string;
  status: string;
  estimatedDelivery: string;
}

export interface SupplierItem {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
}
