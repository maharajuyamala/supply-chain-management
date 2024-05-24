import React from "react";

export interface supplierItem {
  id: string;
  name: string;
  contactPerson: string;
  phone: number;
  email: string;
}

interface supplierItemProps {
  supplier: supplierItem;
}

const SupplierItemComponent: React.FC<supplierItemProps> = ({ supplier }) => {
  return (
    <li>
      {supplier.name} - {supplier.contactPerson} - {supplier.phone} -{" "}
      {supplier.email}
    </li>
  );
};

export default SupplierItemComponent;
