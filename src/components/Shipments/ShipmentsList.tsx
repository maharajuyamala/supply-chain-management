// InventoryList.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { inventoryActions } from "../../Redux/Reducers";
import DataTable from "../Table";

const InventoryList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<any>(null);
  const [newItemValues, setNewItemValues] = useState<any>(null);

  const dispatch = useDispatch();
  const { shipmentsItems } = useSelector((state: RootState) => state);

  const handleEdit = (itemId: any) => {
    setEditingItemId(itemId);
    const itemToEdit = shipmentsItems.find((item: any) => item.id === itemId);
    if (itemToEdit) {
      setEditItemValues({ ...itemToEdit });
    }
  };

  const handleSave = (data: any) => {
    console.log(data);
    dispatch(inventoryActions.UPDATE_SHIPMENT(data));
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues(null);
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
    dispatch(inventoryActions.ADD_SHIPMENT({ addItems: data }));
    setNewItemValues(null);
  };

  const handleDelete = (itemId: number) => {
    dispatch(inventoryActions.REMOVE_SHIPMENT({ removeItemId: itemId }));
  };
  const columns = ["shipment ID", "origin", "destination", "status"];

  return (
    <div>
      <h2>Shipment List</h2>
      <DataTable
        data={shipmentsItems}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleSave}
        onDelete={handleDelete}
        statusOptions={["In Transit", "Delivered", "Delayed"]}
      />
    </div>
  );
};

export default InventoryList;
