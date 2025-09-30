import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardSidebar = ({ userRole }) => {
    const location = useLocation();

    const memberMenuItems = [
        { icon: "📊", label: "Overview", path: "/member" },
        { icon: "🏛️", label: "My Societies", path: "/member/societies" },
        { icon: "📅", label: "My Events", path: "/member/events" },
        { icon: "📄", label: "Schedule", path: "/member/schedule" },
        { icon: "📋", label: "Documents", path: "/member/documents" },
        { icon: "🔔", label: "Notifications", path: "/member/notifications" },
        { icon: "⚙️", label: "Settings", path: "/member/settings" },
    ];

    const leaderMenuItems = [
        { icon: "📊", label: "Overview", path: "/leader" },
        { icon: "🏛️", label: "My Society", path: "/leader/society" },
        { icon: "👥", label: "Members", path: "/leader/members" },
        { icon: "📅", label: "Events", path: "/leader/events" },
        { icon: "📊", label: "Analytics", path: "/leader/analytics" },
        { icon: "📢", label: "Announcements", path: "/leader/announcements" },
        { icon: "⚙️", label: "Settings", path: "/leader/settings" },
    ];

    const convenorMenuItems = [
        { icon: "📊", label: "Overview", path: "/convenor" },
        { icon: "🏛️", label: "All Societies", path: "/convenor/societies" },
        { icon: "📅", label: "All Events", path: "/convenor/events" },
        { icon: "👥", label: "Users", path: "/convenor/users" },
        { icon: "📊", label: "Analytics", path: "/convenor/analytics" },
        { icon: "⚙️", label: "Settings", path: "/convenor/settings" },
    ];

    const adminMenuItems = [
        { icon: "📊", label: "Overview", path: "/admin" },
        { icon: "🏛️", label: "Societies", path: "/admin/societies" },
        { icon: "👥", label: "Users", path: "/admin/users" },
        { icon: "📅", label: "Events", path: "/admin/events" },
        { icon: "📊", label: "Analytics", path: "/admin/analytics" },
        { icon: "⚙️", label: "System Settings", path: "/admin/settings" },
    ];

    const getMenuItems = () => {
        switch (userRole) {
            case "leader":
                return leaderMenuItems;
            case "convenor":
                return convenorMenuItems;
            case "admin":
                return adminMenuItems;
            default:
                return memberMenuItems;
        }
    };

    const menuItems = getMenuItems();

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white shadow-sm border-r border-gray-200 overflow-y-auto">
            <nav className="p-4 space-y-2">
                {menuItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={index}
                            to={item.path}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                isActive
                                    ? "bg-emerald-50 text-gray-900 border-r-4 border-blue-400"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="absolute bottom-4 left-4 right-4 pt-4 border-t border-gray-200">
                <Link
                    to="/support"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-colors duration-200"
                >
                    <span className="text-lg">💬</span>
                    <span className="font-medium">Support</span>
                </Link>
            </div>
        </aside>
    );
};

export default DashboardSidebar;
