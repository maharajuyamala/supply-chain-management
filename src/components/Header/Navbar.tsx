// Navbar.tsx
import classNames from "classnames";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const menu = [
    { label: "Inventory", link: "/inventory" },
    { label: "Shipments", link: "/shipments" },
    { label: "Suppliers", link: "/suppliers" },
  ];
  const path = window.location.pathname;
  console.log(path);
  return (
    <nav className="bg-gray-800 p-4 fixed w-full top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-white font-semibold">Your Logo</span>
          </div>
          {/* Hamburger menu button */}
          <div className="md:hidden">
            {isOpen ? (
              <FaTimes
                onClick={toggleMenu}
                className="text-white cursor-pointer"
              />
            ) : (
              <FaBars
                onClick={toggleMenu}
                className="text-white cursor-pointer"
              />
            )}
          </div>
          <div className={`  md:flex md:items-center hidden`}>
            {menu?.map((item: any, index: number) => (
              <a
                href={item?.link}
                key={index}
                className={classNames(
                  "w-full md:w-fit text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium",
                  path == item?.link && "bg-gray-700"
                )}
              >
                {item?.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "flex-col" : "hidden"
        }  flex flex-col md:items-center absolute top-[55px] w-full left-0 right-0 py-2 z-40 bg-gray-600`}
      >
        <a
          href="/inventory"
          className="w-full md:w-fit text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Inventory
        </a>
        <a
          href="/shipments"
          className="w-full md:w-fit text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Shipments
        </a>
        <a
          href="/suppliers"
          className="text-gray-300 w-full md:w-fit hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Suppliers
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
