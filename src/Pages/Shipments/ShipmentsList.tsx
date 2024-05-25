// InventoryList.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { inventoryActions } from "../../Redux/Reducers";
import DataTable from "../../components/Table";
import MultiSearchInput from "../../components/MultiSearchComp/MultiSearchInput";
import { InventoryItem, ShipmentItem, SupplierItem } from "../../components/Types";

type EditableItem = ShipmentItem;

interface DataTableProps {
  data: EditableItem[];
  columns: string[];
  onAdd: (item: EditableItem) => void;
  onEdit: (item: EditableItem) => void;
  onDelete: (id: number) => void;
  statusOptions?: string[];
  initialState: string[];
}

const InventoryList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<{ [key: string]: string } | null>(null);
  const [newItemValues, setNewItemValues] = useState<{ [key: string]: string } | null>(null);

  const dispatch = useDispatch();
  const { shipmentsItems } = useSelector((state: RootState) => state);
  console.log(shipmentsItems);

  const handleSave = (data: ShipmentItem) => {
    console.log(data);
    dispatch(inventoryActions.UPDATE_SHIPMENT(data));
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleAddNewItem = (data: InventoryItem | SupplierItem | ShipmentItem) => {
    console.log(data);
    dispatch(inventoryActions.ADD_SHIPMENT({ addItems: data }));
    setNewItemValues(null);
  };

  const handleDelete = (itemId: number) => {
    dispatch(inventoryActions.REMOVE_SHIPMENT({ removeItemId: itemId }));
  };
  const columns = ["shipment ID", "origin", "destination", "status"];
  const [filteredData, setFilteredData] = useState<ShipmentItem[]>(shipmentsItems);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Shipment List</h2>
        <MultiSearchInput columns={columns} setFilteredData={setFilteredData} data={shipmentsItems} />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleSave}
        onDelete={handleDelete}
        statusOptions={["In Transit", "Delivered", "Delayed"]}
        initialState={["id", "origin", "destination", "status", "estimatedDelivery"]}
      />
    </div>
  );
};

export default InventoryList;
