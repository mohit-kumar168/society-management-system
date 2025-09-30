import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Common/Header";

const SignIn = () => {
    const navigate = useNavigate();
    const { checkAuth } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Refresh auth state first, then navigate
                await checkAuth();

                // Get role from login response
                const userRole = data.data?.user?.role;

                // Add a small delay to ensure auth state is updated
                setTimeout(() => {
                    switch (userRole) {
                        case "admin":
                            navigate("/admin/dashboard");
                            break;
                        case "convenor":
                            navigate("/convenor/dashboard");
                            break;
                        case "leader":
                            navigate("/leader/dashboard");
                            break;
                        case "member":
                            navigate("/member");
                            break;
                        default:
                            navigate("/");
                            break;
                    }
                }, 200);
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-3 text-gray-600">
                            Sign in to access your college society dashboard
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    disabled={isLoading}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Remember Me and Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Signing in...
                                    </div>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors duration-200"
                                >
                                    Create one now
                                </Link>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        New to our platform?
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Guest Access */}
                        <div className="mt-6">
                            <Link
                                to="/societies"
                                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                            >
                                Browse as Guest
                            </Link>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-500">
                            Join thousands of students connecting through
                            college societies
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
