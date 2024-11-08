import React, { useState, useEffect } from "react";
import ArrowIcon from "../assets/ArrowIcon";
import DownloadIcon from "../assets/DownloadIcon";
import EditIcon from "../assets/EditIcon";
import EditPencil from "../assets/EditPencil";
import FolderIcon from "../assets/FolderIcon";
import PlayButtonIcon from "../assets/PlayButtonIcon";
import PlusCircleIcon from "../assets/PlusCircleIcon";
import TrashBinIcon from "../assets/TrashBinIcon";
import PortfolioModal from "../models/addStratgey";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Saveasnew from '../models/saveAsnew'

// const { bucketName1 } = useParams(); // Get the bucket name from the URL

const initialStrategies = [
  {
    name: "Strategy Name Here",
    type: "Private",
    index: "Nifty Strategy",
    multiplier: "00",
    executionDays: ["Mon", "Tue"],
  },
  // ... add more strategies as needed
];

function ShowBucket() {
  const { bucketName } = useParams();
  const [strategies, setStrategies] = useState(initialStrategies);
  const [selectedDays, setSelectedDays] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bucketNamemain,setBucketNamemain]= useState(bucketName);
  const [previousBucketName,setpreviousBucketName]=useState(bucketName)
  const [isModalOpenSave, setIsModalOpenSave] = useState(false);
  const closeModal = () => setIsModalOpenSave(false);
  const openModal = () => setIsModalOpenSave(true);


  const navigate = useNavigate();


  // const handleAddStrategy = () => {
  //   const newStrategy = {
  //     name: "New Strategy",
  //     type: "Private",
  //     index: "New Index",
  //     multiplier: "00",
  //     executionDays: [],
  //   };
  //   setStrategies([...strategies, newStrategy]);
  // };

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/onebucket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDc0MDEwNywiZXhwIjoxNzMxNjA0MTA3fQ.T-pDdbZ5TIIJ4nhMutuEdNbHIzMECYbqub0b1igPH9Q",
          },
          body: JSON.stringify({ bucketName:previousBucketName }),
        });

        if (response.ok) {
          const result = await response.json();
          // Directly map over the strategyArray to format each strategy object as needed
          const formattedStrategies = result.reasult.strategyArray.map(
            (strategy) => ({
              strategyName: strategy.strategyName,
              Index: strategy.Index,
              multiplier: strategy.multiplier,
              executionDays: strategy.executionDays,
            })
          );

          setStrategies(formattedStrategies);
        } else {
          console.error("Failed to fetch strategies");
        }
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };

    fetchStrategies();
  }, [bucketName]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDaySelection = (day) => {
    const updatedSelectedDays = new Set(selectedDays);
    if (updatedSelectedDays.has(day)) {
      updatedSelectedDays.delete(day);
    } else {
      updatedSelectedDays.add(day);
    }
    setSelectedDays(updatedSelectedDays);

    const updatedStrategies = strategies.map((strategy) => ({
      ...strategy,
      executionDays:
        updatedSelectedDays.size > 0 ? Array.from(updatedSelectedDays) : [],
    }));
    setStrategies(updatedStrategies);
  };

  const handleExecutionDayClick = (day, clickedStrategy) => {
    // Update only the clicked strategy
    const updatedStrategies = strategies.map((strategy) => {
      // Check if this is the clicked strategy
      if (strategy.index === clickedStrategy.index) {
        // Create a copy of the executionDays array
        const updatedExecutionDays = [...strategy.executionDays];
  
        // Toggle the day (add or remove the day)
        if (updatedExecutionDays.includes(day)) {
          // Remove the day if it's already selected
          updatedExecutionDays.splice(updatedExecutionDays.indexOf(day), 1);
        } else {
          // Add the day if it's not selected
          updatedExecutionDays.push(day);
        }
  
        // Return the updated strategy with modified executionDays
        return {
          ...strategy,
          executionDays: updatedExecutionDays,
        };
      }
  
      // If it's not the clicked strategy, return it unchanged
      return strategy;
    });
  
    // Update the strategies state with the modified array
    setStrategies(updatedStrategies);
  };
  

  const selectAllDays = () => {
    const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    setSelectedDays(new Set(allDays));

    const updatedStrategies = strategies.map((strategy) => ({
      ...strategy,
      executionDays: allDays,
    }));
    setStrategies(updatedStrategies);
  };

  const deselectAllDays = () => {
    setSelectedDays(new Set());
    const updatedStrategies = strategies.map((strategy) => ({
      ...strategy,
      executionDays: [],
    }));
    setStrategies(updatedStrategies);
  };

  const handleDeleteStrategy = (index) => {
    const updatedStrategies = strategies.filter((_, i) => i !== index);
    setStrategies(updatedStrategies);
    console.log(strategies)
  };
  

  // Effect to update selectedDays based on strategies executionDays
  useEffect(() => {
    const allExecutionDays = new Set(
      strategies.flatMap((strategy) => strategy.executionDays)
    );

    if (allExecutionDays.size === 5) {
      setSelectedDays(new Set(["Mon", "Tue", "Wed", "Thu", "Fri"]));
    } else {
      setSelectedDays(allExecutionDays);
    }
  }, [strategies]);

  const handleUpdateBucket = async () => {
    
    try {
      const response = await fetch("http://localhost:3000/api/updateBucket", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDc0MDEwNywiZXhwIjoxNzMxNjA0MTA3fQ.T-pDdbZ5TIIJ4nhMutuEdNbHIzMECYbqub0b1igPH9Q",
        },
        body: JSON.stringify({ updateBucket: strategies, bucketName:bucketNamemain,oldbucketname:previousBucketName }),
      });

      console.log(previousBucketName)

      if (response.ok) {
        setpreviousBucketName(bucketNamemain)
        const result = await response.json();
        alert(result.message);
      } else {
        console.error("Failed to fetch strategies");
      }
    } catch (error) {
      console.error("Error fetching strategies:", error);
    }
  };

  const handleSaveAsNew = async () => {
    try {
      // const response = await fetch('http://localhost:3000/api/createnewBucket', { // Apna API URL daalein
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDc0MDEwNywiZXhwIjoxNzMxNjA0MTA3fQ.T-pDdbZ5TIIJ4nhMutuEdNbHIzMECYbqub0b1igPH9Q'
      //   },
      //   body: JSON.stringify(strategies), // Pura `strategies` array bhej rahe hain
      // });
  
      // if (!response.ok) {
      //   throw new Error('Failed to save data');
      // }
  
      // const data = await response.json();
      // console.log('Data saved successfully:', data);
      // alert(data)
      // // Success message ya UI update ke liye code yahaan likhen
    } catch (error) {
      console.error('Error:', error);
      // Error handling ke liye code yahaan likhen
    }
  };

  const handleBucketDelete=async()=>{
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDk2NjI1NiwiZXhwIjoxNzMxODMwMjU2fQ.0NYk2xwh2gwWYwsyeRRJVbMImSfVMPC6YNMYaq1W4Ag";
    try {
        const response = await fetch("http://localhost:3000/api/deleteBucket", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body: JSON.stringify({ bucketName:bucketNamemain })
        });

        const result = await response.json();
        if (response.ok) {
            console.log("Bucket deleted successfully:", result);
            alert(result.message)
            navigate('/AllBucket'); 
            // Add any additional handling, like updating the UI
        } else {
            console.error("Error:", result.message);
        }
    } catch (error) {
        console.error("Error deleting bucket:", error.message);
    }

  }

  const handleCloseButton=()=>{
    navigate('/AllBucket')
  }

  // export onlcick 
  const handleExportButton = () => {
    // Convert the strategies state into a JSON string
    const data = JSON.stringify(strategies, null, 2);  // `null, 2` to format the JSON for readability
  
    // Create a Blob object containing the data (this is the file content)
    const blob = new Blob([data], { type: "application/json" });
  
    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element to simulate a download
    const link = document.createElement("a");
    link.href = url;
    link.download = "strategies.json";  // Name of the file to be downloaded
  
    // Append the link to the body, trigger the click event, and then remove the link
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    // Optionally, revoke the URL object to release resources
    URL.revokeObjectURL(url);
  };

  // download pdf :-
  const handleDownloadPDF = async () => {
    const input = document.getElementById("content"); // Ye wahi div hai jo aapko PDF mein chahiye
    if (input) {
      // HTML ko canvas mein convert karna
      html2canvas(input, {
        scrollX: 0, // scroll position reset karna
        scrollY: 0,
        width: input.scrollWidth, // Total width
        height: input.scrollHeight, // Total height
        x: window.pageXOffset, // Horizontal offset
        y: window.pageYOffset, // Vertical offset
        useCORS: true, // Cross-origin resources handle karna
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
  
        const imgWidth = 190; // PDF width mm mein
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Image height scaling
  
        let heightLeft = imgHeight;
        let position = 0;
  
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= 297; // A4 page height in mm
  
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= 297;
        }
  
        pdf.save("output.pdf"); // PDF ko download karna
      });
    }
  };
  
  return (
    <div className="flex h-screen bg-[#f4f6ff]" id="content">
      <main className="flex-1 p-6 pb-9">
        <div className="flex items-center text-center gap-1">
          <ArrowIcon />
          <a href="#" className="text-[#7283e8]">
            Back
          </a>
        </div>
        <header className="flex items-center justify-between mb-2 mt-6">
          <h2 className="text-2xl font-bold">{bucketNamemain}</h2>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-[#fb1418] font-bold rounded hover:bg-red-600 hover:bg-indigo-100" 
            onClick={handleBucketDelete}>
              <TrashBinIcon />
              Delete
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-[#7283e8] text-[#7283e8] font-bold rounded hover:bg-blue-100 hover:bg-indigo-100" onClick={handleDownloadPDF}>
              <DownloadIcon />
              Import
            </button>
          </div>
        </header>

        <div className="mb-4">
          <h3 className="text-lg text-[18px]">Selected Days:</h3>
          <div className="flex space-x-1 mt-1">
            {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
              <button
                key={day}
                onClick={() => toggleDaySelection(day)}
                className={`px-4 py-1 rounded ${
                  selectedDays.has(day) ? "bg-[#bec7fd]" : "bg-indigo-100"
                } text-indigo-800`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Strategies</h4>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 px-4 py-2 border border-[#7283e8] text-[#7283e8] font-bold rounded hover:bg-indigo-100"
          >
            <PlusCircleIcon />
            Add Strategy
          </button>
        </div>

        <section className="bg-white rounded-lg p-4 shadow">
          <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full bg-white">
  <thead className="bg-[#bec7fd]">
    <tr className="bg-indigo-50 text-gray-700 font-semibold">
      <th className="px-4 py-2">
        <input type="checkbox" className="rounded" />
      </th>
      <th className="px-4 py-2 text-left text-[18px]">Strategy Name</th>
      <th className="px-4 py-2 text-left text-[18px]">Index</th>
      <th className="px-4 py-2 text-left text-[18px]">Quantity Multiplier</th>
      <th className="px-4 py-2 text-left text-[18px]">Execution Days</th>
      <th className="px-4 py-2"></th>
    </tr>
  </thead>
  <tbody className="text-gray-700">
    {strategies.map((strategy, index) => (
      <tr key={index} className="border-b">
        <td className="px-4 py-2">
          <input type="checkbox" className="rounded" />
        </td>
        <td className="px-4 py-2 text-[#101828] text-[16px]">
          <div>{strategy.strategyName}</div>
          <div className="text-[12px] text-[#667085]">{strategy.type}</div>
        </td>
        <td className="px-4 py-2">{strategy.Index}</td>
        <td className="px-4 py-2">
          <select
            className="border rounded px-3 py-1.5 border-[#bec7fd]"
            value={strategy.multiplier}
            onChange={(e) => {
              const newMultiplier = e.target.value;
              setStrategies((prevStrategies) =>
                prevStrategies.map((s, i) =>
                  i === index ? { ...s, multiplier: newMultiplier } : s
                )
              );
            }}
          >
            {Array.from({ length: 21 }, (_, index) => index + 1).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </td>
        <td className="px-4 py-2 space-x-1">
          {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
            <button
              key={day}
              onClick={() => handleExecutionDayClick(day, strategy)}
              className={`px-2 py-2 rounded ${
                strategy.executionDays.includes(day)
                  ? "bg-[#bec7fd]"
                  : "bg-indigo-100"
              } text-indigo-800 text-[14px]`}
            >
              {day}
            </button>
          ))}
        </td>
        {/* <td className="px-4 py-2">
          <button className="text-[#7283e8] rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">
            See Strategy
          </button>
        </td> */}
        <td className="px-4 py-2 cursor-pointer" onClick={() => handleDeleteStrategy(index)}>
          <TrashBinIcon />
        </td>
      </tr>
    ))}
  </tbody>
</table>

          </div>
        </section>
        {/* Bottom Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <button className="flex items-center px-4 py-2 rounded-md text-[#7283e8] hover:bg-indigo-100" onClick={handleExportButton}>
            <span className="mr-2">Export</span>
          </button>
          <button
  className="flex items-center px-4 py-2 border rounded-md text-[#7283e8] border-[#7283e8] hover:bg-indigo-100"
  onClick={openModal}
>
  <span className="mr-2">
    <FolderIcon />
  </span>
  Save as New
</button>

          <button
            onClick={handleUpdateBucket}
            className="flex items-center px-4 py-2 border rounded-md text-[#7283e8] border-[#7283e8] hover:bg-indigo-100"
          >
            <span className="mr-2">
              <FolderIcon />
            </span>
            Update Bucket
          </button>
          <button className="flex items-center px-4 py-2 rounded-md text-[#7283e8] bg-[#bec7fd] hover:bg-indigo-100" onClick={handleCloseButton}>
            <span className="mr-2">Close</span>
          </button>
        </div>
      </main>
      <PortfolioModal isOpen={isModalOpen} onClose={handleCloseModal} strategies={strategies} setStrategy={setStrategies} bucketnamemain={bucketNamemain} setbucketnamemain={setBucketNamemain} previousBucketName={previousBucketName} setpreviousBucketName={setpreviousBucketName}/>
      <Saveasnew 
        isOpen={isModalOpenSave} 
        onClose={closeModal} 
        strategies={strategies} 
      />
    </div>
  );
}

export default ShowBucket;
