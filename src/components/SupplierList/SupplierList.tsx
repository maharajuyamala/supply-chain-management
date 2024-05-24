import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import SupplierItemComponent from "./SupplierItem";

const SupplierList: React.FC = () => {
  const { suppliersItems } = useSelector((state: RootState) => state);
  return (
    <div>
      <h2>Supplier List</h2>
      <ul>
        {suppliersItems.map((supplier: any) => (
          <SupplierItemComponent key={supplier.id} supplier={supplier} />
        ))}
      </ul>
    </div>
  );
};

export default SupplierList;
