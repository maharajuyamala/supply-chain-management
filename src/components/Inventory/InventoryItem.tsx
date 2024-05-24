// InventoryItem.tsx
import React from "react";
import { InventoryItem } from "../../Redux/Reducers";

interface InventoryItemProps {
  item: InventoryItem;
  isEditing: boolean;
  editItemValues: InventoryItem;
  onEdit: (id: number) => void;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof InventoryItem
  ) => void;
  onDelete: (id: number) => void;
}

const InventoryItemComponent: React.FC<InventoryItemProps> = ({
  item,
  isEditing,
  editItemValues,
  onEdit,
  onSave,
  onCancel,
  onInputChange,
  onDelete,
}) => {
  return (
    <tr>
      {isEditing ? (
        <>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={editItemValues.id}
              disabled
              className="border rounded px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={editItemValues.name}
              onChange={(e) => onInputChange(e, "name")}
              className="border rounded px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={editItemValues.sku}
              onChange={(e) => onInputChange(e, "sku")}
              className="border rounded px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="number"
              value={editItemValues.quantity}
              onChange={(e) => onInputChange(e, "quantity")}
              className="border rounded px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <input
              type="text"
              value={editItemValues.warehouse}
              onChange={(e) => onInputChange(e, "warehouse")}
              className="border rounded px-2 py-1"
            />
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={onSave}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.sku}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
          <td className="px-6 py-4 whitespace-nowrap">{item.warehouse}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button
              onClick={() => onEdit(item.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default InventoryItemComponent;
