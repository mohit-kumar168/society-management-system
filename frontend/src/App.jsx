import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/guestPages/Home";
import Societies from "./pages/guestPages/Societies";
import Events from "./pages/guestPages/Events";
import AboutUs from "./pages/guestPages/AboutUs";
import SignIn from "./pages/authPages/SIgnIn";
import SignUp from "./pages/authPages/SignUp";
import AdminRoutes from "./routes/AdminRoutes";
import ConvenorRoutes from "./routes/ConvenorRoutes";
import MemberRoutes from "./routes/MemberRoutes";

const AppRoutes = () => {
    const { role, authCheck } = useAuth();

    if (!authCheck) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Protected dashboard routes */}
            {role === "admin" && (
                <Route path="/admin/*" element={<AdminRoutes />} />
            )}
            {role === "convenor" && (
                <Route path="/convenor/*" element={<ConvenorRoutes />} />
            )}
            {(role === "member" || role === "leader") && (
                <Route path="/member/*" element={<MemberRoutes />} />
            )}
            {role === "leader" && (
                <Route path="/leader/*" element={<MemberRoutes />} />
            )}

            {/* Public routes - always available */}
            <Route path="/" element={<Home />} />
            <Route path="/societies" element={<Societies />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;
