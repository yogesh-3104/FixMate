
import React, { useState } from 'react';
import { FaTools, FaUserTie, FaBolt, FaWater } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <header className="bg-white shadow-md py-6 px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <h1 className="text-3xl font-extrabold text-blue-700 text-center md:text-left">
                        Local Service Finder
                    </h1>
                </div>
            </header>


            <section className="py-12 px-6 sm:px-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-10 text-center">Featured Services</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    <ServiceCard icon={<FaBolt />} title="Electrician" />
                    <ServiceCard icon={<FaWater />} title="Plumber" />
                    <ServiceCard icon={<FaTools />} title="Mechanic" />
                    <ServiceCard icon={<FaUserTie />} title="Tutor" />
                </div>
            </section>

            <section className="bg-blue-600/80 text-white py-16 px-6 text-center">
                <h3 className="text-2xl font-semibold">Need help around your society?</h3>
                <p className="mt-3 text-lg">Find trusted local professionals in just a few clicks.</p>
                <button
                    onClick={() => navigate('/login')}
                    className="mt-6 px-8 py-3 bg-white text-blue-600 font-semibold rounded-md shadow hover:bg-gray-100"
                >
                    Get Started
                </button>
            </section>

            <footer className="bg-white text-center py-4 mt-auto shadow-inner">
                <p className="text-sm text-gray-500">
                    © {new Date().getFullYear()} Local Service Finder. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

const ServiceCard = ({ icon, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer flex flex-col items-center"
    >
        <div className="text-blue-600 text-5xl mb-3">{icon}</div>
        <h4 className="font-semibold text-lg text-gray-700">{title}</h4>
    </div>
);

export default Home;
