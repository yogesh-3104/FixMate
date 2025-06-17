import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('fixMate-Token');
        toast.success('Logged out successfully!');

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }, [navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white text-lg font-medium text-blue-900">
            Logging out...
        </div>
    );
};

export default Logout;
