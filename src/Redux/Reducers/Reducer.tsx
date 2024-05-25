import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../LocalStorage";
import { MultiItemType } from "../../components/Types";

export interface InventoryItem {
  id?: number;
  name?: string;
  sku?: string;
  quantity?: number;
  warehouse?: string;
}

export interface ShipmentItem {
  id?: number;
  trackingNumber?: string;
  status?: string;
  // Add other relevant fields
}

export interface SupplierItem {
  id?: number;
  name?: string;
  contact?: string;
  // Add other relevant fields
}

interface InventoryState {
  inventoryItems: InventoryItem[];
  shipmentsItems: ShipmentItem[];
  suppliersItems: SupplierItem[];
  isAdmin?: boolean;
}

interface PayloadAction<T> {
  type: string;
  payload: T;
  error?: boolean;
}

const initialState: InventoryState = {
  inventoryItems: loadState("inventoryItems") || [],
  shipmentsItems: loadState("shipmentsItems") || [],
  suppliersItems: loadState("suppliersItems") || [],
  isAdmin: false,
};

const inventoryReducer = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    SET_ADMIN: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    ADD_INVENTORY: (state, action: PayloadAction<{ addItems: InventoryItem }>) => {
      state.inventoryItems = [...state.inventoryItems, action.payload.addItems];
      saveState("inventoryItems", state.inventoryItems as MultiItemType);
      console.log(state.inventoryItems);
    },
    REMOVE_INVENTORY: (state, action: PayloadAction<{ removeItemId: number }>) => {
      console.log(state.inventoryItems);
      console.log(action.payload.removeItemId);
      state.inventoryItems = state.inventoryItems.filter((item) => item.id !== action.payload.removeItemId);
      console.log(state.inventoryItems);
      saveState("inventoryItems", state.inventoryItems as MultiItemType);
    },
    UPDATE_INVENTORY: (state, action: PayloadAction<InventoryItem>) => {
      const index = state.inventoryItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.inventoryItems[index] = action.payload;
        saveState("inventoryItems", state.inventoryItems as MultiItemType);
      }
    },
    ADD_SUPPLIER: (state, action: PayloadAction<{ addItems: SupplierItem }>) => {
      console.log(action);
      state.suppliersItems = [...state.suppliersItems, action.payload.addItems];
      saveState("suppliersItems", state.suppliersItems as MultiItemType);
    },
    REMOVE_SUPPLIER: (state, action: PayloadAction<{ removeItemId: number }>) => {
      state.suppliersItems = state.suppliersItems.filter((item) => item.id !== action.payload.removeItemId);
      saveState("suppliersItems", state.suppliersItems as MultiItemType);
    },
    UPDATE_SUPPLIER: (state, action: PayloadAction<SupplierItem>) => {
      const index = state.suppliersItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.suppliersItems[index] = action.payload;
        saveState("suppliersItems", state.suppliersItems as MultiItemType);
      }
    },
    ADD_SHIPMENT: (state, action: PayloadAction<{ addItems: ShipmentItem }>) => {
      console.log([...state.shipmentsItems, action.payload.addItems]);
      state.shipmentsItems = [...state.shipmentsItems, action.payload.addItems];
      saveState("shipmentsItems", state.shipmentsItems as MultiItemType);
    },
    REMOVE_SHIPMENT: (state, action: PayloadAction<{ removeItemId: number }>) => {
      state.shipmentsItems = state.shipmentsItems.filter((item) => item.id !== action.payload.removeItemId);
      saveState("shipmentsItems", state.shipmentsItems as MultiItemType);
    },
    UPDATE_SHIPMENT: (state, action: PayloadAction<ShipmentItem>) => {
      const index = state.shipmentsItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.shipmentsItems[index] = action.payload;
        saveState("shipmentsItems", state.shipmentsItems as MultiItemType);
      }
    },
  },
});

export const inventoryActions = inventoryReducer.actions;
export default inventoryReducer.reducer;
