import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Filter } from "lucide-react";

const statuses = ["all", "pending", "accepted", "completed", "rejected"];

const ProviderRequests = () => {
    const [appointments, setAppointments] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [filtered, setFiltered] = useState([])
    const fetchAppointments = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/appointment/provider`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fixMate-Token")}`,
                    },
                }
            );
            setAppointments(response.data);
            setFiltered(response.data)
        } catch (error) {
            toast.error("Failed to load appointment requests.");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/appointment/${id}/status`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fixMate-Token")}`,
                    },
                }
            );
            toast.success(`Status updated to ${newStatus}`);
            fetchAppointments(); 
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status.");
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleStatusChange=(status)=>{
        setActiveTab(status)
        console.log(status);
        
        setShowFilter(false);
        if (status === "all"){
            setFiltered(appointments)
        }else{
            console.log("Appointment",appointments);
            
            const filteredAppointments = appointments.filter(a => a.status === status)
            console.log("Filetered",filteredAppointments);
            
            setFiltered(filteredAppointments)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-8">
               <div className="flex items-center justify-between mb-6 ">
                    <h1 className="text-3xl font-bold text-center w-full text-blue-900">{activeTab.charAt(0).toUpperCase()+ activeTab.substring(1)} Service Request</h1>
                
                    <div className="relative">
                        <button
                            onClick={() => setShowFilter(prev => !prev)}
                            className="flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-50"
                        >
                            <Filter className="h-5 w-5" />
                            <span className='md:inline hidden'>Filter</span>
                        </button>

              
                        {showFilter && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-md z-10">
                                {statuses.map(status => (
                                    <button
                                        key={status}
                                        onClick={() => handleStatusChange(status)}
                                        className={`w-full text-left px-4 py-2 hover:bg-blue-100 hover:rounded-lg text-md 
                                    ${activeTab === status ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
           
                {loading ? (
                    <p className="text-center text-blue-800">Loading...</p>
                ) : filtered.length === 0 ? (
                    <p className="text-center text-blue-700">No requests found.</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((req) => (
                            <div
                                key={req._id}
                                className="bg-white/70 backdrop-blur-sm p-5 rounded-xl shadow border border-gray-300"
                            >
                                <h3 className="text-lg font-semibold text-blue-900">
                                    {req.serviceId?.category}
                                </h3>
                                <p className="text-sm text-blue-800">
                                    <strong>Customer:</strong> {req.customerId?.name}
                                </p>
                                <p className="text-sm text-blue-800">
                                    <strong>Email:</strong> {req.customerId?.email}
                                </p>
                                <p className="text-sm text-blue-800">
                                    <strong>Date:</strong>{" "}
                                    {new Date(req.date).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                                <p className="text-sm text-blue-800 ">
                                    <strong>Location:</strong>
                                    <span className="font-semibold text-blue-700">
                                        {req.customerId.location}
                                    </span>
                                </p>
                                <p className="text-sm text-blue-800 ">
                                    <strong>Status:</strong>
                                    <span className="font-semibold text-blue-700">
                                        {req.status}
                                    </span>
                                </p>

                                {req.status === "pending" && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => updateStatus(req._id, "accepted")}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => updateStatus(req._id, "rejected")}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                )}

                                {req.status === "accepted" && (
                                    <button
                                        onClick={() => updateStatus(req._id, "completed")}
                                        className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    >
                                        Mark as Completed
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
};

export default ProviderRequests;
