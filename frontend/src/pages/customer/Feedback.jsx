import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Feedback = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return (
        <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-sky-100 via-white to-sky-200">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-sky-800 mb-8">Your Reviews</h2>

                {loading ? (
                    <p className="text-center text-sky-700">Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-center text-sky-700">No feedback provided yet.</p>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-md border border-white/30 transition hover:shadow-lg"
                            >
                                <h3 className="text-lg font-semibold text-sky-900 mb-1">
                                    {review.providerId?.name || 'Service Provider'}
                                </h3>
                                <p className="text-sm text-sky-700 mb-1">
                                    <strong>Email:</strong> {review.providerId?.email || 'N/A'}
                                </p>
                                <p className="text-sm text-sky-700 mb-1">
                                    <strong>Rating:</strong>{" "}
                                    <span className="text-yellow-500 font-semibold">{review.rating} ⭐</span>
                                </p>
                                <p className="text-sm text-sky-700">
                                    <strong>Comment:</strong> {review.comment || "No comment"}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Reviewed on {new Date(review.createdAt).toLocaleDateString("en-IN")}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Feedback;
