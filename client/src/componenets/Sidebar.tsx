import { NavLink } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-100">
      <div className="h-16 flex items-center px-6 ">
        <h1 className="text-xl font-semibold text-gray-800">BackTesting</h1>
      </div>
      <nav className="p-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-indigo-100' : 'hover:bg-indigo-100'
            }`
          }
        >
          <LuLayoutDashboard className="h-5 w-5 text-gray-800" />
          <span className="text-gray-800">Dashboard</span>
        </NavLink>
        <NavLink
          to="/backtesting"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-indigo-100' : 'hover:bg-indigo-100'
            }`
          }
        >
          
          
          <IoIosArrowDown className="h-5 w-5 text-gray-800" />
          <span className="text-gray-800">BackTesting</span>
        </NavLink>
        <NavLink
          to="/AllBucket"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-2 rounded-lg ${
              isActive ? 'bg-indigo-100' : 'hover:bg-indigo-100'
            }`
          }
        >
          
          
          <IoIosArrowDown className="h-5 w-5 text-gray-800" />
          <span className="text-gray-800">AllBucket</span>
        </NavLink>
        
      </nav>
    </aside>
  );
};

export default Sidebar;