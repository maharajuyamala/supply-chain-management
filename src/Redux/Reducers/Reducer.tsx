import { createSlice } from "@reduxjs/toolkit";
import { loadState, saveState } from "../../LocalStorage";
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
  inventoryItems: loadState("inventoryItems") || [],
  shipmentsItems: loadState("shipmentsItems") || [],
  suppliersItems: loadState("suppliersItems") || [],
};

const inventoryReducer = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    ADD_INVENTORY: (state, action) => {
      state.inventoryItems = [...state.inventoryItems, action.payload.addItems];
      saveState("inventoryItems", state.inventoryItems);
      console.log(state.inventoryItems);
    },
    REMOVE_INVENTORY(state, action: PayloadAction<{ removeItemId: any }>) {
      console.log(state.inventoryItems);
      console.log(action.payload.removeItemId);
      state.inventoryItems = state.inventoryItems.filter(
        (item: any) => item.id != action.payload.removeItemId.id,
      );
      console.log(state.inventoryItems);

      saveState("inventoryItems", state.inventoryItems);
    },
    UPDATE_INVENTORY(state, action) {
      const index = state.inventoryItems.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.inventoryItems[index] = action.payload;
        saveState("inventoryItems", state.inventoryItems);
      }
    },
    ADD_SUPPLIER: (state, action) => {
      console.log(action);
      state.suppliersItems = [...state.suppliersItems, action.payload.addItems];
      saveState("suppliersItems", state.suppliersItems);
    },
    REMOVE_SUPPLIER(state, action: PayloadAction<{ removeItemId: number }>) {
      const removeSupplier = state.suppliersItems.filter(
        (item: any) => item.id != action.payload.removeItemId,
      );
      state.suppliersItems = removeSupplier;
      saveState("suppliersItems", removeSupplier);
    },
    UPDATE_SUPPLIER(state, action) {
      const index = state.suppliersItems.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.suppliersItems[index] = action.payload;
        saveState("suppliersItems", state.suppliersItems);
      }
    },
    ADD_SHIPMENT: (state, action) => {
      console.log([...state.shipmentsItems, action.payload.addItems]);
      state.shipmentsItems = [...state.shipmentsItems, action.payload.addItems];

      saveState("shipmentsItems", state.shipmentsItems);
    },
    REMOVE_SHIPMENT(state, action: PayloadAction<{ removeItemId: number }>) {
      state.shipmentsItems = state.shipmentsItems.filter(
        (item: any) => item.id !== action.payload.removeItemId,
      );

      saveState("shipmentsItems", state.shipmentsItems);
    },
    UPDATE_SHIPMENT(state, action) {
      const index = state.shipmentsItems.findIndex(
        (item: any) => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.shipmentsItems[index] = action.payload;
        saveState("shipmentsItems", state.shipmentsItems);
      }
    },
  },
});
export const inventoryActions = inventoryReducer.actions;
export default inventoryReducer.reducer;
