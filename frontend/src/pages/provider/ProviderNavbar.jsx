import React, { useState } from 'react'
import { providerNavLinks } from '../../../constant';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function ProviderNavbar() {

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(!isOpen);
    const links = providerNavLinks;
    return (
        <div>
            <nav className="bg-white/30 backdrop-blur-md shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <h1 className="text-xl font-bold text-blue-900">ProviderHub</h1>
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
                <ul className="hidden md:flex space-x-6">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="hover:text-blue-700 font-medium transition">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {isOpen && (
                <ul className="md:hidden px-4 py-2 bg-white/40 backdrop-blur-md shadow-md rounded-b-lg">
                    {links.map((link) => (
                        <li key={link.to} className="py-2">
                            <Link
                                to={link.to}
                                className="block text-blue-800 font-semibold hover:underline"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default ProviderNavbar