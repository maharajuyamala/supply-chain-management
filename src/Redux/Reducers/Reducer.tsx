import { createSlice } from "@reduxjs/toolkit";
export interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity: number;
  warehouse: string;
}

type ActionType = {
  loading: boolean;
};
interface PayloadAction<T> {
  type: string;
  payload: T;
  meta?: any;
  error?: boolean;
}
export interface Type {
  inventoryItems: any;
  shipmentsItems: any;
  suppliersItems: any;
}

const initialState: Type = {
  inventoryItems: [
    {
      id: 1,
      name: "Item 1",
      sku: "SKU001",
      quantity: 100,
      warehouse: "Warehouse A",
    },
    {
      id: 2,
      name: "Item 2",
      sku: "SKU002",
      quantity: 200,
      warehouse: "Warehouse B",
    },
  ],
  shipmentsItems: [
    {
      id: 1,
      origin: "Location A",
      destination: "Location B",
      status: "In Transit",
      estimatedDelivery: "2024-05-25",
    },
    {
      id: 2,
      origin: "Location C",
      destination: "Location D",
      status: "Delivered",
      estimatedDelivery: "2024-05-20",
    },
  ],
  suppliersItems: [
    {
      id: 1,
      name: "Supplier 1",
      contactPerson: "John Doe",
      phone: "123-456-7890",
      email: "john@example.com",
    },
    {
      id: 2,
      name: "Supplier 2",
      contactPerson: "Jane Smith",
      phone: "987-654-3210",
      email: "jane@example.com",
    },
  ],
};

const inventoryReducer = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    ADD_INVENTORY: (state, action) => {
      state.inventoryItems = [...state.inventoryItems, action.payload.addItems];
      console.log([...state.inventoryItems, action.payload.addItems]);
    },
    REMOVE_INVENTORY(state, action: PayloadAction<{ removeItemId: number }>) {
      state.inventoryItems = state.inventoryItems.filter(
        (item: any) => item.id !== action.payload.removeItemId
      );
    },
    UPDATE_INVENTORY(state, action) {
      const index = state.inventoryItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.inventoryItems[index] = action.payload;
      }
    },
    ADD_SUPPLIER: (state, action) => {
      state.suppliersItems = [...state.suppliersItems, action.payload.addItems];
      console.log([...state.inventoryItems, action.payload.addItems]);
    },
    REMOVE_SUPPLIER(state, action: PayloadAction<{ removeItemId: number }>) {
      state.suppliersItems = state.suppliersItems.filter(
        (item: any) => item.id !== action.payload.removeItemId
      );
    },
    UPDATE_SUPPLIER(state, action) {
      const index = state.suppliersItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.suppliersItems[index] = action.payload;
      }
    },
    ADD_SHIPMENT: (state, action) => {
      state.shipmentsItems = [...state.shipmentsItems, action.payload.addItems];
    },
    REMOVE_SHIPMENT(state, action: PayloadAction<{ removeItemId: number }>) {
      state.shipmentsItems = state.shipmentsItems.filter(
        (item: any) => item.id !== action.payload.removeItemId
      );
    },
    UPDATE_SHIPMENT(state, action) {
      const index = state.shipmentsItems.findIndex(
        (item: any) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.shipmentsItems[index] = action.payload;
      }
    },
  },
});
export const inventoryActions = inventoryReducer.actions;
export default inventoryReducer.reducer;
