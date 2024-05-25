// InventoryList.tsx
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { inventoryActions } from "../../Redux/Reducers";
import DataTable from "../../components/Table";
import MultiSearchInput from "../../components/MultiSearchComp/MultiSearchInput";
import { InventoryItem, MultiItemType, ShipmentItem, SupplierItem } from "../../components/Types";

const InventoryList: React.FC = () => {
  const dispatch = useDispatch();
  const { suppliersItems } = useSelector((state: RootState) => state);

  const handleSave = (data: MultiItemType) => {
    dispatch(inventoryActions.UPDATE_SUPPLIER(data));
  };

  const handleAddNewItem = (data: MultiItemType) => {
    console.log(data);
    dispatch(inventoryActions.ADD_SUPPLIER({ addItems: data }));
  };

  const handleDelete = (itemId: number) => {
    dispatch(inventoryActions.REMOVE_SUPPLIER({ removeItemId: itemId }));
  };

  const columns = ["id", "supplier name", "contact person", "phone number", "email address"];
  const [filteredData, setFilteredData] = useState(suppliersItems);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="px-5 text-2xl font-semibold">Supplier List</h2>
        <MultiSearchInput columns={columns} setFilteredData={setFilteredData} data={suppliersItems} />
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
