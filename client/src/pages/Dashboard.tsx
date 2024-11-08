import React, { useState } from 'react';

function PortfolioModal({ isOpen, onClose }) {
  const [portfolioName, setPortfolioName] = useState('');
  const [strategies, setStrategies] = useState([
    'fgfdgfd',
    'hfgfhghf',
    'sdasdsa',
    'sdasdsaasAS',
    'sdasdsaasASdsadad',
    ';lk\'lk\'lk\'lk'
  ]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);

  const handleCheckboxChange = (strategy) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleCreatePortfolio = () => {
    // Handle portfolio creation logic here
    console.log('Portfolio Name:', portfolioName);
    console.log('Selected Strategies:', selectedStrategies);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create new portfolio</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <label className="block mb-2 text-gray-700 font-semibold">Name your Portfolio</label>
        <input
          type="text"
          placeholder="Your portfolio name"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-4"
        />

        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 font-semibold">
            Add strategies to portfolio ({selectedStrategies.length})
          </label>
          <button className="text-blue-600 font-semibold hover:underline">+ New Strategy</button>
        </div>

        <input
          type="text"
          placeholder="Filter Strategy"
          className="w-full px-3 py-2 border rounded mb-2"
        />

        <div className="h-40 overflow-y-auto border rounded mb-4">
          {strategies.map((strategy, index) => (
            <div key={index} className="flex items-center px-3 py-2 border-b">
              <input
                type="checkbox"
                checked={selectedStrategies.includes(strategy)}
                onChange={() => handleCheckboxChange(strategy)}
                className="mr-2"
              />
              <label className="text-gray-700">{strategy}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-500 border border-gray-300 rounded">Cancel</button>
          <button onClick={handleCreatePortfolio} className="px-4 py-2 text-white bg-blue-600 rounded">Create Portfolio</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;
