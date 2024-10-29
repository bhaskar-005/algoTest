// AddBucket.tsx
import React from "react";
import { FiArrowLeft, FiTrash2, FiUpload } from "react-icons/fi";
import PlayButton from "../assets/PlayButton";

const AddBucket: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-purple-50">
      <div className="flex items-center space-x-2 text-blue-500 cursor-pointer ml-8">
          <FiArrowLeft size={20} />
          <span className="underline">Back</span>
        </div>
      {/* Header with Back Button and Title */}
      <div className="p-6 flex justify-between">
        <h1 className="text-4xl font-bold">Add a New Bucket</h1>
        <div className="flex space-x-6 justify-end">
          <button className="flex items-center space-x-1 text-red-500 font-bold">
            <FiTrash2 size={20} className="text-red-300"/> <span className="text-red-300">Delete</span>
          </button>
          <button className="flex items-center space-x-1 text-purple-500 font-bold rounded-lg border border-blue-500 px-4 py-2 ">
            <FiUpload size={20} className="text-blue-500"/> <span className="text-blue-500">Import</span>
          </button>
        </div>
      </div>

      {/* Bucket Name Input */}
      <div className="px-8">
        <label className="block text-sm text-gray-500 mb- font-bold">Enter Bucket Name</label>
        <input
  type="text"
  placeholder="Bucket name here"
  className="p-2 text-sm border border-gray-300 rounded-lg shadow-sm" // Padding aur font size ko adjust kiya
/>

      </div>

      {/* Search and Table */}
      <div className="px-8 mt-8">
        <h2 className="text-xl font-bold mb-4">Select Strategies</h2>

        <div className="flex justify-between items-center mb-4">
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-sm">
            + Add
          </button>
          <input
            type="text"
            placeholder="Search strategy with keywords"
            className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        <div className="overflow-auto border rounded-lg shadow">
          <table className="min-w-full table-auto bg-white">
            <thead className="bg-purple-500">
              <tr>
                <th className="p-4">
                  <input type="checkbox" />
                </th>
                <th className="p-4 text-left">Strategy Name</th>
                <th className="p-4 text-left">Index</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Result</th>
                <th className="p-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {Array(8).fill("").map((_, idx) => (
                <tr key={idx} className="border-b">
                  <td className="p-4 ">
                    <input type="checkbox" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                  <PlayButton/>
                  <div>

                    <div className="text-base font-medium">Strategy Name Here</div>
                    <div className="text-xs text-gray-500">Small text here</div>
                  </div>
                    </div>
                  </td>
                  <td className="p-4 text-base font-semibold">Nifty Strategy</td>
                  <td className="p-4 font-medium">
                    A description explaining the strategy, mode of privacy, and results.
                  </td>
                  <td className="p-4 flex space-x-2">
                    <button className="text-blue-500 rounded-lg border border-blue-500 px-4 py-2">See Result</button>
                  </td>
                  <td>
                  <button className="text-lightPuprle-500  bg-purple-500 rounded-lg border border-blue-500 px-4 py-2">Add to Bucket</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span>Page 1 of 10</span>
          <div className="space-x-2">
            <button className=" rounded-lg border border-blue-500 px-4 py-2 text-purple-500">Previous</button>
            <button className=" rounded-lg border border-blue-500 px-4 py-2 text-purple-500 font-semibold">Next</button>
          </div>
        </div>
      </div>

      {/* Date Inputs */}
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

      {/* Action Buttons */}
      <div className="px-8 mt-8 flex justify-end">
      <div className="flex justify-end space-x-4"> 
  <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-sm">
    Save
  </button>
  <button className="px-6 py-3 bg-purple-500 text-white rounded-md shadow-sm">
    Create Bucket
  </button>
  <button className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-sm">
    Cancel
  </button>
</div>

      </div>
    </div>
  );
};

export default AddBucket;
