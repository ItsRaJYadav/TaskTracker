import React from "react";
import { FaTasks, FaCheckSquare, FaEdit, FaSortAmountUp, FaSearch } from "react-icons/fa";
import Logo from '../../assets/task.png';
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="md:order-2">
            <img src={Logo} alt="TaskTracker App" className="rounded-lg" />
          </div>
          <div className="md:order-1">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">About TaskTracker App</h2>
            <p className="text-gray-700 mb-6">
              TaskTracker App is a simple task management application that helps you stay organized and productive. With TaskTracker, you can create, update, and track your tasks easily.
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">Key features of TaskTracker include:</h3>
              <ul className="list-disc list-inside pl-4">
                <li className="mb-2"><FaTasks className="inline-block mr-2 text-blue-500" /> Creating new tasks</li>
                <li className="mb-2"><FaCheckSquare className="inline-block mr-2 text-blue-500" /> Marking tasks as completed</li>
                <li className="mb-2"><FaEdit className="inline-block mr-2 text-blue-500" /> Editing task details</li>
                <li className="mb-2"><FaSortAmountUp className="inline-block mr-2 text-blue-500" /> Sorting tasks by priority or due date</li>
                <li className="mb-2"><FaSearch className="inline-block mr-2 text-blue-500" /> Searching and filtering tasks</li>
              </ul>
            </div>
            <p className="text-gray-700 mb-6">
              TaskTracker app is designed to be user-friendly and intuitive, providing a seamless task management experience for individuals or teams.
            </p>
            <Link
              to="/contacts"
              className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
