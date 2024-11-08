import { useEffect, useState } from "react";
import DotsIcon from "../assets/DotsIcon";
import { NavLink } from "react-router-dom";
import TrashBinIcon from "../assets/TrashBinIcon";
import ImportModal from "../models/importModals"; // Import the modal component
import "../pagescss/allbucketpage.css"; // Add this to import the CSS styles

const AllBucket = () => {
    const [buckets, setBuckets] = useState([]);
    const [deletingBucket, setDeletingBucket] = useState(null); // New state for delete animation
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    useEffect(() => {
        const fetchBuckets = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/getBucket", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDk2NjI1NiwiZXhwIjoxNzMxODMwMjU2fQ.0NYk2xwh2gwWYwsyeRRJVbMImSfVMPC6YNMYaq1W4Ag",
                    },
                });
                const data = await response.json();
                setBuckets(data.reasult);
            } catch (error) {
                console.error("Failed to fetch buckets:", error);
            }
        };

        fetchBuckets();
    }, []);

    const handleDeleteBucket = async (bucketName) => {
        setDeletingBucket(bucketName);

        setTimeout(async () => {
            try {
                const response = await fetch("http://localhost:3000/api/deleteBucket", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzE3NjY4NDc1YmJhMzMxNGJjMWM2MmYiLCJlbWFpbCI6ImhhcnNodGl3YXJpNTQ2MmdtYWlsLmNvbSIsImlhdCI6MTczMDk2NjI1NiwiZXhwIjoxNzMxODMwMjU2fQ.0NYk2xwh2gwWYwsyeRRJVbMImSfVMPC6YNMYaq1W4Ag",
                    },
                    body: JSON.stringify({ bucketName }),
                });
                if (response.ok) {
                    setBuckets((prevBuckets) => prevBuckets.filter(bucket => bucket.bucketName !== bucketName));
                } else {
                    console.error("Failed to delete bucket");
                }
            } catch (error) {
                console.error("Error deleting bucket:", error);
            } finally {
                setDeletingBucket(null);
            }
        }, 300);
    };

    const openModal = () => setIsModalOpen(true); // Open modal
    const closeModal = () => setIsModalOpen(false); // Close modal

    const addBucketToState = (newBucket) => {
        setBuckets((prevBuckets) => [...prevBuckets, newBucket]); // Add the new bucket to state
    };

    const truncateName = (name) => (name.length > 10 ? name.substring(0, 14) + "..." : name);

    const filteredBuckets = buckets.filter((bucket) =>
        bucket.bucketName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="bg-[#f4f6ff] min-h-screen font-sans">
                <header className="flex items-center justify-between p-4 py-7 max-w-6xl mx-auto">
                    <h1 className="text-4xl font-bold">All Buckets</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            className="px-5 py-2 text-sm rounded-md border text-[#7283e8] border-[#7283e8] font-bold"
                            onClick={openModal} // Open modal on click
                        >
                            Import
                        </button>
                        <button className="px-4 py-2 text-[#7283e8] bg-[#bec7fd] text-sm rounded-md border border-[#7283e8] font-bold">
                            <NavLink to="/bucket">
                                <span>+ Create New Strategy</span>
                            </NavLink>
                        </button>
                    </div>
                </header>

                <div className="max-w-6xl mx-auto py-2 rounded-lg">
                    <div className="flex justify-between bg-white mb-7 py-3 items-center">
                        <section className="mx-4">
                            <h2 className="text-xl font-semibold">My Buckets</h2>
                            <p className="text-sm text-[#667085] font-[400]">
                                Keep tracking the result of your strategies by grouping them in buckets.
                            </p>
                        </section>
                        <div className="flex items-center mx-4">
                            <input
                                type="text"
                                placeholder="Search bucket with keywords"
                                className="ml-auto border rounded-md p-2 text-sm w-[350px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-center">
                        {filteredBuckets.map((bucket, index) => (
                            <div
                                key={index}
                                className={`bucket-card bg-white shadow-2xl rounded-lg p-3 flex flex-col justify-between w-[235px] h-[220px] mx-auto ${deletingBucket === bucket.bucketName ? "fade-out" : ""}`}
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="text-2xl font-semibold">{truncateName(bucket.bucketName)}</h3>
                                    <button
                                        className="text-gray-400"
                                        onClick={() => handleDeleteBucket(bucket.bucketName)}
                                    >
                                        <TrashBinIcon />
                                    </button>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mt-2">Total Strategies: {bucket.strategiesCount}</p>
                                    <button className="mt-4 bg-[#bec7fd] text-[#7283e8] py-2 px-4 rounded-md text-base flex items-center justify-center">
                                        <NavLink to={`/showbucket/${bucket.bucketName}`}>
                                            View Bucket
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Render ImportModal if isModalOpen is true */}
            {isModalOpen && (
                <ImportModal
                    onClose={closeModal}
                    addBucketToState={addBucketToState}  // Pass the callback here
                />
            )}
        </>
    );
};

export default AllBucket;
