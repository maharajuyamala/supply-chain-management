import { InventoryItem, MultiItemType, ShipmentItem, SupplierItem } from "../components/Types";

export const loadState = (name: string) => {
  try {
    const serializedState = localStorage.getItem(name);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (name: string, state: MultiItemType) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(name, serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
