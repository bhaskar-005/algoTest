import { Outlet } from 'react-router-dom';
import Navbar from '../componenets/Navbar';
import Sidebar from '../componenets/Sidebar';

const RootLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 bg-indigo-100 bg-opacity-60">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;