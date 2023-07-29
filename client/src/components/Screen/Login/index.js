import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import WelcomeMessage from "./Welcome";
import { useAuth } from '../../../contextApi/auth'
import { AiOutlineReload } from "react-icons/ai";
import axios from "axios";
function Login() {
  const [auth,setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, SetLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (auth?.user) {
      navigate("/");
    }
  }, [auth, navigate]);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      SetLoading(true);
      const res = await axios.post('/api/v1/auth/login', {
        email,
        password,
      });

      if (res.data.success) {
        SetLoading(false);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("CurrentUser", JSON.stringify(res.data));

        const userData = JSON.parse(localStorage.getItem("CurrentUser"));

        const { name, avtar } = userData.user; // Retrieve from the user data
        toast.custom((t) => (
          <WelcomeMessage name={name} avatar={avtar} />
        ));

        setTimeout(() => {
          navigate(location.state || '/');
        }, 1000);

      } else {
        SetLoading(false);

        toast.error(res.data.message);
      }
    } catch (error) {
      SetLoading(false);

      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('Error submitting form');
      }
    }
  };


  return (
    <div className="flex items-center justify-center h-screen sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded p-8" style={{ width: "400px" }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-1 top-2.5 text-gray-600" />
              <input
                className="pl-8 shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Username"
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
              <FaLock className="absolute left-1 top-2.5 text-gray-600 " />
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
          <div className="flex items-center justify-between">
            {loading ? (
              <div className="flex items-center justify-center mb-6 mt-3">
                <AiOutlineReload className="animate-spin text-2xl mr-2 " />
                Sending req...
              </div>
            ) : (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            )}
            <Link
              to="/forgot-password"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
