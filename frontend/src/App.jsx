import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Home from "./pages/guest/Home";
import Societies from "./pages/guest/Societies";
import Events from "./pages/guest/Events";
import AboutUs from "./pages/guest/AboutUs";
import SignIn from "./pages/auth/SIgnIn";
import SignUp from "./pages/auth/SignUp";
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
            <HashRouter>
                <AppRoutes />
            </HashRouter>
        </AuthProvider>
    );
};

export default App;
