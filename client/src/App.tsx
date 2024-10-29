import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Backtest from "./pages/Backtest";
import Dashboard from "./pages/Dashboard";
import ShowBucket from "./pages/ShowBucket";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<div>home page</div>} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="backtesting" element={<Backtest />} />
            <Route path="showbucket" element={<ShowBucket/>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
