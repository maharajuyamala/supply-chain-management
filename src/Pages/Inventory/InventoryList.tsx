import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InventoryItem, inventoryActions } from "../../Redux/Reducers";
import DataTable, { EditableItem } from "../../components/Table";
import MultiSearchInput from "../../components/MultiSearchComp/MultiSearchInput";
import { RootState } from "../../Redux/store";
import { ShipmentItem } from "../../components/Types";

const InventoryList: React.FC = () => {
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<InventoryItem | null>({
    id: 0,
    name: "",
    sku: "",
    quantity: 0,
    warehouse: "",
  });
  const [newItemValues, setNewItemValues] = useState<InventoryItem>({
    id: 0,
    name: "",
    sku: "",
    quantity: 0,
    warehouse: "",
  });

  const dispatch = useDispatch();
  const { inventoryItems } = useSelector((state: RootState) => state);

  const handleSave = (data: InventoryItem) => {
    dispatch(inventoryActions.UPDATE_INVENTORY(data));
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleAddNewItem = (data: InventoryItem) => {
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

  const [filteredData, setFilteredData] = useState<InventoryItem[]>(inventoryItems);
  // Convert inventoryItems to EditableItem[]
  const editableInventoryItems: EditableItem[] = inventoryItems.map((item) => ({
    id: item.id || 0,
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    warehouse: item.warehouse,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Inventory List</h2>
        <MultiSearchInput columns={columns} setFilteredData={setFilteredData} data={inventoryItems} />
      </div>
      <DataTable
        data={editableInventoryItems}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleSave}
        onDelete={handleDelete}
        initialState={["id", "name", "sku", "quantity", "warehouse"]}
      />
    </div>
  );
};

export default InventoryList;
