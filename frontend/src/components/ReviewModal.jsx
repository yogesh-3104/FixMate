// import axios from 'axios';
// import React,{ useState } from 'react';
// import { toast } from 'react-toastify';

// const ReviewModal = ({selectedAppointment,setSelectedAppointment}) => {

//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [submitting, setSubmitting] = useState(false);

//     const handleReviewSubmit = async () => {
//         if (!rating || !selectedAppointment) {
//             toast.warning("Please provide a rating");
//             return;
//         }

//         setSubmitting(true);
//         try {
//             await axios.post(`${import.meta.env.VITE_API_BASE_URL}/review`, {
//                 providerId: selectedAppointment.providerId._id,
//                 appointmentId: selectedAppointment._id,
//                 customerId: selectedAppointment.customerId, // Optional: backend can get it from token
//                 rating,
//                 comment
//             }, { withCredentials: true });

//             toast.success("Review submitted!");
//             setSelectedAppointment(null);
//             setRating(0);
//             setComment("");
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to submit review");
//         } finally {
//             setSubmitting(false);
//         }
//     };
//     return (
//         <>
//                 <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
//                         <h2 className="text-xl font-bold mb-4 text-blue-800">Leave a Review</h2>
//                         <label className="block mb-2 font-medium">Rating (1-5)</label>
//                         <input
//                             type="number"
//                             value={rating}
//                             onChange={(e) => setRating(parseInt(e.target.value))}
//                             className="w-full border rounded px-3 py-2 mb-4"
//                             min="1"
//                             max="5"
//                         />
//                         <label className="block mb-2 font-medium">Comment</label>
//                         <textarea
//                             value={comment}
//                             onChange={(e) => setComment(e.target.value)}
//                             rows="4"
//                             className="w-full border rounded px-3 py-2 mb-4"
//                         />

//                         <div className="flex justify-end gap-2">
//                             <button
//                                 onClick={() => setSelectedAppointment(null)}
//                                 className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleReviewSubmit}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//                                 disabled={submitting}
//                             >
//                                 {submitting ? "Submitting..." : "Submit Review"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//         </>
//     )
// }

// export default ReviewModal
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { useEffect } from 'react';

const ReviewModal = ({ selectedAppointment, setSelectedAppointment }) => {
    // console.log("appointments", appointments);
    
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(null);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleReviewSubmit = async () => {
        if (!rating || !selectedAppointment) {
            toast.warning("Please provide a rating");
            return;
        }

        setSubmitting(true);
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/review`, {
                providerId: selectedAppointment.providerId._id,
                appointmentId: selectedAppointment._id,
                customerId: selectedAppointment.customerId,
                rating,
                comment,
            }, { withCredentials: true });

            toast.success("Review submitted!");
            setSelectedAppointment(null);
            setRating(0);
            setComment("");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-blue-800">Leave a Review</h2>

                <label className="block mb-2 font-medium">Rating</label>
                <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                            key={star}
                            size={28}
                            className={`cursor-pointer transition text-yellow-400 ${(hoverRating || rating) >= star ? 'fill-yellow-400' : 'fill-gray-300'
                                }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                        />
                    ))}
                </div>

                <label className="block mb-2 font-medium">Comment</label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full border rounded px-3 py-2 mb-4"
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setSelectedAppointment(null)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReviewSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        disabled={submitting}
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
