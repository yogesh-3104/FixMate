import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Filter } from 'lucide-react'; 

const categories = ["All", "Electrician", "Plumber", "Carpenter", "Painter", "Cleaner"];

const ProviderProfiles = () => {
    const [providers, setProviders] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [showFilter, setShowFilter] = useState(false);

    const fetchProviders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/provider`);
            setProviders(response.data.allProvider);
            setFiltered(response.data.allProvider);
        } catch (error) {
            toast.error("Failed to fetch providers");
        }
    };

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
        setShowFilter(false);

        if (category === "All") {
            setFiltered(providers);
        } else {
            const filteredList = providers.filter(provider =>
                provider.skills.includes(category)
            );
            setFiltered(filteredList);
        }
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between mb-6">
                
                <h1 className="text-3xl w-full text-center font-bold text-blue-900">Browse Service Providers</h1>

                <div className="relative">
                    <button
                        onClick={() => setShowFilter(prev => !prev)}
                        className="flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-4 py-2 rounded-lg shadow-sm hover:bg-blue-50"
                    >
                        <Filter className="h-5 w-5" />
                        <span className='md:inline hidden'>Filter</span>
                    </button>

                    {showFilter && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-blue-200 rounded-xl shadow-md z-10">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryClick(category)}
                                    className={`w-full text-left px-4 py-2 hover:bg-blue-100 hover:rounded-lg text-md 
                                    ${activeCategory === category ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filtered.length === 0 ? (
                    <p className="text-center col-span-full text-gray-600">No providers found for this category.</p>
                ) : (
                    filtered.map(provider => (
                        <div
                            key={provider._id}
                            className="bg-white p-5 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition"
                        >
                            <h2 className="text-xl font-semibold text-blue-800">{provider.name}</h2>
                            <p className="text-gray-600">{provider.location}</p>
                            <p className="mt-2 text-sm text-gray-500">Phone: {provider.phone}</p>
                            <p className="mt-2 text-sm text-gray-500">Experience: {provider.experience} years</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {provider.skills.map(skill => (
                                    <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProviderProfiles;
