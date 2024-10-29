import { LuBellDot } from "react-icons/lu";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 ">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1">
          <input
            type="search"
            placeholder="Search strategy, bucket, market, or results"
            className="w-96 px-4 py-2 rounded-lg bg-gray-100"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-indigo-100">
            <LuBellDot  className="h-5 w-5 text-gray-800" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-200"></div>
            <span className="text-gray-800">Abhishek</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;