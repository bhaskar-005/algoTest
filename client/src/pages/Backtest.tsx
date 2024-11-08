import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import PlayButton from "../assets/PlayButton";

const AddBucket: React.FC = () => {
  const [strategies, setStrategies] = useState<Array<any>>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [buttonDisabled,setButtonDisabled]=useState(false)

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/getStratgeyForBucket", {
          method: "POST",
          headers: {
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDcwMzA5NSwiZXhwIjoxNzMxNTY3MDk1fQ.FO6PoxPEHb3my_IKnJHjlyxWv1okwihuw6yyboVIKmY"
          }
        });

        if (response.ok) {
          const data = await response.json();
          setStrategies(data.message);
        } else {
          console.error("Failed to fetch strategies.");
        }
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchStrategies();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setStrategies((prevStrategies) =>
      prevStrategies.map((strategy) => ({ ...strategy, selected: !selectAll }))
    );
  };

  const handleCheckboxChange = (index: number) => {
    setStrategies((prevStrategies) =>
      prevStrategies.map((strategy, idx) =>
        idx === index ? { ...strategy, selected: !strategy.selected } : strategy
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-purple-50 overflow-hidden">
      <div className="flex items-center space-x-2 text-blue-500 cursor-pointer ml-8">
        <FiArrowLeft size={20} />
        <span className="underline">Back</span>
      </div>
      <div className="p-6 flex justify-between">
        <h1 className="text-4xl font-bold">Add a New Bucket</h1>
        <div className="flex space-x-6 justify-end">
          <button className="flex items-center space-x-1 text-purple-500 font-bold rounded-lg border border-blue-500 px-4 py-2">
            <FiUpload size={20} className="text-blue-500" /> <span className="text-blue-500">Import</span>
          </button>
        </div>
      </div>

      <div className="px-8">
        <label className="block text-sm text-gray-500 mb-2 font-bold">Enter Bucket Name</label>
        <input
          type="text"
          placeholder="Bucket name here"
          className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm w-36"
        />
      </div>

      <div className="flex-grow px-8 mt-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Select Strategies</h2>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search strategy with keywords"
            className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="flex-grow overflow-auto" style={{ maxHeight: 'calc(100vh - 350px)' }}>
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-purple-500 sticky top-0">
              <tr>
                <th className="p-4">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th className="p-4 text-left">Strategy Name</th>
                <th className="p-4 text-left">Index</th>
                <th className="p-4 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((strategy, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={!!strategy.selected}
                      onChange={() => handleCheckboxChange(idx)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <PlayButton />
                      <div className="truncate w-[150px]">
                        <div className="text-base font-medium">{strategy.strategyName || "Strategy Name Here"}</div>
                        <div className="text-xs text-gray-500">Small text here</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-base font-semibold">{strategy.index || "N/A"}</td>
                  <td className="p-4 font-medium truncate w-[200px]">
                    {strategy.description || "A description explaining the strategy, mode of privacy, and results."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="px-8 mt-6 flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-2 font-bold">Select Start Date</label>
          <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-2 font-bold">Select End Date</label>
          <input type="date" className="w-full p-3 border border-gray-300 rounded-lg" />
        </div>
      </div>

      {/* Fixed Buttons Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-50 p-4 shadow-lg">
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-sm">Save</button>
          <button disabled={buttonDisabled} className="px-6 py-3 bg-purple-500 text-white rounded-md shadow-sm">Create Bucket</button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddBucket;
