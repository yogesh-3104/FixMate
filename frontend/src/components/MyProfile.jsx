import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../pages/customer/CustomerNavbar';
import ProviderNavbar from '../pages/provider/ProviderNavbar';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("fixMate-Token");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setUser(res.data);
            } catch (error) {
                toast.error("Failed to load profile.");
            }
        };
        fetchProfile();
    }, [token]);

    if (!user) return <p className="text-center py-10">Loading profile...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-sky-200">
            <div>{user.role === "provider" ? <ProviderNavbar /> : <CustomerNavbar />}</div>
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 backdrop-blur-md">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">My Profile</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-blue-800">
                        <p><strong>Name:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Location:</strong> {user.location}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>

                        {user.role === "provider" && (
                            <>
                                <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>
                                <p><strong>Experience:</strong> {user.experience} years</p>
                                <p><strong>Availability:</strong> {user.availability?.join(", ")}</p>
                            </>
                        )}
                    </div>

                    <div className="text-center mt-8">
                        <button
                            onClick={() => navigate("/edit-profile")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
