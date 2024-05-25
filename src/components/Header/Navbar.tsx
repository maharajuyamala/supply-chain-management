// Navbar.tsx
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import LoginForm from "../Login/Login";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { inventoryActions } from "../../Redux/Reducers";
import { IoMdArrowDropup } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import ParentContainer from "../ParentContainer/ParentContainer";

const Navbar: React.FC = () => {
  interface Menu {
    label: string;
    link: string;
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menu: Menu[] = [
    { label: "Inventory", link: "/inventory" },
    { label: "Shipments", link: "/shipments" },
    { label: "Suppliers", link: "/suppliers" },
  ];
  const path = window.location.pathname;
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  useEffect(() => {
    if (email == "admin@gmail.com") {
      dispatch(inventoryActions.SET_ADMIN(true));
    }
  }, [email]);
  const [tooltip, setTooltip] = useState(false);
  return (
    <nav className="fixed top-0 w-full bg-gray-800 py-4">
      <ParentContainer>
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center gap-3 font-semibold text-white">
                <img src="/favicon.ico" alt="" className="h-8" />
                Flow Link
              </div>
            </div>{" "}
            <div className="flex items-center gap-5 md:hidden">
              <div
                className={classNames(
                  " flex w-fit items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 shadow-inner	 hover:text-white md:w-fit",
                )}
              >
                <CgProfile />
                {email}
              </div>
              {/* Hamburger menu button */}
              <div>
                {isOpen ? (
                  <FaTimes onClick={toggleMenu} className="cursor-pointer text-white" />
                ) : (
                  <FaBars onClick={toggleMenu} className="cursor-pointer text-white" />
                )}
              </div>
            </div>
            <div className={`  hidden md:flex md:items-center`}>
              {menu?.map((item, index: number) => (
                <a
                  href={item?.link}
                  key={index}
                  className={classNames(
                    "w-full rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white md:w-fit",
                    path == item?.link && "bg-gray-700",
                  )}
                >
                  {item?.label}
                </a>
              ))}
              {email ? (
                <div className="relative">
                  <div
                    className={classNames(
                      "ml-2 flex w-full cursor-pointer items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 shadow-inner	 hover:text-white md:w-fit",
                    )}
                    onClick={() => {
                      setTooltip(true);
                    }}
                  >
                    <CgProfile />
                    {email}
                  </div>
                  {tooltip && (
                    <div className="absolute shadow-xl">
                      <div
                        className="fixed bottom-0 left-0 right-0 top-0 h-full w-full bg-transparent"
                        onClick={() => {
                          setTooltip(false);
                        }}
                      ></div>
                      <div
                        className="relative w-[200px] cursor-pointer bg-white px-4 py-2 "
                        onClick={() => {
                          localStorage.removeItem("email");
                          window.location.reload();
                          setTooltip(false);
                        }}
                      >
                        <IoMdArrowDropup className="absolute top-[-15px] text-2xl text-white" />
                        <div>Logout</div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className={classNames(
                    "w-full rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white md:w-fit",
                  )}
                  onClick={() => setIsLoginFormOpen(true)}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${
            isOpen ? "flex-col" : "hidden"
          }  absolute left-0 right-0 top-[67px] z-40 flex w-full flex-col bg-gray-600 py-2 md:items-center`}
        >
          {menu?.map((item, index: number) => (
            <a
              href={item?.link}
              key={index}
              className={classNames(
                "w-full rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white md:w-fit",
                path == item?.link && "bg-gray-700",
              )}
            >
              {item?.label}
            </a>
          ))}
          {email ? (
            <button
              className={classNames(
                "w-full cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white md:w-fit",
              )}
              onClick={() => {
                localStorage.removeItem("email");
                window.location.reload();
              }}
            >
              Log out
            </button>
          ) : (
            <button
              className={classNames(
                "w-full rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-white md:w-fit",
              )}
              onClick={() => setIsLoginFormOpen(true)}
            >
              Login
            </button>
          )}
        </div>
      </ParentContainer>
      {isLoginFormOpen && createPortal(<LoginForm onClose={() => setIsLoginFormOpen(false)} />, document.body)}
    </nav>
  );
};

export default Navbar;
