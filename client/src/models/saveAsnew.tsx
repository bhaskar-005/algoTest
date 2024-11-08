import { useState, useEffect } from 'react';
import './modale.css'; // Import the CSS file for animation

function PortfolioModal({ isOpen, onClose, strategies = [] }) {
  const [availableStrategies, setAvailableStrategies] = useState([]);
  const [permanentSelectedStrategies, setPermanentSelectedStrategies] = useState([]);
  const [tempSelectedStrategies, setTempSelectedStrategies] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [bucketName, setBucketName] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchStrategies();
    }
  }, [isOpen]);

  const fetchStrategies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getStratgeyForBucket", {
        method: "POST",
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMTA2MTQ1NiwiZXhwIjoxNzMxOTI1NDU2fQ.TtH1Y38edAMuWW8Gu4T_nJrwOQ3MO-Y4qv-q2OGHf5c",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const fetchedStrategies = data.message.map((item) => ({
          strategyName: item.strategyName,
          index: item.index,
        }));

        setAvailableStrategies(fetchedStrategies);

        // Separate the strategies into permanently selected and initially unselected
        const initialPermanentSelected = fetchedStrategies.filter((strategy) =>
          strategies.some((s) => s.strategyName === strategy.strategyName)
        );
        setPermanentSelectedStrategies(initialPermanentSelected);

        // Set the rest as initially unselected
        const initialTempSelected = fetchedStrategies.filter(
          (strategy) => !initialPermanentSelected.includes(strategy)
        );
        setTempSelectedStrategies([]); // Ensure other strategies start as unselected
      } else {
        console.error("Failed to fetch strategies. Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching strategies:", error);
      setAvailableStrategies([]);
    }
  };

  const handleCheckboxChange = (strategy) => {
    if (permanentSelectedStrategies.includes(strategy)) return;

    setTempSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleCreatePortfolio = async () => {
    try {
      // Pehle bucket name ko validate karne ke liye API call
      const validateResponse = await fetch('http://localhost:3000/api/checkBucketnamevalid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMTA2MTQ1NiwiZXhwIjoxNzMxOTI1NDU2fQ.TtH1Y38edAMuWW8Gu4T_nJrwOQ3MO-Y4qv-q2OGHf5c'
        },
        body: JSON.stringify({ bucketName: bucketName })
      });
  
      const validateData = await validateResponse.json();
  
      // Agar bucket name valid hai to next step
      if (validateResponse.ok) {
        // Selected strategies ka data prepare karenge
        const bucketStrategies = [
          ...permanentSelectedStrategies,
          ...tempSelectedStrategies
        ].map(strategy => ({
          Index: strategy.index,
          strategyName: strategy.strategyName,
          multiplier: strategy.multiplier || 1,  // multipliers ko bhi include karenge
          executionDays: strategy.executionDay || ["Mon","Tue","Wed","Thu","Fri"]
        }));
  
        // Ab actual bucket create karenge
        const createResponse = await fetch('http://localhost:3000/api/createBucketImport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMTA2MTQ1NiwiZXhwIjoxNzMxOTI1NDU2fQ.TtH1Y38edAMuWW8Gu4T_nJrwOQ3MO-Y4qv-q2OGHf5c'
          },
          body: JSON.stringify({
            bucketName: bucketName,
            bucket: bucketStrategies
          })
        });
  
        const createData = await createResponse.json();
  
        if (createResponse.ok) {
          alert('Portfolio created successfully!');
          closeModal();
        } else {
          console.error("Error in creating bucket:", createData.message);
          alert(createData.message);
        }
      } else {
        console.error("Bucket name validation error:", validateData.message);
        alert(validateData.message);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const closeModal = () => {
    onClose();
  };

  const filteredStrategies = availableStrategies.filter((strategy) =>
    strategy.strategyName.toLowerCase().includes(filterText.toLowerCase())
  );

  const sortedStrategies = [
    ...filteredStrategies.filter((strategy) =>
      permanentSelectedStrategies.includes(strategy)
    ),
    ...filteredStrategies.filter((strategy) =>
      !permanentSelectedStrategies.includes(strategy)
    )
  ];

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-xs ${isOpen ? 'fade-in' : 'fade-out'}`}>
      <div className="bg-white rounded-lg w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#7283e8]">Add new strategy Portfolio</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Enter Bucket Name</label>
          <input
            type="text"
            value={bucketName}
            onChange={(e) => setBucketName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter bucket name"
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 font-semibold">
            Add strategies to portfolio ({permanentSelectedStrategies.length + tempSelectedStrategies.length})
          </label>
        </div>

        <input
          type="text"
          placeholder="Filter Strategy"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="w-full px-3 py-2 border rounded mb-2"
        />

        <div className="h-40 overflow-y-auto border rounded mb-4">
          {sortedStrategies.map((strategy, index) => (
            <div key={index} className="flex items-center px-3 py-2 border-b">
              <input
                type="checkbox"
                checked={permanentSelectedStrategies.includes(strategy) || tempSelectedStrategies.includes(strategy)}
                onChange={() => handleCheckboxChange(strategy)}
                disabled={permanentSelectedStrategies.includes(strategy)}
                className="mr-2"
              />
              <label className="text-gray-700">
                {strategy.strategyName.length > 10 ? `${strategy.strategyName.substring(0, 10)}...` : strategy.strategyName}
              </label>
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-4">
          <button onClick={closeModal} className="px-4 py-2 text-gray-500 border border-[#fb1418] rounded text-[#fb1418]">Cancel</button>
          <button onClick={handleCreatePortfolio} className="px-4 py-2 text-white bg-blue-500 rounded">Create Portfolio</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;
