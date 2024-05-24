import React, { useState } from "react";
import { filteredItems } from "../../LocalStorage/GlobalFunctions";

const MultiSearchInput = ({ columns, setFilteredData, data }: any) => {
  const placeholderText = `Search by ${columns.join(", ")}`;
  const handleSearch = (value: any) => {
    setQury(value);
    window.history.pushState(
      null,
      "",
      `?${value.length > 0 ? `search=${value}` : ""}`
    );
    setFilteredData(filteredItems(data, value));
  };
  const params = new URLSearchParams(window.location.search);
  const [query, setQury] = useState(params.get("search"));

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilteredData(filteredItems(data, params.get("search")));
  }, []);
  return (
    <div className="px-5  flex">
      <input
        type="text"
        value={query || ""}
        placeholder={placeholderText}
        onChange={(e) => {
          handleSearch(e?.target?.value);
        }}
        className="w-full md:w-[40svw] px-3 py-2 border border-gray-300 rounded-lg"
      />
    </div>
  );
};

export default MultiSearchInput;
