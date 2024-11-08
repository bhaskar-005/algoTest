import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Dashboard from "./pages/Dashboard";
import Backtest from "./pages/Backtest";
import Bucket from './pages/bucket';
import ShowBucket from "./pages/ShowBucket";
import ImportFeature from './pages/importFeature'
import AllBucket from "./pages/AllBucket";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<div>home page</div>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bucket" element={<Bucket />} />
            <Route path="showbucket/:bucketName" element={<ShowBucket/>} />
            <Route path="AllBucket" element={<AllBucket/>} />
          
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
