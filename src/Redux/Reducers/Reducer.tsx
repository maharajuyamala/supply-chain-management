import { createSlice } from "@reduxjs/toolkit";

type ActionType = {
  loading: boolean;
};

export interface Type {
  inventoryItems: any;
}

const initialState: Type = {
  inventoryItems: [],
};

const inventoryReducer = createSlice({
  name: "inventory",
  initialState: initialState,
  reducers: {
    ADD_INVENTORY: (state, action) => {
      state.inventoryItems = [...state.inventoryItems, action.payload.addItems];
    },
    REMOVE_INVENTORY: (state, action) => {
      state.inventoryItems = state.inventoryItems.filters(
        (item: any) => item.id !== action.payload.removeItemId
      );
    },
  },
});
export const inventoryActions = inventoryReducer.actions;
export default inventoryReducer.reducer;
