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
  const { suppliersItems } = useSelector((state: RootState) => state);

  const handleEdit = (itemId: any) => {
    setEditingItemId(itemId);
    const itemToEdit = suppliersItems.find((item: any) => item.id === itemId);
    if (itemToEdit) {
      setEditItemValues({ ...itemToEdit });
    }
  };

  const handleSave = (data: any) => {
    dispatch(inventoryActions.UPDATE_SUPPLIER(data));
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
    dispatch(inventoryActions.ADD_SUPPLIER({ addItems: data }));
    setNewItemValues(null);
  };

  const handleDelete = (itemId: number) => {
    dispatch(inventoryActions.REMOVE_SUPPLIER({ removeItemId: itemId }));
  };

  const columns = [
    "id",
    "supplier name",
    "contact person",
    "phone number",
    "email address",
  ];
  const [filteredData, setFilteredData] = useState(suppliersItems);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold px-5">Supplier List</h2>
        <MultiSearchInput
          columns={columns}
          setFilteredData={setFilteredData}
          data={suppliersItems}
        />
      </div>
      <DataTable
        data={filteredData}
        columns={columns}
        onAdd={handleAddNewItem}
        onEdit={handleSave}
        onDelete={handleDelete}
        initialState={["id", "name", "contactPerson", "phone", "email"]}
      />
    </div>
  );
};

export default InventoryList;
