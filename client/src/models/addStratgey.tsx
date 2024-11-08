import { useState, useEffect } from 'react';
import './modale.css'; // Import the CSS file for animation

function PortfolioModal({ isOpen, onClose, strategies = [], setStrategy, bucketnamemain, setbucketnamemain,setpreviousBucketName,previousBucketName}) {
  const [availableStrategies, setAvailableStrategies] = useState([]);
  const [selectedStrategies, setSelectedStrategies] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  const [shouldClose, setShouldClose] = useState(false); // New state for managing close delay
  const [bucketName, setBucktName] = useState(bucketnamemain);

  useEffect(() => {
    if (isOpen && !isFetched) {
      fetchStrategies();
      setIsFetched(true);
    }
  }, [isOpen, isFetched]);

  const fetchStrategies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getStratgeyForBucket", {
        method: "POST",
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDg5MTc2NiwiZXhwIjoxNzMxNzU1NzY2fQ.Pnn22fTpvxDWJ4wLVM9uHpnvaBrH_8Qs1EYF3T8hn9M",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const fetchedStrategies = data.message.map((item) => ({
          strategyName: item.strategyName, // Adding description field or any other field you need
          Index: item.index, // Assuming 'index' is the key you're referring to
        }));

        console.log("Fetched Strategies: ", fetchedStrategies);
        setAvailableStrategies(fetchedStrategies);

        // Initialize selected strategies with default values
        const initialSelected = fetchedStrategies.filter((strategy) =>
          strategies.some((s) => s.strategyName === strategy.strategyName)
        );
        setSelectedStrategies(initialSelected);
      } else {
        console.error("Failed to fetch strategies. Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching strategies:", error);
      setAvailableStrategies([]);
    }
  };

  const handleCheckboxChange = (strategy) => {
    setSelectedStrategies((prev) =>
      prev.includes(strategy)
        ? prev.filter((s) => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleCreatePortfolio = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/checkBucketnamevalid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDg5MTc2NiwiZXhwIjoxNzMxNzU1NzY2fQ.Pnn22fTpvxDWJ4wLVM9uHpnvaBrH_8Qs1EYF3T8hn9M' // अगर authentication की आवश्यकता हो
        },
        body: JSON.stringify({
          bucketName: bucketName,
          oldbucketname: bucketnamemain
        })
      });
      console.log(bucketName)
  
      const data = await response.json();
  
      if (response.ok) {
        // अगर API कॉल सफल है, तो ही आगे का कोड चलेगा
        console.log("Bucket name is valid:", data);
  
        // Set the previous bucket name and update strategies only on success
        setpreviousBucketName(bucketnamemain);
        setbucketnamemain(bucketName);
  
        const updatedStrategies = selectedStrategies.map((strategy) => {
          return strategies.find((s) => s.strategyName === strategy.strategyName) || {
            strategyName: strategy.strategyName,
            description: strategy.description,
            Index: strategy.Index, // Use Index or description here
            multiplier: 1,
            executionDays: [],
          };
        });
  
        setStrategy(updatedStrategies);
        closeModal();
      } else {
        // अगर API से error आया तो आगे का कोड execute नहीं होगा
        console.error("Error:", data.message);
        alert(data.message); // Error message to show to user
        return; // आगे का कोड न चलाने के लिए return
      }
    } catch (error) {
      console.error("Network error:", error);
      return; // Network error पर भी आगे का कोड न चलाने के लिए return
    }
  };
  

  const closeModal = () => {
    setShouldClose(true);
    setTimeout(() => {
      onClose();
      setShouldClose(false);
    }, 300); // Fade-out animation duration
  };

  const filteredStrategies = availableStrategies.filter((strategy) =>
    strategy.strategyName.toLowerCase().includes(filterText.toLowerCase())
  );

  // Sort strategies to show selected strategies at the top
  const sortedStrategies = [
    ...filteredStrategies.filter((strategy) => selectedStrategies.includes(strategy)),
    ...filteredStrategies.filter((strategy) => !selectedStrategies.includes(strategy))
  ];

  // Don't render the modal if it's not open and the fade-out animation is done
  if (!isOpen && !shouldClose) return null;

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
            onChange={(e) => setBucktName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter bucket name"
          />
        </div>

        <div className="flex justify-between items-center mb-2">
          <label className="text-gray-700 font-semibold">
            Add strategies to portfolio ({selectedStrategies.length})
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
                checked={selectedStrategies.includes(strategy)}
                onChange={() => handleCheckboxChange(strategy)}
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
