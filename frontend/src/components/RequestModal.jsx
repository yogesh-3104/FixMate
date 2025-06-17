import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

export const RequestModal = ({selectedService,isModalOpen,setIsModalOpen}) => {
    const [date, setDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [requested, setRequested] = useState(false);

    const handleSubmit = async () => {
        if (!date) return alert("Please select a date");
        
        setLoading(true);
        try {
            
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/appointment`, {
                serviceId: selectedService._id,
                providerId: selectedService.providerId,
                status:"pending",
                date,
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("fixMate-Token")}` },
            });
            
            toast.success("Service Requested Successfully")
            setRequested(true);
        } catch (err) {
            console.error("Request failed:", err.message);
            toast.error(err.response?.data?.message || err.message)
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-2 text-blue-800">Select Booking Date</h3>
                        <input
                            type="date"
                            className="w-full border rounded px-3 py-2 mb-4"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                {loading ? "Requesting..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    );
};

