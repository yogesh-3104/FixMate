import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/user/login`,
                { email, password },
                { withCredentials: true }
            );
            toast.success("Login Successful");
            localStorage.setItem("fixMate-Token", response.data.token);

            if (response.data.result.role === "provider") {
                navigate('/provider');
            } else {
                navigate('/customer');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An unexpected error occurred.");
            console.error("Login error:", error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-3xl shadow-lg border border-white/40 p-8 md:p-10">
                <h2 className="text-3xl font-bold text-center text-blue-800 mb-6 drop-shadow">
                    Welcome Back 👋
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-blue-900 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-blue-900 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded-xl bg-white/70 text-gray-800 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-inner"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl shadow-md transition-all duration-200"
                    >
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-blue-900">
                    Don&apos;t have an account?
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
