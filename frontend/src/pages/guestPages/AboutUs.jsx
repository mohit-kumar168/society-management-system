import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const AboutUs = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        About Our Platform
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
                        Empowering college societies to connect, collaborate,
                        and create amazing experiences for students across our
                        campus community.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                We believe that college life is enriched through
                                active participation in societies and events.
                                Our platform serves as the central hub for all
                                college societies, making it easier for students
                                to discover opportunities, join communities, and
                                participate in meaningful activities.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                By bringing all societies under one digital
                                roof, we're fostering collaboration, increasing
                                participation, and ensuring no student misses
                                out on the vibrant extracurricular life our
                                college has to offer.
                            </p>
                        </div>
                        <div className="lg:text-right">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"
                                alt="Students collaborating"
                                className="rounded-lg shadow-lg w-full max-w-lg ml-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            What We Do
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our platform streamlines society management and
                            enhances student engagement through innovative
                            features and seamless user experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
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
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Society Management
                            </h3>
                            <p className="text-gray-600">
                                Comprehensive tools for society leaders to
                                manage members, organize events, and track
                                activities efficiently.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
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
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Event Organization
                            </h3>
                            <p className="text-gray-600">
                                Streamlined event creation, registration
                                management, and attendance tracking for all
                                society events.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
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
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Discovery Platform
                            </h3>
                            <p className="text-gray-600">
                                Easy-to-use interface for students to discover
                                societies, browse events, and find their perfect
                                community.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Seamless Registration
                            </h3>
                            <p className="text-gray-600">
                                Quick and easy registration process for joining
                                societies and signing up for events with just a
                                few clicks.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Real-time Updates
                            </h3>
                            <p className="text-gray-600">
                                Stay informed with instant notifications about
                                new events, society updates, and important
                                announcements.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Analytics & Insights
                            </h3>
                            <p className="text-gray-600">
                                Detailed analytics for society leaders to track
                                engagement, measure event success, and plan
                                future activities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="lg:order-2">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                Born from the need to simplify and enhance
                                college life, our platform was created by
                                students, for students. We recognized that
                                managing multiple societies and keeping track of
                                countless events was becoming increasingly
                                challenging in our digital age.
                            </p>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                What started as a simple idea to centralize
                                society information has evolved into a
                                comprehensive platform that serves thousands of
                                students across our college, facilitating
                                connections and fostering community engagement.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/societies"
                                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200 text-center"
                                >
                                    Explore Societies
                                </Link>
                                <Link
                                    to="/events"
                                    className="border-2 border-emerald-600 text-emerald-600 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors duration-200 text-center"
                                >
                                    View Events
                                </Link>
                            </div>
                        </div>
                        <div className="lg:order-1">
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                                alt="College campus"
                                className="rounded-lg shadow-lg w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide us in building a better
                            college community
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-8 h-8 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Community First
                            </h3>
                            <p className="text-gray-600">
                                We prioritize building strong, inclusive
                                communities where every student feels welcome
                                and valued.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-8 h-8 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Innovation
                            </h3>
                            <p className="text-gray-600">
                                We continuously innovate to provide better tools
                                and experiences for society management and
                                student engagement.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg
                                    className="w-8 h-8 text-emerald-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Transparency
                            </h3>
                            <p className="text-gray-600">
                                We believe in open communication and transparent
                                processes that build trust within our community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 bg-emerald-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
                        <p className="text-xl text-emerald-100">
                            Making a difference in college life, one connection
                            at a time
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold mb-2">25+</div>
                            <div className="text-emerald-100">
                                Active Societies
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">800+</div>
                            <div className="text-emerald-100">
                                Registered Students
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">200+</div>
                            <div className="text-emerald-100">
                                Events Organized
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-emerald-100">
                                Competitions Held
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Ready to Join Our Community?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Start your journey today and become part of something
                        amazing!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/signup"
                            className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors duration-200"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/societies"
                            className="border-2 border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-600 hover:text-white transition-colors duration-200"
                        >
                            Explore Societies
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

export default AboutUs;
