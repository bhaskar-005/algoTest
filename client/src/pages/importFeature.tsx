import React, { useState } from "react";

const App = () => {
  const [strategies, setStrategies] = useState([]); // Initial empty array for strategies

  // JSON file ko upload karne aur data ko read karne ke liye function
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result); // JSON data read
          if (json.initialStrategies) {
            setStrategies(json.initialStrategies); // `initialStrategies` ko update kar diya
          } else {
            console.error("JSON format invalid hai.");
          }
        } catch (error) {
          console.error("Invalid JSON file:", error);
        }
      };
      reader.readAsText(file); // File ko text ke form mein read karte hain
    } else {
      alert("Please upload a valid JSON file.");
    }
  };

  return (
    <div>
      <h1>Strategies Table</h1>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {strategies.map((strategy, index) => (
            <tr key={index}>
              <td>{strategy.id}</td>
              <td>{strategy.name}</td>
              <td>{strategy.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
