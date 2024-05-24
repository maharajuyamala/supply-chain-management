import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const InventoryList: React.FC = () => {
  const { inventoryItems } = useSelector((state: RootState) => state);
  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventoryItems.map((item: any) => (
          <code>
            <pre>{JSON.stringify(item, null, 2)}</pre>
          </code>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
