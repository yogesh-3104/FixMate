import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer', 
        location: '',
        phone: '',
        skills: '',
        experience: '',
        availability: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRoleSelect = (role) => {
        setFormData(prev => ({ ...prev, role }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
            experience: parseInt(formData.experience) || 0,
            availability:formData.availability
        };
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/register`, payload, {
                withCredentials: true,
            });
            console.log(response.data);
            localStorage.setItem("fixMate-Token", response.data.token);
            toast.success("Registration successful!");
            if (response.data.result.role === "provider") {
                navigate('/provider');
            } else {
                navigate('/customer');
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-2xl bg-white/30 backdrop-blur-xl rounded-3xl shadow-lg border border-white/40 p-8 md:p-10">

                <div className="flex justify-center mb-6">
                    <button
                        type="button"
                        onClick={() => handleRoleSelect("customer")}
                        className={`px-6 py-2 rounded-l-xl text-white font-semibold ${formData.role === "customer" ? "bg-blue-600" : "bg-blue-300"
                            }`}
                    >
                        Customer
                    </button>
                    <button
                        type="button"
                        onClick={() => handleRoleSelect("provider")}
                        className={`px-6 py-2 rounded-r-xl text-white font-semibold ${formData.role === "provider" ? "bg-blue-600" : "bg-blue-300"
                            }`}
                    >
                        Provider
                    </button>
                </div>

                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 drop-shadow">
                    {formData.role === "provider" ? "Register as Provider" : "Register as Customer"}
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Common Fields */}
                    {[
                        { label: "Full Name", name: "name", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Password", name: "password", type: "password" },
                        { label: "Location", name: "location", type: "text" },
                        { label: "Phone", name: "phone", type: "text" },
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
                                className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                            />
                        </div>
                    ))}

                    {/* Provider-only Fields */}
                    {formData.role === "provider" && (
                        <>
                            <div className="col-span-1">
                                <label htmlFor="skills" className="block text-sm font-medium text-blue-900 mb-1">
                                    Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    name="skills"
                                    id="skills"
                                    value={formData.skills}
                                    onChange={handleChange}
                                    placeholder="Electrician, Wiring"
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="experience" className="block text-sm font-medium text-blue-900 mb-1">
                                    Experience (years)
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    id="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="availability" className="block text-sm font-medium text-blue-900 mb-1">
                                    Availability
                                </label>
                                <input
                                    type="text"
                                    name="availability"
                                    id="availability"
                                    value={formData.availability}
                                    onChange={handleChange}
                                    placeholder="Mon-Fri 9am-6pm"
                                    required
                                    className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                                />
                            </div>
                        </>
                    )}

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-200"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-6 text-sm text-center text-blue-900">
                    Already have an account?
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
