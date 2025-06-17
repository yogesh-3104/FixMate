import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ReviewModal from '../../components/ReviewModal';

const CustomerBookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/appointment/my`, {
                withCredentials: true,
            });
            setAppointments(response.data);
            console.log(response.data); 
            console.log(response.data[0].date); 
            const date = new Date(response.data[0].date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch bookings.");
            console.log(error.response?.data?.message || "Failed to fetch bookings.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);
    
        const [reviews, setReviews] = useState([])
        const fetchReviews = async () => {
            const token = localStorage.getItem('fixMate-Token');
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/review`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                });
                setReviews(response.data || []);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch reviews.");
            } 
        };
        useEffect(() => {
            fetchReviews()
        }, [])
        
        
        
        const checkIsReviewed=(appointment)=>{
            console.log(reviews,appointment);
            if(appointment){
                const alreadyReviewed=reviews.some((review)=> review.appointmentId === appointment._id);
                console.log(alreadyReviewed);
                return alreadyReviewed
            }
            return false;
            
        }
    return (
        <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">My Bookings</h2>

                {loading ? (
                    <p className="text-center text-blue-700">Loading bookings...</p>
                ) : appointments.length === 0 ? (
                    <p className="text-center text-blue-700">You have no bookings yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 ">
                        {appointments.map((appointment) => {
                        const isReviewed = checkIsReviewed(appointment)
                        return  (
                            <div
                                key={appointment._id}
                                className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30"
                            >
                                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                                    {appointment.serviceId?.category || 'Service'}
                                </h3>
                                <p className="text-xl text-blue-800 mb-1">
                                    <strong>Date:</strong> {appointment.date ? new Date(appointment.date).toLocaleDateString("en-IN", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }):"N/A" }
                                </p>
                                <p className="text-sm text-blue-800 mb-1">
                                    <strong>Provider:</strong> {appointment.providerId?.name || 'N/A'}
                                </p>
                                <p className="text-sm text-blue-800 mb-1">
                                    <strong>Email:</strong> {appointment.providerId?.email}
                                </p>
                                <p className="text-sm text-blue-800 mb-1">
                                    <strong>Location:</strong> {appointment.providerId?.location}
                                </p>
                                <p className="text-sm text-blue-800">
                                    <strong>Status:</strong> <span className="font-medium text-blue-600 ">{appointment.status || 'Pending'}</span>
                                </p>

                                <div className='w-full text-right'>

                                {appointment.status === "completed" && (
                                    <button
                                    onClick={() => { if (!isReviewed) setSelectedAppointment(appointment);}}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition mt-2  "
                                        disabled={isReviewed}
                                    >
                                        {isReviewed? "Reviewed ✅":"Leave Review"}
                                    </button>
                                )}
                                </div>
                            </div>
                        )}
                        )}
                    </div>
                )}
            </div>
            <div>
                {selectedAppointment && <ReviewModal selectedAppointment={selectedAppointment} setSelectedAppointment={setSelectedAppointment} />}
            </div>
        </div>
    );
};

export default CustomerBookings;
