import React, { useState } from "react";
import { filteredItems } from "../../LocalStorage/GlobalFunctions";

const MultiSearchInput = ({ columns, setFilteredData, data, orginalData }: any) => {
  const placeholderText = `Search by ${columns.join(", ")}`;
  const handleSearch = (value: any) => {
    setQury(value);
    window.history.pushState(null, "", `?${value.length > 0 ? `search=${value}` : ""}`);
    setFilteredData(filteredItems(data, value));
  };
  const params = new URLSearchParams(window.location.search);
  const [query, setQury] = useState(params.get("search"));

  React.useEffect(() => {
    console.log("Rtgfdcx");
    const params = new URLSearchParams(window.location.search);
    if (params.get("search")) {
      setFilteredData(filteredItems(data, params.get("search")));
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
