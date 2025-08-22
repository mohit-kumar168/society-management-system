import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "../pages/authPages/SIgnIn";
import SignUp from "../pages/authPages/SignUp";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
};

export default AuthRoutes;
