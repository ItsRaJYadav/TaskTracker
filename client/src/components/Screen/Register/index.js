import React, { useState ,useEffect} from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../../contextApi/auth";

function RegistrationForm() {
    const [auth] = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if (auth?.user) {
            navigate("/");
        }                     //if alredy logged in then user can't access the registration
    }, [auth, navigate]);


    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = formData; // Destructure the formData object


        try {
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                password,

            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Username
                    </label>
                    <div className="relative">
                        <FaUser className="absolute left-0 top-2 text-gray-600" />
                        <input
                            className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Your Name"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <div className="relative">
                        <FaEnvelope className="absolute left-0 top-2 text-gray-600" />
                        <input
                            className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <FaLock className="absolute left-0 top-2 text-gray-600" />
                        <input
                            className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;
