// InventoryList.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inventoryActions } from "../../Redux/Reducers";
import DataTable from "../../components/Table";
import MultiSearchInput from "../../components/MultiSearchComp/MultiSearchInput";

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

  const handleSave = (data: any) => {
    dispatch(inventoryActions.UPDATE_INVENTORY(data));
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof any,
  ) => {
    setEditItemValues({
      ...editItemValues,
      [fieldName]: event.target.value,
    });
  };

  const handleNewInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof any,
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
  const [filteredData, setFilteredData] = useState(inventoryItems);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold px-5">Inventory List</h2>
        <MultiSearchInput
          columns={columns}
          setFilteredData={setFilteredData}
          data={inventoryItems}
        />
      </div>
      <DataTable
        data={filteredData}
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
