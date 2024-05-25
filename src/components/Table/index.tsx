import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { createPortal } from "react-dom";
import { IoCheckmarkOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { InventoryItem, MultiItemType, ShipmentItem, SupplierItem } from "../Types";

type Element = ShipmentItem | SupplierItem | InventoryItem;
interface DataTableProps<T> {
  data: any[];
  columns: string[];
  onAdd: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  statusOptions?: string[];
  initialState: string[];
}

export interface EditableItem {
  id: number;
  [key: string]: any;
}

const DataTable = <T extends EditableItem>(props: DataTableProps<T>) => {
  const { data, columns, onAdd, onEdit, onDelete, statusOptions = [], initialState } = props;
  const itemsPerPage = 5;
  const { isAdmin } = useSelector((state: RootState) => state);
  const columnsCount = isAdmin ? 1 : 0;
  const gridTemplateColumns = `repeat(${columns.length + columnsCount}, minmax(100px, 1fr))`;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (!params.get("page")) {
      setCurrentPage(1);
      params?.set("page", "1");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);
  const [paginationPages, setPaginationPages] = useState(data);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editItemValues, setEditItemValues] = useState<Partial<T>>({});
  const [newItemValues, setNewItemValues] = useState<Partial<T>>({});
  const [addPopUp, setAddPopUp] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(JSON.parse(params.get("page") || "1"));
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ id: number | null; open: boolean }>({
    id: null,
    open: false,
  });

  useEffect(() => {
    console.log(data);
    console.log(currentPage);
    setPaginationPages(data.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage));
    if (data.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage).length == 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
      params.set("page", JSON.stringify(currentPage - 1));
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, [currentPage, data]);

  const handleEdit = (item: Element) => {
    setEditingItemId(item.id as number);
    setEditItemValues(item as Partial<T>);
  };

  const handlePagination = (item: number) => {
    setCurrentPage(item);
    params.set("page", JSON.stringify(item));
    const newUrl = `${window.location.pathname}?${params.toString()}`;
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditItemValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleNewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewItemValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleAddNewItem = () => {
    onAdd(newItemValues as T);
    setNewItemValues({});
    setAddPopUp(false);
  };

  // const handleDelete = (id: number) => {
  //   onDelete(id);
  // };

  const handleDelete = (id: number) => {
    setDeleteConfirmation({ id, open: true });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.id !== null) {
      onDelete(deleteConfirmation.id);
      setDeleteConfirmation({ id: null, open: false });
    }
  };

  const renderCell = (item: MultiItemType, column: string, index: number) => {
    const key = Object.keys(item)[index];
    if (editingItemId === item.id) {
      if (key === "status" && statusOptions.length) {
        return (
          <select
            name={key as string}
            value={(editItemValues[key] as string) || ""}
            onChange={handleInputChange}
            className="w-full text-left"
          >
            {statusOptions.map((option) => (
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
          name={key as string}
          value={(editItemValues[key] as string) || ""}
          onChange={handleInputChange}
          className="w-full text-left"
        />
      );
    }
    return <span>{(item as T)[key]}</span>;
  };

  return (
    <div className="flex h-[50svh] flex-col justify-between py-4">
      <div>
        <div className="overflow-x-auto">
          <div className="grid" style={{ gridTemplateColumns }}>
            {columns.map((column, index) => (
              <div key={index} className="border-b border-gray-200 bg-gray-100 px-4 py-2 text-left">
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </div>
            ))}
            {isAdmin && <div className="border-b border-gray-200 bg-gray-100 px-4 py-2 text-left">Actions</div>}
          </div>
          {data.length > 0 ? (
            paginationPages.map((item: MultiItemType, index) => (
              <div key={`${item.id}_${index}`} className="grid" style={{ gridTemplateColumns }}>
                {columns.map((column, index) => (
                  <div key={column} className="overflow-x-hidden border-b border-gray-200 px-4 py-2 text-left">
                    {renderCell(item, column, index)}
                  </div>
                ))}
                {isAdmin && (
                  <div className="border-b border-gray-200 px-4 py-2 text-left">
                    {editingItemId === item.id ? (
                      <div className="flex gap-3">
                        <button onClick={handleSave} className="mr-2 rounded py-1 text-black">
                          <IoCheckmarkOutline />
                        </button>
                        <button onClick={handleCancel} className="mr-2 rounded py-1 text-black">
                          <RxCross1 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(item)} className="mr-2 rounded py-1 text-black">
                          <BiEditAlt />
                        </button>
                        <button onClick={() => handleDelete(item.id as number)} className="rounded py-1 text-black">
                          <MdDeleteOutline />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="w-full py-6 text-center">No Records</div>
          )}
        </div>

        <div className="mt-4">
          {isAdmin && (
            <div className="items-center md:flex">
              <button
                onClick={() => setAddPopUp(true)}
                className="h-full rounded bg-gray-500 px-3 py-1 text-white hover:bg-gray-600"
              >
                + Create
              </button>
            </div>
          )}
          {addPopUp &&
            createPortal(
              <div
                className="px-auto parent fixed bottom-0 left-0 right-0 z-[101] flex h-screen items-end justify-center bg-black bg-opacity-50 pt-[4px] md:top-0 md:items-center md:bg-gray-900 md:bg-opacity-25 md:pt-0"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();
                  setAddPopUp(false);
                }}
              >
                <div
                  className="m-auto w-[80%] rounded-lg bg-white p-6 md:w-[40%]"
                  onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                    event.stopPropagation();
                  }}
                >
                  {initialState.map((column) => {
                    return column === "status" ? (
                      <select
                        name={column}
                        key={column}
                        value={(newItemValues as T)[column] || ""}
                        onChange={handleNewInputChange}
                        className="mb-2 mr-2 rounded border border-gray-300 p-2"
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
                        value={(newItemValues as T)[column] || ""}
                        onChange={handleNewInputChange}
                        className="mb-2 mr-2 w-full rounded border border-gray-300 p-2"
                      />
                    );
                  })}
                  <div
                    className="w-fit cursor-pointer rounded-lg border px-2 py-1 opacity-75 hover:bg-gray-100"
                    onClick={handleAddNewItem}
                  >
                    Create
                  </div>
                </div>
              </div>,
              document.body,
            )}
          {deleteConfirmation.open && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
              onClick={() => setDeleteConfirmation({ ...deleteConfirmation, open: false })}
            >
              <div className="rounded-lg bg-white p-6">
                <p className="text-lg">Are you sure you want to delete this item?</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="mr-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    onClick={handleDeleteConfirm}
                  >
                    Yes
                  </button>
                  <button
                    className="rounded bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
                    onClick={() => setDeleteConfirmation({ ...deleteConfirmation, open: false })}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {totalPages >= 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePagination} />
      )}
    </div>
  );
};

export default DataTable;
