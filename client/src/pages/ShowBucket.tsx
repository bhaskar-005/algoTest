import ArrowIcon from "../assets/ArrowIcon";
import DownloadIcon from "../assets/DownloadIcon";
import EditIcon from "../assets/EditIcon";
import EditPencil from "../assets/EditPencil";
import FolderIcon from "../assets/FolderIcon";
import PlayButtonIcon from "../assets/PlayButtonIcon";
import PlusCircleIcon from "../assets/PlusCircleIcon";
import TrashBinIcon from "../assets/TrashBinIcon";



function ShowBucket() {
  return (
    <div className="flex h-screen bg-[#f4f6ff]">
      <main className="flex-1 p-6 pb-9">
        {/* Header */}
        <div className="flex items-center text-center gap-1">
          <ArrowIcon/>
          <a href="#" className="text-[#7283e8]">Back</a>
        </div>
        <header className="flex items-center justify-between mb-2 mt-6">
          <h2 className="text-2xl font-bold">Abhisekh Sir Bucket</h2>
          <div className="flex gap-4">
            {/* Delete Button */}
            <button className="flex items-center gap-2 px-4 py-2 text-[#fb1418] font-bold rounded hover:bg-red-600 hover:bg-indigo-100">
              <TrashBinIcon/>
              Delete
            </button>

            {/* Import Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-[#7283e8] text-[#7283e8] font-bold rounded hover:bg-blue-100 hover:bg-indigo-100">
              <DownloadIcon/>
              Import
            </button>

            {/* Edit Bucket Button */}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#bec7fd] text-[#7283e8] rounded hover:bg-blue-300">
              <EditIcon />
              Edit Bucket
            </button>
          </div>
        </header>

        {/* Days Selection */}
        <div className="mb-4">
          <h3 className="text-lg text-[18px]">Selected Days:</h3>
          <div className="flex space-x-1 mt-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'All'].map((day) => (
              <button key={day} className="px-4 py-1 bg-white rounded-sm border border-[#bec7fd]  hover:bg-blue-200">{day}</button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-semibold">Strategies</h4>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-[#fb1418] font-bold rounded hover:bg-red-600 hover:bg-indigo-100">
              <TrashBinIcon />
              Delete
            </button>

            {/* Import Button */}
            <button className="flex items-center gap-2 px-4 py-2 border border-[#7283e8] text-[#7283e8] font-bold rounded hover:bg-indigo-100">
              <PlusCircleIcon />
              Add Strategy
            </button>
          </div>
        </div>
        {/* Strategies Table */}
        <section className="bg-white rounded-lg p-4 shadow">
          <div className="p-0">
            <div className="overflow-x-auto border rounded-lg">
              <table className="min-w-full bg-white">
                <thead className="bg-[#bec7fd]">
                  <tr className="bg-indigo-50 text-gray-700 font-semibold">
                    <th className="px-4 py-2 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-2 text-left 
                    text-[18px] ">Strategy Name</th>
                    <th className="px-4 py-2 text-left text-[18px]">Index</th>
                    <th className="px-4 py-2 text-left text-[18px]">Quantity Multiplier</th>
                    <th className="px-4 py-2 text-left text-[18px]">Execution Days</th>
                    <th className="px-4 py-2 text-left text-[18px]">Result</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {/* Row 1 */}
                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Private</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>


                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Public</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>




                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Public</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>


                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Private</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>



                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Private | Market Spread</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>



                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Public | Volatile Volume</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>



                  <tr className="border-b">
                    <td className="px-4 py-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="px-4 py-2 text-[#101828] text-[16px]">
                      <div>Strategy Name Here</div>
                      <div className="text-[12px] text-[#667085]">Public | Private Mode</div>
                    </td>
                    <td className="px-4 py-2">Nifty Strategy</td>
                    <td className="px-4 py-2">
                      <select className="border rounded px-3 py-1.5 border-[#bec7fd]">
                        <option>00</option>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                      </select>
                    </td>
                    <td className="px-4 py-2 space-x-1">
                      {/* Execution Days Buttons */}
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 
                      text-[14px]">Mon</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Tue</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Wed</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">Thu</button>
                      <button className="px-2 py-2 rounded bg-[#bec7fd] text-indigo-800 text-[14px]">Fri</button>
                      <button className="px-2 py-2 rounded bg-indigo-100 text-indigo-800 text-[14px]">All</button>
                    </td>
                    <td className="px-4 py-2">
                      <button className="text-[#7283e8]  rounded-md border border-[#7283e8] px-3 py-1 text-[14px]">View Result</button>
                    </td>
                    <td className="px-4 py-2">
                      <EditPencil />
                    </td>
                  </tr>



                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-600">Page 1 of 10</span>
                <div className="space-x-2">
                  <button className="px-4 py-2 rounded-lg border border-[#7283e8] text-[#7283e8] text-[16px] ">Previous</button>
                  <button className="px-4 py-2 rounded-lg border border-[#7283e8] text-[#7283e8] text-[16px] ">Next</button>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Buttons */}
        <div className="flex justify-end space-x-4 mt-4">
          <div className="flex space-x-2 bg-indigo-50 rounded-md">
            {/* Export Button */}
            <button className="flex items-center px-4 py-2 rounded-md text-[#7283e8] hover:bg-indigo-100">
              <span className="mr-2">
                {/* Insert Export SVG here */}
                <svg width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 0l8 8h-6v8h-4v-8h-6l8-8zm-12 21h24v3h-24v-3z" />
                </svg>
              </span>
              Export
            </button>

            {/* Save as New Button */}
            <button className="flex items-center px-4 py-2 border rounded-md text-[#7283e8] border-[#7283e8] hover:bg-indigo-100">
              <span className="mr-2">
                <FolderIcon />
              </span>
              Save as New
            </button>

            {/* Update Bucket Button */}
            <button className="flex items-center px-4 py-2 border rounded-md text-[#7283e8] border-[#7283e8] hover:bg-indigo-100">
              <span className="mr-2">
                {/* Insert Update Bucket SVG here */}
                <FolderIcon />
              </span>
              Update Bucket
            </button>

            {/* Run Bucket Button */}
            <button className="flex items-center px-4 py-2 rounded-md text-[#7283e8] bg-[#bec7fd] hover:bg-indigo-600">
              <span className="mr-2">
                <PlayButtonIcon />
              </span>
              Run Bucket
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ShowBucket;
