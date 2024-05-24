import React from "react";

export interface ShipmentItem {
  id: string;
  origin: string;
  destination: string;
  status: number;
  estimatedDelivery: string;
}

interface ShipmentItemProps {
  shipment: ShipmentItem;
}

const ShipmentItemComponent: React.FC<ShipmentItemProps> = ({ shipment }) => {
  return (
    <li>
      {shipment.id} - {shipment.origin} - {shipment.destination} -
      {shipment.status} - {shipment.estimatedDelivery}
    </li>
  );
};

export default ShipmentItemComponent;
