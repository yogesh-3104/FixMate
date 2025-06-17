import React from 'react';
import { Link } from 'react-router-dom';
import { customerNavLinks } from '../../../constant';

const CustomerDashboard = () => {

    const links = customerNavLinks
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 text-gray-800">
            <section className="py-16 px-4 text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold text-blue-900 mb-4">
                    Welcome to ServiceHub 🚀
                </h2>
                <p className="text-lg text-blue-800 mb-6">
                    Your one-stop destination to connect with skilled professionals.
                    Book services, manage bookings, leave reviews, and much more — all in one place.
                </p>
                <Link
                    to="/browse-services"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
                >
                    Get Started
                </Link>
            </section>

            <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
                {links.map((link) => (
                    <Link
                        key={link.to}
                        to={link.to}
                        className="block bg-white/50 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-lg transition border border-white/60 text-center font-semibold text-blue-900 hover:bg-white"
                    >
                        {link.label}
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default CustomerDashboard;
