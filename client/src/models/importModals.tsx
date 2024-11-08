import React, { useState, useEffect } from "react";
import "./modale.css"; // Ensure the CSS file is correctly imported

const ImportModal = ({ onClose,addBucketToState  }) => {
    const [fileName, setFileName] = useState(null);
    const [fileError, setFileError] = useState(null);
    const [bucketName, setBucketName] = useState("");
    const [strategies, setStrategies] = useState(null);  // Store the validated strategies
    const [isVisible, setIsVisible] = useState(false);  // Track visibility for animation

    const allowedExecutionDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

    useEffect(() => {
        setIsVisible(true);  // Trigger modal appearance
        return () => setIsVisible(false); // Cleanup when modal closes
    }, []);

    // Function to handle file selection
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);  // Display file name
            try {
                const fileText = await file.text();
                const strategiesData = JSON.parse(fileText);

                // Validate the data
                const isValid = strategiesData.every(
                    (strategy) =>
                        strategy.strategyName &&
                        strategy.multiplier >= 1 &&
                        strategy.executionDays.every(day => allowedExecutionDays.includes(day)) &&
                        strategy.executionDays.length > 0  // Ensure executionDays array is not empty
                );

                if (isValid) {
                    setFileError(null);
                    setStrategies(strategiesData);  // Set valid strategies for API call
                } else {
                    setFileError("Invalid data: Ensure each strategy has a name, multiplier >= 1, and valid executionDays (Tue, Wed, Thu, Fri, or Sat).");
                    setFileName(null);
                    setStrategies(null);
                }
            } catch (error) {
                setFileError("Error parsing file. Please ensure it is a valid JSON.");
                setFileName(null);
                setStrategies(null);
            }
        }
    };

    // Handle Import button click
    const handleImportClick = async () => {
        if (!fileError && strategies && bucketName) {
            try {
                const response = await fetch("http://localhost:3000/api/createBucketImport", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDk2NjI1NiwiZXhwIjoxNzMxODMwMjU2fQ.0NYk2xwh2gwWYwsyeRRJVbMImSfVMPC6YNMYaq1W4Ag", // Replace with your JWT token
                    },
                    body: JSON.stringify({
                        bucketName: bucketName,
                        bucket: strategies,
                    }),
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    alert(data.message || "Bucket imported successfully");
                    addBucketToState({
                        bucketName,    // Add the bucketName
                        strategiesCount: strategies.length,  // Assuming strategies count
                        strategies: strategies,  // Add strategies here if needed
                    });
                    onClose();  // Close the modal after success
                } else {
                    alert(data.message || "Failed to import bucket");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while importing the bucket");
            }
        } else {
            alert("Please fix the errors and enter the bucket name before importing.");
        }
    };
    

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <div className="bg-white rounded-lg p-6 w-[400px]">
                <h2 className="text-lg font-semibold">Import Portfolio</h2>
                <p className="text-sm text-gray-500 mb-4">.algtst file less than 20MB (recommended)</p>
                <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg text-center">
                    <p className="text-gray-400">Drag and Drop</p>
                    <p className="text-gray-400">or</p>
                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        className="mt-2"
                        style={{ display: "none" }}
                        id="fileInput"
                    />
                    <button
                        className="mt-2 px-4 py-2 bg-[#7283e8] text-white rounded-md"
                        onClick={() => document.getElementById("fileInput").click()}
                    >
                        Browse files
                    </button>
                    {fileName && <p className="text-green-500 mt-2">{`Selected file: ${fileName}`}</p>}
                </div>
                {fileError && <p className="text-red-500 mt-2">{fileError}</p>}

                {/* Show bucket name input field only if the file is valid */}
                {!fileError && fileName && (
                    <div className="mt-4">
                        <label htmlFor="bucketName" className="text-sm font-medium">Bucket Name</label>
                        <input
                            type="text"
                            id="bucketName"
                            value={bucketName}
                            onChange={(e) => setBucketName(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-md"
                            placeholder="Enter bucket name"
                        />
                    </div>
                )}

                <div className="flex justify-end mt-4">
                    <button className="text-[#7283e8] font-semibold mr-4" onClick={onClose}>Cancel</button>
                    <button
                        className="bg-[#7283e8] text-white px-4 py-2 rounded-md"
                        onClick={handleImportClick}
                        disabled={!fileName || !!fileError || !bucketName}
                    >
                        Import
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
