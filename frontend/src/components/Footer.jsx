import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            College Societies Hub
                        </h3>
                        <p className="text-gray-400">
                            Connecting all societies in our college through a
                            unified platform for events and activities.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Explore</h4>
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
                                <Link to="/events" className="hover:text-white">
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="hover:text-white">
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
                                <Link to="/login" className="hover:text-white">
                                    Sign In
                                </Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:text-white">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li>societies@yourcollege.edu</li>
                            <li>+1 (555) 123-4567</li>
                            <li>Student Affairs Office</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>
                        &copy; 2025 College Societies Management Platform. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
