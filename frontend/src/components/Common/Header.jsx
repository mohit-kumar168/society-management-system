import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/societies", label: "Societies" },
        { to: "/events", label: "Events" },
        { to: "/about", label: "About Us" },
    ];

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">
                                    SMS
                                </span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Society Management
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                                        isActive
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Desktop Sign Up Button */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/signup"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger icon */}
                            <svg
                                className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Close icon */}
                            <svg
                                className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={closeMobileMenu}
                            className={({ isActive }) =>
                                `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                    isActive
                                        ? "text-blue-600 bg-blue-50"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    {/* Mobile Sign Up Button */}
                    <div className="pt-4 pb-2">
                        <Link
                            to="/signup"
                            onClick={closeMobileMenu}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
