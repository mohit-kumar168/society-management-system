import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Common/Header";
import Footer from "../../components/Common/Footer";

const Home = () => {
    return (
        <>
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            Discover All
                            <span className="text-emerald-200 block">
                                College Societies
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-emerald-100 max-w-3xl mx-auto">
                            Explore activities from all societies in our
                            college. Join events, competitions, and workshops
                            from various clubs and organizations!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/societies"
                                className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-lg"
                            >
                                Explore Societies
                            </Link>
                            <Link
                                to="/events"
                                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                            >
                                Browse Events
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            What You'll Find
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Explore diverse activities from all societies in our
                            college community
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
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
                                Multiple Societies
                            </h3>
                            <p className="text-gray-600">
                                Browse through all active societies in our
                                college - from technical clubs to cultural
                                groups, sports teams to academic societies.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-amber-600"
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
                                Diverse Events
                            </h3>
                            <p className="text-gray-600">
                                Discover workshops, competitions, seminars,
                                cultural events, and technical sessions
                                organized by different societies.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-6">
                                <svg
                                    className="w-6 h-6 text-rose-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Easy Registration
                            </h3>
                            <p className="text-gray-600">
                                Simple registration process to participate in
                                events from any society. Join competitions and
                                activities that interest you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">
                            Our College Community
                        </h2>
                        <p className="text-xl text-gray-600">
                            The impact of all societies in our college
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-emerald-600 mb-2">
                                25+
                            </div>
                            <div className="text-gray-600">
                                Active Societies
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-amber-600 mb-2">
                                800+
                            </div>
                            <div className="text-gray-600">Society Members</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-rose-600 mb-2">
                                200+
                            </div>
                            <div className="text-gray-600">
                                Events Conducted
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-indigo-600 mb-2">
                                50+
                            </div>
                            <div className="text-gray-600">Competitions</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold mb-4">
                        Ready to Explore?
                    </h2>
                    <p className="text-xl mb-8 text-emerald-100 max-w-2xl mx-auto">
                        Discover and participate in activities from all college
                        societies through our unified platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/societies"
                            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-50 transition-colors duration-200 shadow-lg"
                        >
                            Start Exploring
                        </Link>
                        <Link
                            to="/societies"
                            className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors duration-200"
                        >
                            View Societies
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </>
    );
};

export default Home;
