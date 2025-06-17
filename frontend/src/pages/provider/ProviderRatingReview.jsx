import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ProviderReviewPage = () => { 
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProviderReviews = async () => {
        const token=localStorage.getItem("fixMate-Token")
        try {

            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/review/provider`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data);

            setReviews(response.data.reviews);
            setAverageRating(response.data.averageRating);
        } catch (err) {
            console.log(err.message, err?.response?.data?.error?.message);
            toast.error(err?.response?.data?.message ||"Failed to fetch provider reviews.");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProviderReviews();
        
    }, []);
    
    return (
        <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Provider Ratings & Reviews</h1>

                {loading ? (
                    <p className="text-center text-blue-700">Loading...</p>
                ) : (
                    <>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-yellow-600">
                                ⭐ {!!averageRating ? averageRating.toFixed(1) : "No Rating Yet"}
                            </h2>
                            <p className="text-sm text-gray-600">based on {reviews.length} review{reviews.length !== 1 && 's'}</p>
                        </div>

                        {reviews.length === 0 ? (
                            <p className="text-center text-gray-600">No reviews available for this provider.</p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {reviews.map((review) => (
                                    <div key={review._id} className="bg-white p-5 rounded-xl shadow border border-blue-100">
                                        <p className="text-sm text-gray-800 mb-2">
                                            <strong>Rating:</strong> {review.rating} ⭐
                                        </p>
                                        <p className="text-sm text-gray-800 mb-2">
                                            <strong>Comment:</strong> {review.comment || "No comment"}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProviderReviewPage;
