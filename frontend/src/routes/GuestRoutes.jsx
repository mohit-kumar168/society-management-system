import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/guestPages/Home";
import AuthRoutes from "./AuthRoutes";
import Societies from "../pages/guestPages/Societies";
import Events from "../pages/guestPages/Events";
import AboutUs from "../pages/guestPages/AboutUs";

const GuestRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
        </Routes>
    );
};

export default GuestRoutes;
