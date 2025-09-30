import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Common/Header";

const Events = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedTime, setSelectedTime] = useState("Upcoming");

    // Sample events data - you can replace this with API calls later
    const events = [
        {
            id: 1,
            title: "AI/ML Workshop Series",
            society: "Computer Science Society",
            category: "Technical",
            date: "2025-08-25",
            time: "10:00 AM",
            duration: "4 hours",
            venue: "Computer Lab 1",
            description:
                "Comprehensive workshop covering machine learning fundamentals, neural networks, and hands-on projects with popular frameworks.",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
            attendees: 45,
            maxAttendees: 50,
            price: "Free",
            tags: ["Machine Learning", "AI", "Hands-on"],
            status: "upcoming",
        },
        {
            id: 2,
            title: "Cultural Night 2025",
            society: "Cultural Arts Society",
            category: "Cultural",
            date: "2025-08-30",
            time: "6:00 PM",
            duration: "3 hours",
            venue: "Main Auditorium",
            description:
                "Annual cultural celebration featuring music, dance, drama performances from students representing various cultural backgrounds.",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            attendees: 180,
            maxAttendees: 200,
            price: "₹50",
            tags: ["Music", "Dance", "Cultural"],
            status: "upcoming",
        },
        {
            id: 3,
            title: "Robotics Competition",
            society: "Robotics Club",
            category: "Technical",
            date: "2025-09-05",
            time: "9:00 AM",
            duration: "6 hours",
            venue: "Engineering Block",
            description:
                "Inter-college robotics competition where teams showcase their innovative robot designs and compete in various challenges.",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            attendees: 25,
            maxAttendees: 30,
            price: "₹200",
            tags: ["Competition", "Innovation", "Robotics"],
            status: "upcoming",
        },
        {
            id: 4,
            title: "Photography Exhibition",
            society: "Photography Society",
            category: "Creative",
            date: "2025-09-10",
            time: "11:00 AM",
            duration: "All Day",
            venue: "Art Gallery",
            description:
                "Annual exhibition showcasing the best photography works by students, featuring various themes and techniques.",
            image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=250&fit=crop",
            attendees: 0,
            maxAttendees: 100,
            price: "Free",
            tags: ["Exhibition", "Art", "Photography"],
            status: "upcoming",
        },
        {
            id: 5,
            title: "Debate Championship",
            society: "Debate Society",
            category: "Academic",
            date: "2025-08-15",
            time: "2:00 PM",
            duration: "5 hours",
            venue: "Seminar Hall",
            description:
                "Inter-college debate championship with topics covering current affairs, technology, and social issues.",
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
            attendees: 60,
            maxAttendees: 60,
            price: "Free",
            tags: ["Debate", "Competition", "Current Affairs"],
            status: "completed",
        },
        {
            id: 6,
            title: "Green Campus Initiative",
            society: "Environmental Club",
            category: "Social",
            date: "2025-08-10",
            time: "8:00 AM",
            duration: "4 hours",
            venue: "Campus Grounds",
            description:
                "Tree plantation drive and awareness campaign about environmental conservation and sustainable practices.",
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
            attendees: 85,
            maxAttendees: 100,
            price: "Free",
            tags: ["Environment", "Sustainability", "Community"],
            status: "completed",
        },
        {
            id: 7,
            title: "Basketball Tournament",
            society: "Basketball Team",
            category: "Sports",
            date: "2025-09-15",
            time: "4:00 PM",
            duration: "2 hours",
            venue: "Sports Complex",
            description:
                "Inter-department basketball tournament with teams competing for the championship trophy.",
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
            attendees: 12,
            maxAttendees: 16,
            price: "Free",
            tags: ["Tournament", "Sports", "Competition"],
            status: "upcoming",
        },
        {
            id: 8,
            title: "Startup Pitch Day",
            society: "Entrepreneurship Cell",
            category: "Business",
            date: "2025-09-20",
            time: "1:00 PM",
            duration: "4 hours",
            venue: "Business Center",
            description:
                "Students present their startup ideas to industry experts and potential investors for feedback and funding opportunities.",
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
            attendees: 15,
            maxAttendees: 25,
            price: "₹100",
            tags: ["Startup", "Pitch", "Innovation"],
            status: "upcoming",
        },
    ];

    const categories = [
        "All",
        "Technical",
        "Cultural",
        "Creative",
        "Academic",
        "Social",
        "Sports",
        "Business",
    ];
    const timeFilters = ["All", "Upcoming", "Completed"];

    const filteredEvents = events.filter((event) => {
        const categoryMatch =
            selectedCategory === "All" || event.category === selectedCategory;
        const timeMatch =
            selectedTime === "All" ||
            event.status === selectedTime.toLowerCase();
        return categoryMatch && timeMatch;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const isEventFull = (event) => event.attendees >= event.maxAttendees;
    const isEventPast = (event) => new Date(event.date) < new Date();

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        College Events
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Discover exciting events happening across all college
                        societies
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Time Filter */}
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Filter by Time
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {timeFilters.map((timeFilter) => (
                                <button
                                    key={timeFilter}
                                    onClick={() => setSelectedTime(timeFilter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        selectedTime === timeFilter
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {timeFilter}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                            Filter by Category
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        setSelectedCategory(category)
                                    }
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                        selectedCategory === category
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {selectedTime} Events
                        </h2>
                        <p className="text-gray-600">
                            Showing {filteredEvents.length}{" "}
                            {filteredEvents.length === 1 ? "event" : "events"}
                        </p>
                    </div>

                    {filteredEvents.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Event Image */}
                                    <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                                                    event.category ===
                                                    "Technical"
                                                        ? "bg-blue-500"
                                                        : event.category ===
                                                            "Cultural"
                                                          ? "bg-purple-500"
                                                          : event.category ===
                                                              "Creative"
                                                            ? "bg-pink-500"
                                                            : event.category ===
                                                                "Academic"
                                                              ? "bg-indigo-500"
                                                              : event.category ===
                                                                  "Social"
                                                                ? "bg-green-500"
                                                                : event.category ===
                                                                    "Sports"
                                                                  ? "bg-orange-500"
                                                                  : "bg-amber-500"
                                                }`}
                                            >
                                                {event.category}
                                            </span>
                                        </div>
                                        {event.status === "completed" && (
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-800 text-white">
                                                    Completed
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Event Content */}
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                                {event.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm text-emerald-600 font-medium mb-2">
                                            {event.society}
                                        </p>

                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {event.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {event.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Event Details */}
                                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {formatDate(event.date)} at{" "}
                                                {event.time}
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {event.venue}
                                            </div>
                                            <div className="flex items-center">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                Duration: {event.duration}
                                            </div>
                                        </div>

                                        {/* Attendees and Price */}
                                        <div className="flex justify-between items-center mb-4">
                                            <div className="text-sm">
                                                <span
                                                    className={`font-medium ${isEventFull(event) ? "text-red-600" : "text-gray-900"}`}
                                                >
                                                    {event.attendees}/
                                                    {event.maxAttendees}{" "}
                                                    attendees
                                                </span>
                                                {isEventFull(event) && (
                                                    <span className="block text-red-600 text-xs">
                                                        Event Full
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <span className="text-lg font-bold text-emerald-600">
                                                    {event.price}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            {event.status === "upcoming" ? (
                                                <>
                                                    <Link
                                                        to="/signup"
                                                        className={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                                                            isEventFull(event)
                                                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                                                        }`}
                                                    >
                                                        {isEventFull(event)
                                                            ? "Event Full"
                                                            : "Register"}
                                                    </Link>
                                                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                                        Details
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="flex-1 bg-gray-200 text-gray-600 text-center py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                                                    Event Completed
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No events found
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                No events match your current filters. Try
                                adjusting your selection.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Want to Organize an Event?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8">
                        Join a society and start organizing amazing events for
                        the college community!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/societies"
                            className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200"
                        >
                            Browse Societies
                        </Link>
                        <Link
                            to="/signup"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                        >
                            Join Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">
                                College Societies Hub
                            </h3>
                            <p className="text-gray-400">
                                Connecting all societies in our college through
                                a unified platform for events and activities.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Explore
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/societies"
                                        className="hover:text-white"
                                    >
                                        All Societies
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/events"
                                        className="hover:text-white"
                                    >
                                        Upcoming Events
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-white"
                                    >
                                        About Platform
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                For Participants
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link
                                        to="/login"
                                        className="hover:text-white"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="hover:text-white"
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">
                                Contact
                            </h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>societies@yourcollege.edu</li>
                                <li>+1 (555) 123-4567</li>
                                <li>Student Affairs Office</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>
                            &copy; 2025 College Societies Management Platform.
                            All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Events;
