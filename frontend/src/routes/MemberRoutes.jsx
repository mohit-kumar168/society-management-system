import React from "react";
import { Routes, Route } from "react-router-dom";
import MemberDashboard from "../pages/dashboard/member/MemberDashboard";
import MemberSocieties from "../pages/dashboard/member/MemberSocieties";
import Events from "../pages/dashboard/member/Events";

const MemberRoutes = () => {
    return (
        <Routes>
            <Route path="" element={<MemberDashboard />} />
            <Route path="societies" element={<MemberSocieties />} />
            <Route path="events" element={<Events />} />
            {/* Add more member routes here */}
        </Routes>
    );
};

export default MemberRoutes;
