import React, { useState } from "react";
import { filteredItems } from "../../LocalStorage/GlobalFunctions";
import { InventoryItem, ShipmentItem, SupplierItem } from "../Types";
interface MultiSearchInputProps {
  columns: string[];
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
  data: InventoryItem[] | ShipmentItem[] | SupplierItem[];
}

const MultiSearchInput: React.FC<MultiSearchInputProps> = ({ columns, setFilteredData, data }) => {
  const placeholderText = `Search by ${columns.join(", ")}`;
  const handleSearch = (value: string) => {
    setQury(value);
    window.history.pushState(null, "", `?${value.length > 0 ? `search=${value}` : ""}`);
    setFilteredData(filteredItems(data, value));
  };
  const params = new URLSearchParams(window.location.search);
  const [query, setQury] = useState(params.get("search"));

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("search")) {
      setFilteredData(filteredItems(data, params.get("search") || ""));
    } else {
      setFilteredData(data);
    }
  }, [data]);
  return (
    <div className="flex">
      <input
        type="text"
        value={query || ""}
        placeholder={placeholderText}
        onChange={(e) => {
          handleSearch(e?.target?.value);
        }}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 md:w-[40svw]"
      />
    </div>
  );
};

export default MultiSearchInput;
