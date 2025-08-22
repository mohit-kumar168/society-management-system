import React from "react";
import DashboardLayout from "../../components/DashboardLayout";

const MemberDashboard = () => {
    // Mock user data - replace with actual user data from context/state
    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@college.edu",
        role: "member",
        profilePicture: null,
    };

    return (
        <DashboardLayout userRole="member" userData={userData}>
            {/* Welcome Section */}
            <div className="mb-8">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome, {userData.firstName}!
                    </h1>
                    <p className="text-emerald-100">
                        Stay on top of your society activities and upcoming
                        events.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                My Societies
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                3
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <span className="text-emerald-600 text-xl">🏛️</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Upcoming Events
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                5
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 text-xl">📅</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Events Attended
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                12
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <span className="text-purple-600 text-xl">🎯</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">
                                Notifications
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                8
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-xl">🔔</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Recent Activities
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    action: "Joined Tech Society",
                                    time: "2 hours ago",
                                    type: "join",
                                },
                                {
                                    action: "Registered for Workshop: React Basics",
                                    time: "1 day ago",
                                    type: "event",
                                },
                                {
                                    action: "Attended Cultural Fest Planning Meeting",
                                    time: "3 days ago",
                                    type: "attendance",
                                },
                                {
                                    action: "Updated profile information",
                                    time: "1 week ago",
                                    type: "profile",
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                                >
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            activity.type === "join"
                                                ? "bg-green-500"
                                                : activity.type === "event"
                                                  ? "bg-blue-500"
                                                  : activity.type ===
                                                      "attendance"
                                                    ? "bg-purple-500"
                                                    : "bg-gray-500"
                                        }`}
                                    ></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">
                                            {activity.action}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions & Upcoming */}
                <div className="space-y-6">
                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Quick Actions
                        </h3>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-emerald-600">
                                    + Join New Society
                                </span>
                            </button>
                            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-blue-600">
                                    📅 Browse Events
                                </span>
                            </button>
                            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                                <span className="text-purple-600">
                                    ⚙️ Update Profile
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                            Upcoming Events
                        </h3>
                        <div className="space-y-3">
                            {[
                                {
                                    name: "Tech Talk: AI in Education",
                                    date: "Today, 3:00 PM",
                                    society: "Tech Society",
                                },
                                {
                                    name: "Cultural Dance Practice",
                                    date: "Tomorrow, 4:00 PM",
                                    society: "Cultural Club",
                                },
                                {
                                    name: "Basketball Tournament",
                                    date: "Friday, 10:00 AM",
                                    society: "Sports Club",
                                },
                            ].map((event, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                                >
                                    <p className="text-sm font-medium text-gray-900">
                                        {event.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {event.date}
                                    </p>
                                    <p className="text-xs text-emerald-600">
                                        {event.society}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MemberDashboard;
