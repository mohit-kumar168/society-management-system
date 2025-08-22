import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [authCheck, setAuthCheck] = useState(false);
    const [role, setRole] = useState(null);
    const [user, setUser] = useState(null);

    const checkAuth = async () => {
        try {
            const res = await fetch(`/api/v1/users/current-user`, {
                credentials: "include",
            });

            if (res.ok) {
                const data = await res.json();
                if (data && data.data && data.data.role) {
                    setRole(data.data.role);
                    setUser(data.data);
                } else {
                    setRole(null);
                    setUser(null);
                }
            } else {
                setRole(null);
                setUser(null);
            }
        } catch (error) {
            setRole(null);
            setUser(null);
        } finally {
            setAuthCheck(true);
        }
    };

    const logout = async (navigateFunction) => {
        try {
            await fetch(`/api/v1/users/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setRole(null);
            setUser(null);
            setAuthCheck(true);
            // Navigate to home page after logout
            if (navigateFunction) {
                navigateFunction("/");
            }
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        role,
        user,
        authCheck,
        checkAuth,
        logout,
        isAuthenticated: !!role,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
