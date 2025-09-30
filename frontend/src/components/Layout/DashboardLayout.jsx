import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ children, userRole, userData }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <DashboardHeader userData={userData} />

            <div className="flex">
                {/* Sidebar */}
                <DashboardSidebar userRole={userRole} />

                {/* Main Content */}
                <main className="flex-1 ml-64 pt-16">
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
