import React from "react";
import { Routes, Route } from "react-router-dom";
import MemberDashboard from "../pages/memberPages/MemberDashboard";

const MemberRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<MemberDashboard />} />
            {/* Add more member routes here */}
        </Routes>
    );
};

export default MemberRoutes;
