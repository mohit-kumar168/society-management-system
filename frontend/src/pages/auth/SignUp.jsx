import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Common/Header";

const SignUp = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
        collegeId: "",
        profilePicture: null,
    });

    const roles = [
        {
            value: "member",
            label: "Member",
            description: "Join societies and participate in events",
        },
        {
            value: "leader",
            label: "Society Leader",
            description: "Lead a society and organize events",
        },
        {
            value: "convenor",
            label: "Convenor",
            description: "Manage multiple societies and events",
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            profilePicture: file,
        }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!formData.firstName.trim()) {
                    setError("First name is required");
                    return false;
                }
                if (!formData.email.trim()) {
                    setError("Email is required");
                    return false;
                }
                if (!formData.email.includes("@")) {
                    setError("Please enter a valid email");
                    return false;
                }
                break;
            case 2:
                if (!formData.password) {
                    setError("Password is required");
                    return false;
                }
                if (formData.password.length < 6) {
                    setError("Password must be at least 6 characters");
                    return false;
                }
                if (formData.password !== formData.confirmPassword) {
                    setError("Passwords don't match");
                    return false;
                }
                if (!formData.role) {
                    setError("Please select a role");
                    return false;
                }
                if (!formData.collegeId.trim()) {
                    setError("College ID is required");
                    return false;
                }
                break;
            default:
                break;
        }
        setError("");
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setError("");
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateStep(currentStep)) return;

        setLoading(true);
        setError("");

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("firstName", formData.firstName);
            if (formData.lastName.trim()) {
                formDataToSend.append("lastName", formData.lastName);
            }
            formDataToSend.append("email", formData.email);
            formDataToSend.append("password", formData.password);
            formDataToSend.append("role", formData.role);
            formDataToSend.append("collegeId", formData.collegeId);

            if (formData.profilePicture) {
                formDataToSend.append(
                    "profilePicture",
                    formData.profilePicture
                );
            }

            const response = await fetch("/api/v1/users/register", {
                method: "POST",
                body: formDataToSend,
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/");
            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <Header />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Notice for Visitors */}
                    <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-blue-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-blue-800">
                                    For Society Members Only
                                </h3>
                                <div className="mt-2 text-sm text-blue-700">
                                    <p>
                                        This registration is for college society
                                        members, leaders, convenors, and
                                        administrators only.
                                        <br />
                                        <strong>Visitors:</strong> You can
                                        browse societies and events without
                                        creating an account.{" "}
                                        <Link
                                            to="/societies"
                                            className="underline font-medium"
                                        >
                                            Start exploring →
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <div className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= 1
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-300 text-gray-600"
                                    }`}
                                >
                                    1
                                </div>
                                <div
                                    className={`w-16 h-1 ${currentStep >= 2 ? "bg-emerald-600" : "bg-gray-300"}`}
                                ></div>
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                        currentStep >= 2
                                            ? "bg-emerald-600 text-white"
                                            : "bg-gray-300 text-gray-600"
                                    }`}
                                >
                                    2
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {currentStep === 1 && "Personal Information"}
                                {currentStep === 2 && "Account Setup"}
                            </h2>
                            <p className="text-gray-600 mt-2">
                                Step {currentStep} of 2
                            </p>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <form onSubmit={handleSubmit}>
                            {/* Step 1: Personal Information */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Enter your first name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Last Name{" "}
                                            <span className="text-gray-400">
                                                (Optional)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Enter your last name"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Account Setup */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Password *
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Create a password (min. 6 characters)"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Confirm Password *
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Confirm your password"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="collegeId"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            College ID *
                                        </label>
                                        <input
                                            type="text"
                                            id="collegeId"
                                            name="collegeId"
                                            value={formData.collegeId}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                            placeholder="Enter your college ID"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-3">
                                            Role *
                                        </label>
                                        <div className="space-y-3">
                                            {roles.map((role) => (
                                                <label
                                                    key={role.value}
                                                    className="flex items-start cursor-pointer"
                                                >
                                                    <input
                                                        type="radio"
                                                        name="role"
                                                        value={role.value}
                                                        checked={
                                                            formData.role ===
                                                            role.value
                                                        }
                                                        onChange={
                                                            handleInputChange
                                                        }
                                                        className="mt-1 h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                                                    />
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {role.label}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {role.description}
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="profilePicture"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Profile Picture{" "}
                                            <span className="text-gray-400">
                                                (Optional)
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            id="profilePicture"
                                            name="profilePicture"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">
                                        {error}
                                    </p>
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="mt-8 flex justify-between">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        Previous
                                    </button>
                                )}

                                {currentStep < 2 ? (
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className={`px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors duration-200 ${
                                            currentStep === 1
                                                ? "w-full"
                                                : "ml-auto"
                                        }`}
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="ml-auto px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                    >
                                        {loading
                                            ? "Creating Account..."
                                            : "Create Account"}
                                    </button>
                                )}
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="text-emerald-600 font-medium hover:text-emerald-700"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
