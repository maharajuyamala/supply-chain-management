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
    // Set the query state
    setQury(value);
    setFilteredData(filteredItems(data, value));
    // Construct the new URL search params
    const newSearchParams = new URLSearchParams();
    if (value?.length > 0) {
      newSearchParams.set("search", value);
    } else {
      newSearchParams.delete("search");
    }
    newSearchParams.set("page", "1"); // Set page to 1

    // Update the browser history with the new URL
    const newUrl = `${window.location.pathname}?${newSearchParams.toString()}`;
    window.history.pushState(null, "", newUrl);

    // Filter the data based on the new search value and update the filtered data state
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
