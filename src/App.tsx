import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryList from "./components/Inventory/InventoryList";
function App() {
  return (
    <Provider store={store}>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<InventoryList />} />
          </Routes>
        </Router>
      </>
    </Provider>
  );
}

export default App;
