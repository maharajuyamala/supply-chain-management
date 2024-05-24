// InventoryList.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { inventoryActions } from "../../Redux/Reducers";
import InventoryItemComponent from "./InventoryItem";
import DataTable from "../Table";

const InventoryList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<any>({
    id: 0,
    name: "",
    sku: "",
    quantity: 0,
    warehouse: "",
  });
  const [newItemValues, setNewItemValues] = useState<any>({
    id: 0,
    name: "",
    sku: "",
    quantity: 0,
    warehouse: "",
  });

  const dispatch = useDispatch();
  const { inventoryItems } = useSelector((state: any) => state);

  const handleEdit = (itemId: any) => {
    setEditingItemId(itemId);
    const itemToEdit = inventoryItems.find((item: any) => item.id === itemId);
    if (itemToEdit) {
      setEditItemValues({ ...itemToEdit });
    }
  };

  const handleSave = () => {
    dispatch(
      inventoryActions.UPDATE_INVENTORY({ updatedItem: editItemValues })
    );
    setEditingItemId(null);
    setEditItemValues({
      id: 0,
      name: "",
      sku: "",
      quantity: 0,
      warehouse: "",
    });
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues({
      id: 0,
      name: "",
      sku: "",
      quantity: 0,
      warehouse: "",
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof any
  ) => {
    setEditItemValues({
      ...editItemValues,
      [fieldName]: event.target.value,
    });
  };

  const handleNewInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof any
  ) => {
    setNewItemValues({
      ...newItemValues,
      [fieldName]: event.target.value,
    });
  };

  const handleAddNewItem = (data: any) => {
    console.log(data);
    dispatch(inventoryActions.ADD_INVENTORY({ addItems: data }));
    setNewItemValues({
      id: 0,
      name: "",
      sku: "",
      quantity: 0,
      warehouse: "",
    });
  };

  const handleDelete = (itemId: number) => {
    dispatch(inventoryActions.REMOVE_INVENTORY({ removeItemId: itemId }));
  };
  const columns = ["ID", "item name", "SKU", "quantity", "warehouse"];

  return (
    <div>
      <h2>Inventory List</h2>
      <DataTable
        data={inventoryItems}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default InventoryList;
