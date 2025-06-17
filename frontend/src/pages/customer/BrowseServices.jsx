import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { RequestModal } from '../../components/RequestModal'

function BrowseServices() {
    const [services, setServices] = useState([])
    const [selectedService, setSelectedService] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [appointments, setAppointments] = useState([])
    const fetchAllServices = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service`)
        console.log(response.data);
        setServices(response.data)
    }
    const fetchMyAppointments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointment/my`, {
                withCredentials: true,
            });
            setAppointments(response.data);
        } catch (error) {
            console.error("Failed to fetch appointments", error);
        }
    };
    useEffect(() => {
        fetchAllServices();
        fetchMyAppointments();
    }, [])
    const isAlreadyRequested = (serviceId) => {
        return appointments.some(app => app.serviceId?._id === serviceId);
    };
    const handleRequestService = (serviceId) => {
        navigate(`/book-service/${serviceId}`);
    };

    const handleChat = (providerId) => {
        navigate(`/chat/${providerId}`);
    };
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-10 px-4" >
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Available Services</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                        const alreadyRequested = isAlreadyRequested(service._id);
                        return (
                            <div key={service._id} className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
                                <h3 className="text-xl font-semibold text-blue-700 mb-2">{service.category}</h3>
                                <p className="text-gray-600 mb-3">{service.description}</p>
                                <p className="text-sm text-gray-500 mb-2">
                                    Provider: <span className="font-medium">{service.providerName || "Unknown"}</span>
                                </p>
                                <p className="text-lg font-bold text-green-700 mb-4">₹ {service.price}</p>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => {
                                            if (!alreadyRequested) {
                                                setSelectedService(service);
                                                setIsModalOpen(true);
                                            }
                                        }}
                                        disabled={alreadyRequested}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${alreadyRequested
                                            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                            : "bg-blue-600 hover:bg-blue-700 text-white"
                                            }`}
                                    >
                                        {alreadyRequested ? "Requested ✅" : "Request Service"}
                                    </button>
                                    <button
                                        onClick={() => handleChat(service.providerId)}
                                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                                    >
                                      
                                        Message <span className='sm:inline hidden'>with provider</span>
                                    </button>
                                    <button
                                        onClick={() => navigate(`/provider-profile/${service.providerId}`)}
                                        className="border border-blue-400 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition"
                                    >
                                        View Profile
                                    </button>
                                </div>
                                {isModalOpen && (
                                    <RequestModal
                                        selectedService={selectedService}
                                        isModalOpen={isModalOpen}
                                        setIsModalOpen={setIsModalOpen}
                                    />
                                )}

                            </div>
                        )
                    }
                    )}
                </div>

            </div>
        </>
    )
}

export default BrowseServices;

