import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import ShipmentItemComponent from "./ShipmentItem";

const ShipmentList: React.FC = () => {
  const { shipmentsItems } = useSelector((state: RootState) => state);
  return (
    <div>
      <h2>Shipment List</h2>
      <ul>
        {shipmentsItems.map((shipment: any) => (
          <ShipmentItemComponent key={shipment.id} shipment={shipment} />
        ))}
      </ul>
    </div>
  );
};

export default ShipmentList;
