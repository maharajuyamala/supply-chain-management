import React, { useEffect, useState } from "react";
import { InventoryItem, ShipmentItem, SupplierItem } from "../Types";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { createPortal } from "react-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Pagination from "../Pagination/Pagination";

interface DataTableProps<T> {
  data: T[];
  columns: string[];
  onAdd: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  statusOptions?: string[];
  initialState: string[];
}

const DataTable = <T extends { id: number }>(props: DataTableProps<T>) => {
  const {
    data,
    columns,
    onAdd,
    onEdit,
    onDelete,
    statusOptions = [],
    initialState,
  } = props;
  const itemsPerPage = 5;
  const gridTemplateColumns = `repeat(${
    columns.length + 1
  }, minmax(100px, 1fr))`;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const params = new URLSearchParams(window.location.search);

  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<Partial<T>>({});
  const [newItemValues, setNewItemValues] = useState<Partial<T>>({});
  const [addPopUp, setAddPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState<any>(
    JSON.parse(params.get("page") || "1")
  );

  const handleEdit = (item: T) => {
    setEditingItemId(item.id);
    setEditItemValues(item);
  };
  const handlePagination = (item: number) => {
    setCurrentPage(item);

    params.set("page", JSON.stringify(item));
    const newUrl = `${window?.location?.pathname}?${params.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };
  const handleSave = () => {
    if (editingItemId !== null) {
      onEdit(editItemValues as T);
      setEditingItemId(null);
      setEditItemValues({});
    }
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditItemValues({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditItemValues({
      ...editItemValues,
      [name]: value,
    });
  };

  const handleNewInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewItemValues({
      ...newItemValues,
      [name]: value,
    });
  };

  const handleAddNewItem = () => {
    onAdd(newItemValues as T);
    setNewItemValues({});
    setAddPopUp?.(false);
  };

  const handleDelete = (id: any) => {
    onDelete(id);
  };

  const renderCell = (item: any, column: string, index: number) => {
    const key = Object.keys(item)[index];
    console.log(item[key]);
    if (editingItemId === item.id) {
      if (key === "status") {
        return (
          <select
            name={key}
            value={(editItemValues as any)[key] || ""}
            onChange={handleInputChange}
            className="w-full text-left"
          >
            {statusOptions?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      }
      return (
        <input
          type="text"
          name={key}
          value={(editItemValues as any)[key] || ""}
          onChange={handleInputChange}
          className="w-full text-left"
        />
      );
    } else {
      return <span>{(item as any)[key]}</span>;
    }
  };

  useEffect(() => {
    console.log(
      data.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
        .length
    );
  }, [currentPage]);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <div className="grid" style={{ gridTemplateColumns }}>
          {columns.map((column, index) => (
            <div
              key={index}
              className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left"
            >
              {column.charAt(0).toUpperCase() + column.slice(1)}
            </div>
          ))}
          <div className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left">
            Actions
          </div>
        </div>
        {data?.length > 0 ? (
          data
            .slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage)
            ?.map((item, index) => (
              <div
                key={`${index}_data`}
                className="grid"
                style={{ gridTemplateColumns }}
              >
                {columns.map((column, index) => (
                  <div
                    key={column}
                    className="py-2 px-4 border-b border-gray-200 text-left"
                  >
                    {renderCell(item, "", index)}dfsc
                  </div>
                ))}
                <div className="py-2 px-4 border-b border-gray-200 text-left">
                  {editingItemId === item.id ? (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSave}
                        className="mr-2 text-black py-1 rounded"
                      >
                        <IoCheckmarkOutline />
                      </button>
                      <button
                        onClick={handleCancel}
                        className="mr-2 text-black py-1 rounded"
                      >
                        <RxCross1 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="mr-2 text-black py-1 rounded"
                      >
                        <BiEditAlt />
                      </button>
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className="text-black py-1 rounded"
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
        ) : (
          <div className="py-6 text-center w-full">No Records</div>
        )}
      </div>
      {totalPages >= 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePagination}
        />
      )}
      <div className="mt-4">
        <div className="md:flex items-center">
          <button
            onClick={() => setAddPopUp(true)}
            className="bg-green-500 text-white px-3 py-1 rounded h-full"
          >
            Add
          </button>
        </div>
        {addPopUp &&
          createPortal(
            <div
              className="px-auto parent bg-black bg-opacity-50 fixed bottom-0 left-0 right-0 z-[101] flex h-screen items-end justify-center pt-[4px] md:top-0 md:items-center md:bg-gray-900 md:bg-opacity-25 md:pt-0"
              onClick={(event: any) => {
                event.stopPropagation();
                setAddPopUp?.(false);
              }}
            >
              <div
                className="m-auto w-[80%] md:w-[40%] bg-white p-6 rounded-lg"
                onClick={(event: any) => {
                  event.stopPropagation();
                }}
              >
                {initialState?.map((column: any) => {
                  return column === "status" ? (
                    <select
                      name={column}
                      key={column}
                      value={(newItemValues as any)[column] || ""}
                      onChange={handleNewInputChange}
                      className="mr-2 mb-2 p-2 border border-gray-300 rounded"
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      name={column}
                      key={column}
                      placeholder={column}
                      value={(newItemValues as any)[column] || ""}
                      onChange={handleNewInputChange}
                      className="mr-2 mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                  );
                })}
                <div
                  className="px-2 py-1 border opacity-75 w-fit rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={handleAddNewItem}
                >
                  Create
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    </div>
  );
};

export default DataTable;
