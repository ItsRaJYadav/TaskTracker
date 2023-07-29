import React from "react";
import { FaTasks } from "react-icons/fa";
import Footer from '../../Global/Footer'
import { Link } from "react-router-dom";
import Hero from '../../assets/home.jpg'

const HeroPage = () => {
  return (
    <>
      <div className="bg-white min-h-full">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="lg:w-1/2">
              <img
                src={Hero}
                alt="Task Tracker"
                className="w-full lg:max-w-lg mx-auto"
              />
              
            </div>
            <div className="lg:w-1/2 lg:pl-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                TaskTracker
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Organize your tasks, stay productive, and track your progress with
                TaskTracker. Never miss a deadline again!
              </p>
              <div className="flex items-center">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Manage Your Tasks Effortlessly</p>
              </div>
              <div className="flex items-center mt-4">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Stay on Top of Deadlines</p>
              </div>
              <div className="flex items-center mt-4">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Track Your Progress</p>
              </div>
              <div className="flex items-center mt-4">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Collaborate with Team Members</p>
              </div>
              <div className="flex items-center mt-4">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Set Reminders and Notifications</p>
              </div>

              <div className="flex items-center mt-4">
                <FaTasks className="text-2xl text-gray-700 mr-2" />
                <p className="text-lg text-gray-700">Customize Task Prioritization and Categories</p>
              </div>
              <Link to="/user/newtask">
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-8 hover:bg-blue-600 focus:outline-none">
                  Get Started
                </button>
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default HeroPage;
