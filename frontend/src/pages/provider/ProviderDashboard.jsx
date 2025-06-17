import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { providerNavLinks } from '../../../constant';
import ProviderNavbar from './ProviderNavbar';

const ProviderDashboard = () => {
    const links = providerNavLinks;
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 text-gray-800">
      
            <section className="py-16 px-4 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                    Welcome, Service Provider 👷‍♀️
                </h2>
                <p className="text-lg text-blue-800 mb-6">
                    Manage your profile, services, and respond to user requests with ease.
                </p>
                <Link
                    to="/edit-profile"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
                >
                    Complete Your Profile
                </Link>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="block bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition border border-white/50 text-center font-semibold text-blue-900 hover:bg-white"
                    >
                        {link.label}
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default ProviderDashboard;
