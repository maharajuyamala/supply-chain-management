import React, { useState } from "react";
import { InventoryItem, ShipmentItem, SupplierItem } from "../Types";

interface DataTableProps<T> {
  data: T[];
  columns: string[];
  onAdd: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
}

const DataTable = <T extends { id: number }>(props: DataTableProps<T>) => {
  const { data, columns, onAdd, onEdit, onDelete } = props;

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<Partial<T>>({});
  const [newItemValues, setNewItemValues] = useState<Partial<T>>({});

  const handleEdit = (item: T) => {
    setEditingItemId(item.id);
    setEditItemValues(item);
  };

  const handleSave = () => {
    if (editingItemId !== null) {
      onEdit(editItemValues as T);
      setEditingItemId(null);
      setEditItemValues({});
    }
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditItemValues({
      ...editItemValues,
      [name]: value,
    });
  };

  const handleNewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItemValues({
      ...newItemValues,
      [name]: value,
    });
  };

  const handleAddNewItem = () => {
    onAdd(newItemValues as T);
    setNewItemValues({});
  };

  const handleDelete = (id: number) => {
    onDelete(id);
  };

  const renderCell = (item: any, column: string, index: number) => {
    const key = Object.keys(item)[index];
    if (editingItemId === item.id) {
      return (
        <input
          type="text"
          name={key}
          value={(editItemValues as any)[key] || ""}
          onChange={handleInputChange}
          className="w-full text-left"
        />
      );
    } else {
      return <span>{(item as any)[key]}</span>;
    }
  };

  const gridTemplateColumns = `repeat(${columns.length + 1}, minmax(0, 1fr))`;

  return (
    <div className="p-4">
      <div className="grid" style={{ gridTemplateColumns }}>
        {columns.map((column, index) => (
          <div
            key={index}
            className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left"
          >
            {column.charAt(0).toUpperCase() + column.slice(1)}
          </div>
        ))}
        <div className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">
          Actions
        </div>
      </div>
      {data.map((item) => (
        <div key={item.id} className="grid" style={{ gridTemplateColumns }}>
          {columns.map((column, index) => (
            <div
              key={column}
              className="py-2 px-4 border-b border-gray-200 text-left"
            >
              {renderCell(item, column, index)}
            </div>
          ))}
          <div className="py-2 px-4 border-b border-gray-200 text-left">
            {editingItemId === item.id ? (
              <>
                <button
                  onClick={handleSave}
                  className="mr-2 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
      <div className="mt-4">
        <h3>Add New Item</h3>
        {columns.map((column) => (
          <input
            key={column}
            type="text"
            name={column}
            placeholder={column}
            value={(newItemValues as any)[column] || ""}
            onChange={handleNewInputChange}
            className="mr-2 mb-2 p-2 border border-gray-300 rounded"
          />
        ))}
        <button
          onClick={handleAddNewItem}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DataTable;
