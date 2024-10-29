import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Backtest from "./pages/Backtest";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<div>home page</div>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="backtesting" element={<Backtest />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
