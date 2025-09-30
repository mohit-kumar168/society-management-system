import React, { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const MemberSocieties = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@college.edu",
        role: "member",
        profilePicture: null,
    };

    // Sample societies data - replace with actual API data
    const societies = [
        {
            id: 1,
            name: "Xposure",
            description:
                "The Film & Photography Society of Dyal Singh College, University of Delhi",
            logo: "/api/placeholder/80/80", // Replace with actual logo path
            memberCount: 30,
            role: "Member",
            status: "Active",
        },
        {
            id: 2,
            name: "Jamini",
            description:
                "The Fine Arts Society of Dyal Singh College, University of Delhi",
            logo: "/api/placeholder/80/80", // Replace with actual logo path
            memberCount: 50,
            role: "Member",
            status: "Active",
        },
        {
            id: 3,
            name: "Tech Club",
            description:
                "Technology and Innovation Society of Dyal Singh College",
            logo: "/api/placeholder/80/80", // Replace with actual logo path
            memberCount: 75,
            role: "Member",
            status: "Active",
        },
        {
            id: 4,
            name: "Drama Society",
            description: "Theatrical Arts and Performance Society",
            logo: "/api/placeholder/80/80", // Replace with actual logo path
            memberCount: 45,
            role: "Member",
            status: "Active",
        },
    ];

    const filteredSocieties = societies.filter(
        (society) =>
            society.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            society.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout userRole="member" userData={userData}>
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white">
                    <h1 className="text-4xl font-bold mb-2">My Societies</h1>
                    <p className="text-emerald-100 text-lg">
                        Here's a quick view of the societies you're part of.
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                            className="h-5 w-5 text-gray-400"
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
                    <input
                        type="text"
                        placeholder="Search societies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                </div>
            </div>

            {/* Societies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSocieties.map((society) => (
                    <div
                        key={society.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                    >
                        <div className="p-6">
                            {/* Society Header */}
                            <div className="flex items-start space-x-4 mb-4">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                        {/* Placeholder for society logo */}
                                        <span className="text-2xl font-bold text-gray-500">
                                            {society.name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-xl font-bold text-gray-900 truncate">
                                        {society.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                        {society.description}
                                    </p>
                                </div>
                            </div>

                            {/* Society Stats */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            {society.memberCount} Members
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-1 text-gray-600">
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                            />
                                        </svg>
                                        <span className="text-sm font-medium">
                                            Your Role: {society.role}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                                    View Details
                                </button>
                                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                                    Events
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredSocieties.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchTerm ? "No societies found" : "No societies yet"}
                    </h3>
                    <p className="text-gray-600">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : "You haven't joined any societies yet. Start exploring!"}
                    </p>
                    {!searchTerm && (
                        <button className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                            Browse Societies
                        </button>
                    )}
                </div>
            )}

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Total Societies
                    </h3>
                    <p className="text-3xl font-bold text-emerald-600">
                        {societies.length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Active Memberships
                    </h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {societies.filter((s) => s.status === "Active").length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Leadership Roles
                    </h3>
                    <p className="text-3xl font-bold text-purple-600">
                        {societies.filter((s) => s.role !== "Member").length}
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MemberSocieties;
