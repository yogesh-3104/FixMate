import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CustomerNavbar from '../pages/customer/CustomerNavbar'
import ProviderNavbar from '../pages/provider/ProviderNavbar'
const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        phone: '',
        skills: '',
        experience: '',
        availability: '',
    });

    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState()

    const token = localStorage.getItem("fixMate-Token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                console.log(res.data);
                setUserData(res.data)
                const user = res.data;
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    location: user.location || '',
                    phone: user.phone || '',
                    skills: (user.skills || []).join(', '),
                    experience: user.experience || '',
                    availability: (user.availability || []).join(', '),
                });
            } catch (error) {
                toast.error("Failed to load profile.");
            }
        };
        fetchProfile();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            ...formData,
            skills: formData.skills.split(',').map(skill => skill.trim()),
            availability: formData.availability.split(',').map(item => item.trim()),
            experience: parseInt(formData.experience),
        };

        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user`, data, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            console.log("updated :", response);
            toast.success("Profile updated successfully!");
            console.log("updated :", response);
            // if (response.data.role === "provider") {
            //     navigate('/provider');
            // } else {
            //     navigate('/customer');
            // }
            navigate('/profile')
        } catch (error) {
            toast.error(error.response?.data?.message || "Update failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div>
                {userData && userData.role === "provider" ? <ProviderNavbar /> : <CustomerNavbar />}
            </div>
            <div className=" flex flex-1 items-center justify-center ">
                <div className="w-full  max-w-2xl bg-gray/50 backdrop-blur-xl rounded-3xl shadow-lg border  border-white/40 p-8 md:p-10">
                    <h2 className="text-3xl font-bold text-center text-blue-600 mb-6 drop-shadow">
                        Edit Your Profile
                    </h2>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: "Full Name", name: "name", type: "text" },
                            { label: "Email", name: "email", type: "email" },
                            { label: "Location", name: "location", type: "text" },
                            { label: "Phone", name: "phone", type: "text" },
                            // { label: "Skills (comma separated)", name: "skills", type: "text" },
                            // { label: "Experience (years)", name: "experience", type: "number" },
                            // { label: "Availability", name: "availability", type: "text" },
                        ].map(({ label, name, type }) => (
                            <div className="col-span-1" key={name}>
                                <label htmlFor={name} className="block text-sm font-medium text-blue-900 mb-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    id={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-inner"
                                />
                            </div>
                        ))}
                        {userData && userData.role === 'provider' && (
                            <>
                                {[
                                    { label: "Skills (comma separated)", name: "skills", type: "text" },
                                    { label: "Experience (years)", name: "experience", type: "number" },
                                    { label: "Availability", name: "availability", type: "text" },
                                ].map(({ label, name, type }) => (
                                    <div className="col-span-1" key={name}>
                                        <label htmlFor={name} className="block text-sm font-medium text-blue-900 mb-1">
                                            {label}
                                        </label>
                                        <input
                                            type={type}
                                            name={name}
                                            id={name}
                                            value={formData[name]}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-inner"
                                        />
                                    </div>
                                ))}
                            </>
                        )}

                        <div className="md:col-span-2 text-right">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-fit p-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-200"
                            >
                                {loading ? 'Saving...' : 'Update Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
