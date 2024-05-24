import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryList from "./Pages/Inventory/InventoryList";
import ShipmentList from "./Pages/Shipments/ShipmentsList";
import SupplierList from "./Pages/SupplierList/SupplierList";
import Navbar from "./components/Header/Navbar";
import ParentContainer from "./components/ParentContainer/ParentContainer";
function App() {
  return (
    <Provider store={store}>
      <>
        <Navbar />
        <div className="mt-20">
          <ParentContainer>
            <Router>
              <Routes>
                <Route path="/" element={<InventoryList />} />
                <Route path="/inventory" element={<InventoryList />} />
                <Route path="/shipments" element={<ShipmentList />} />
                <Route path="/suppliers" element={<SupplierList />} />
              </Routes>
            </Router>
          </ParentContainer>
        </div>
      </>
    </Provider>
  );
}

export default App;
