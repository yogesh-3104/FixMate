import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProviderServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('fixMate-Token'); 
      console.log(token);

      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/service/provider`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Provider's Services</h2>

        {loading ? (
          <p className="text-center text-blue-700">Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-center text-blue-700">No services found for this provider.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/30"
              >
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  {service.category}
                </h3>
                <p className="text-blue-800 mb-1">
                  <strong>Description:</strong> {service.description}
                </p>
                <p className="text-blue-800 mb-1">
                  <strong>Location:</strong> {service.location}
                </p>
                <p className="text-blue-800">
                  <strong>Price:</strong> ₹{service.price}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderServices;
