// InventoryList.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { inventoryActions } from "../../Redux/Reducers";
import DataTable from "../../components/Table";
import MultiSearchInput from "../../components/MultiSearchComp/MultiSearchInput";

const InventoryList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<any>(null);
  const [newItemValues, setNewItemValues] = useState<any>(null);

  const dispatch = useDispatch();
  const { shipmentsItems } = useSelector((state: RootState) => state);
  console.log(shipmentsItems);
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
  const [filteredData, setFilteredData] = useState(shipmentsItems);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold px-5">Shipment List</h2>
        <MultiSearchInput
          columns={columns}
          setFilteredData={setFilteredData}
          data={shipmentsItems}
        />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleSave}
        onDelete={handleDelete}
        statusOptions={["In Transit", "Delivered", "Delayed"]}
        initialState={[
          "id",
          "origin",
          "destination",
          "status",
          "estimatedDelivery",
        ]}
      />
    </div>
  );
};

export default InventoryList;