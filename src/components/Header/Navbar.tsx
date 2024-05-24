// Navbar.tsx
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
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
          {/* Navbar links */}
          <div
            className={`${
              isOpen ? "block" : "hidden"
            }  md:flex md:items-center`}
          >
            <a
              href="/inventory"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Inventory
            </a>
            <a
              href="/shipments"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Shipments
            </a>
            <a
              href="/suppliers"
              className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Suppliers
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
