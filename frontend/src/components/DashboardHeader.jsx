import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const DashboardHeader = ({ userData }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
        setShowProfileMenu(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-30">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <div className="flex items-center">
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

                {/* Search Bar */}
                <div className="flex-1 max-w-md mx-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for societies, events, or members..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                        <svg
                            className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-3-3h-5l3-3H9l-3 3h5l-3 3H3"
                            />
                        </svg>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                        >
                            <img
                                src={
                                    userData?.profilePicture ||
                                    "/default-avatar.png"
                                }
                                alt={userData?.firstName}
                                className="w-8 h-8 rounded-full bg-gray-300"
                            />
                            <span className="text-sm font-medium text-gray-700">
                                {userData?.firstName || "User"}
                            </span>
                            <svg
                                className="w-4 h-4 text-gray-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                                <div className="py-1">
                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile Settings
                                    </Link>
                                    <Link
                                        to="/notifications"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Notifications
                                    </Link>
                                    <hr className="my-1" />
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
