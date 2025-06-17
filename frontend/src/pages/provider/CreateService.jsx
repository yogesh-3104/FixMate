import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateService = () => {
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !description || !price || !location) {
            return toast.error("All fields are required.");
        }

        setLoading(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/service`,
                { category, description, price, location },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("fixMate-Token")}`,
                    },
                }
            );
            toast.success("Service created successfully!");
            setCategory('');
            setDescription('');
            setPrice('');
            setLocation('');
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create service");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center px-4 py-10">
            <form
                onSubmit={handleSubmit}
                className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg max-w-xl w-full p-6 border border-white/30"
            >
                <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Create New Service</h2>

                <label className="block text-blue-900 font-medium mb-1">Category</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Electrician"
                />

                <label className="block text-blue-900 font-medium mb-1">Description</label>
                <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Describe your service..."
                ></textarea>

                <label className="block text-blue-900 font-medium mb-1">Price (₹)</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full mb-4 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your rate"
                />

                <label className="block text-blue-900 font-medium mb-1">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full mb-6 px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your working area"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                    {loading ? 'Creating...' : 'Create Service'}
                </button>
            </form>
        </div>
    );
};

export default CreateService;
