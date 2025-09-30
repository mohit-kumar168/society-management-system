import React, { useState } from "react";
import DashboardLayout from "../../../components/Layout/DashboardLayout";

const Events = () => {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [searchTerm, setSearchTerm] = useState("");

    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@college.edu",
        role: "member",
        profilePicture: null,
    };

    // Sample events data
    const allEvents = [
        {
            id: 1,
            title: "Photography Workshop",
            society: "Xposure",
            date: "2025-10-05",
            time: "14:00",
            location: "Photography Lab",
            type: "Workshop",
            status: "upcoming",
            registered: true,
            description:
                "Learn advanced photography techniques with professional photographers",
            maxParticipants: 30,
            currentParticipants: 24,
            image: "/api/placeholder/300/200",
        },
        {
            id: 2,
            title: "Art Exhibition Opening",
            society: "Jamini",
            date: "2025-10-08",
            time: "18:00",
            location: "College Gallery",
            type: "Exhibition",
            status: "upcoming",
            registered: false,
            description:
                "Annual student art exhibition showcasing creative works",
            maxParticipants: 100,
            currentParticipants: 67,
            image: "/api/placeholder/300/200",
        },
        {
            id: 3,
            title: "Tech Talk: AI in Education",
            society: "Tech Club",
            date: "2025-09-28",
            time: "15:30",
            location: "Auditorium",
            type: "Seminar",
            status: "past",
            registered: true,
            description:
                "Exploring the role of artificial intelligence in modern education",
            maxParticipants: 150,
            currentParticipants: 142,
            image: "/api/placeholder/300/200",
        },
        {
            id: 4,
            title: "Drama Performance: Hamlet",
            society: "Drama Society",
            date: "2025-09-25",
            time: "19:00",
            location: "College Theater",
            type: "Performance",
            status: "past",
            registered: true,
            description:
                "Classic Shakespearean play performed by college drama society",
            maxParticipants: 200,
            currentParticipants: 180,
            image: "/api/placeholder/300/200",
        },
        {
            id: 5,
            title: "Coding Bootcamp",
            society: "Tech Club",
            date: "2025-10-12",
            time: "09:00",
            location: "Computer Lab",
            type: "Workshop",
            status: "upcoming",
            registered: false,
            description:
                "Intensive coding workshop covering web development basics",
            maxParticipants: 25,
            currentParticipants: 18,
            image: "/api/placeholder/300/200",
        },
    ];

    const filteredEvents = allEvents.filter((event) => {
        const matchesTab = event.status === activeTab;
        const matchesSearch =
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.society.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.type.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const upcomingEvents = allEvents.filter(
        (event) => event.status === "upcoming"
    );
    const pastEvents = allEvents.filter((event) => event.status === "past");
    const registeredEvents = allEvents.filter((event) => event.registered);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (timeString) => {
        return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
            "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }
        );
    };

    const getEventTypeColor = (type) => {
        const colors = {
            Workshop: "bg-blue-100 text-blue-800",
            Exhibition: "bg-purple-100 text-purple-800",
            Seminar: "bg-green-100 text-green-800",
            Performance: "bg-red-100 text-red-800",
            Competition: "bg-orange-100 text-orange-800",
        };
        return colors[type] || "bg-gray-100 text-gray-800";
    };

    return (
        <DashboardLayout userRole="member" userData={userData}>
            {/* Header Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-8 text-white">
                    <h1 className="text-4xl font-bold mb-2">My Events</h1>
                    <p className="text-emerald-100 text-lg">
                        Manage your event registrations and discover new
                        opportunities.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Total Events
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                        {allEvents.length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Upcoming
                    </h3>
                    <p className="text-2xl font-bold text-blue-600">
                        {upcomingEvents.length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Registered
                    </h3>
                    <p className="text-2xl font-bold text-emerald-600">
                        {registeredEvents.length}
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                        Attended
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">
                        {pastEvents.filter((e) => e.registered).length}
                    </p>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <div className="relative">
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
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>
                </div>
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                    Browse All Events
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                    {[
                        {
                            key: "upcoming",
                            label: "Upcoming Events",
                            count: upcomingEvents.length,
                        },
                        {
                            key: "past",
                            label: "Past Events",
                            count: pastEvents.length,
                        },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`py-2 px-1 border-b-2 font-medium text-sm ${
                                activeTab === tab.key
                                    ? "border-emerald-500 text-emerald-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                        >
                            {tab.label}
                            <span
                                className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                                    activeTab === tab.key
                                        ? "bg-emerald-100 text-emerald-800"
                                        : "bg-gray-100 text-gray-900"
                                }`}
                            >
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </nav>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                    <div
                        key={event.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                        {/* Event Image */}
                        <div className="h-48 bg-gray-200 relative">
                            <div className="absolute top-4 left-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}
                                >
                                    {event.type}
                                </span>
                            </div>
                            {event.registered && (
                                <div className="absolute top-4 right-4">
                                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                                        Registered
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-6">
                            {/* Event Header */}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {event.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3">
                                    {event.description}
                                </p>
                                <div className="flex items-center space-x-2 text-sm text-emerald-600">
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
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                    <span className="font-medium">
                                        {event.society}
                                    </span>
                                </div>
                            </div>

                            {/* Event Details */}
                            <div className="space-y-2 mb-4">
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>
                                        {formatDate(event.date)} at{" "}
                                        {formatTime(event.time)}
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
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
                                    <span>
                                        {event.currentParticipants}/
                                        {event.maxParticipants} participants
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-emerald-600 h-2 rounded-full"
                                        style={{
                                            width: `${(event.currentParticipants / event.maxParticipants) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-3">
                                {activeTab === "upcoming" ? (
                                    <>
                                        {event.registered ? (
                                            <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200">
                                                Unregister
                                            </button>
                                        ) : (
                                            <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200">
                                                Register
                                            </button>
                                        )}
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                                            View Details
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200">
                                            View Certificate
                                        </button>
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                                            View Details
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
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
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        {searchTerm
                            ? "No events found"
                            : `No ${activeTab} events`}
                    </h3>
                    <p className="text-gray-600">
                        {searchTerm
                            ? "Try adjusting your search terms"
                            : `You don't have any ${activeTab} events yet.`}
                    </p>
                </div>
            )}
        </DashboardLayout>
    );
};

export default Events;
