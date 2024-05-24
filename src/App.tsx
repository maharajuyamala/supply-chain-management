import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryList from "./components/Inventory/InventoryList";
import ShipmentList from "./components/Shipments/ShipmentsList";
import SupplierList from "./components/SupplierList/SupplierList";
import Navbar from "./components/Header/Navbar";
function App() {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<InventoryList />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/shipments" element={<ShipmentList />} />
            <Route path="/suppliers" element={<SupplierList />} />
          </Routes>
        </Router>
      </>
    </Provider>
  );
}

export default App;
