import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const Societies = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Sample societies data - you can replace this with API calls later
    const societies = [
        {
            id: 1,
            name: "Computer Science Society",
            category: "Technical",
            description:
                "Dedicated to promoting computer science education through workshops, coding competitions, and tech talks.",
            members: 120,
            events: 25,
            image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
            tags: ["Programming", "AI/ML", "Web Development"],
            established: 2018,
        },
        {
            id: 2,
            name: "Cultural Arts Society",
            category: "Cultural",
            description:
                "Celebrating diversity through music, dance, theater, and art exhibitions. Join us for cultural festivals and creative workshops.",
            members: 85,
            events: 18,
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop",
            tags: ["Music", "Dance", "Theater", "Art"],
            established: 2015,
        },
        {
            id: 3,
            name: "Robotics Club",
            category: "Technical",
            description:
                "Building the future through robotics and automation. Participate in competitions and hands-on projects.",
            members: 65,
            events: 15,
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop",
            tags: ["Robotics", "Arduino", "IoT"],
            established: 2019,
        },
        {
            id: 4,
            name: "Photography Society",
            category: "Creative",
            description:
                "Capturing moments and telling stories through the lens. Weekly photo walks and editing workshops.",
            members: 45,
            events: 12,
            image: "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=250&fit=crop",
            tags: ["Photography", "Editing", "Visual Arts"],
            established: 2017,
        },
        {
            id: 5,
            name: "Debate Society",
            category: "Academic",
            description:
                "Sharpening minds through structured debates, public speaking, and critical thinking exercises.",
            members: 55,
            events: 20,
            image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
            tags: ["Debate", "Public Speaking", "Critical Thinking"],
            established: 2016,
        },
        {
            id: 6,
            name: "Environmental Club",
            category: "Social",
            description:
                "Creating awareness about environmental issues and promoting sustainable practices on campus.",
            members: 70,
            events: 16,
            image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
            tags: ["Sustainability", "Conservation", "Awareness"],
            established: 2014,
        },
        {
            id: 7,
            name: "Basketball Team",
            category: "Sports",
            description:
                "Competitive basketball team representing our college in inter-college tournaments and leagues.",
            members: 25,
            events: 30,
            image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
            tags: ["Basketball", "Tournaments", "Fitness"],
            established: 2013,
        },
        {
            id: 8,
            name: "Entrepreneurship Cell",
            category: "Business",
            description:
                "Fostering innovation and entrepreneurial spirit through startup competitions and mentorship programs.",
            members: 90,
            events: 22,
            image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
            tags: ["Startups", "Innovation", "Business"],
            established: 2020,
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

    const filteredSocieties =
        selectedCategory === "All"
            ? societies
            : societies.filter(
                  (society) => society.category === selectedCategory
              );

    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Explore Our Societies
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
                        Discover diverse communities and find your passion among
                        our {societies.length} active societies
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
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
            </section>

            {/* Societies Grid */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            {selectedCategory === "All"
                                ? "All Societies"
                                : `${selectedCategory} Societies`}
                        </h2>
                        <p className="text-gray-600">
                            Showing {filteredSocieties.length}{" "}
                            {filteredSocieties.length === 1
                                ? "society"
                                : "societies"}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredSocieties.map((society) => (
                            <div
                                key={society.id}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                {/* Society Image */}
                                <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-500 relative overflow-hidden">
                                    <img
                                        src={society.image}
                                        alt={society.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                                                society.category === "Technical"
                                                    ? "bg-blue-500"
                                                    : society.category ===
                                                        "Cultural"
                                                      ? "bg-purple-500"
                                                      : society.category ===
                                                          "Creative"
                                                        ? "bg-pink-500"
                                                        : society.category ===
                                                            "Academic"
                                                          ? "bg-indigo-500"
                                                          : society.category ===
                                                              "Social"
                                                            ? "bg-green-500"
                                                            : society.category ===
                                                                "Sports"
                                                              ? "bg-orange-500"
                                                              : "bg-amber-500"
                                            }`}
                                        >
                                            {society.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Society Content */}
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {society.name}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            Est. {society.established}
                                        </span>
                                    </div>

                                    <p className="text-gray-600 mb-4 line-clamp-3">
                                        {society.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {society.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {society.members} members
                                        </div>
                                        <div className="flex items-center">
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {society.events} events
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Link
                                            to="/signup"
                                            className="flex-1 bg-emerald-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200"
                                        >
                                            Join Society
                                        </Link>
                                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Can't Find What You're Looking For?
                    </h2>
                    <p className="text-xl text-emerald-100 mb-8">
                        Have an idea for a new society? Contact us to start your
                        own community!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors duration-200"
                        >
                            Get Started
                        </Link>
                        <a
                            href="mailto:societies@yourcollege.edu"
                            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                        >
                            Contact Us
                        </a>
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

export default Societies;
