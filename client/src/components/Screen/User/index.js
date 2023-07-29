import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { FiMenu, FiPackage, FiArrowLeft } from "react-icons/fi";
import { FaAddressBook } from "react-icons/fa";
import { BsHouseAddFill, BsChatDotsFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "../../../contextApi/auth";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [auth, , Logout] = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(1);
  const [showSidebar, setShowSidebar] = useState(false);
  const handleLogout = () => {
    Logout();
    toast.success("Logout Successfully");
    navigate("/login");
  };
  const adminMenuItems = [
    {
      id: 1,
      name: "Home",
      icon: <AiFillHome />,
      link: "/user",
    },
    {
      id: 2,
      name: "My Tasks",
      icon: <FiPackage />,
      link: "/user/mytasks",
    },
    {
      id: 3,
      name: "My Events",
      icon: <FaAddressBook />,
      link: "/user/allevents",
    },
    {
      id: 4,
      name: "Add Task",
      icon: <BsHouseAddFill />,
      link: "/user/newtask",
    },
    {
      id: 5,
      name: "Add Event",
      icon: <BsChatDotsFill />,
      link: "/user/addevent",
    },
  ];

  const toggleTab = (tabId) => {
    setActiveTab(tabId);
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div
        className={`fixed top-0 mt-14 left-0 h-full p-3 w-60 dark:bg-gray-900 dark:text-gray-100 md:w-60 md:block ${showSidebar ? "block" : "hidden"
          }`}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">User Dashboard</h2>
            <button className="p-2 md:hidden" onClick={toggleSidebar}>
              <ImCross className="w-5 h-5 fill-current dark:text-gray-100" />
            </button>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              {adminMenuItems.map((item) => (
                <li className="rounded-sm" key={item.id}>
                  <Link
                    to={item.link}
                    className={`flex items-center p-2 space-x-3 rounded-md ${activeTab === item.id ? "bg-gray-200 dark:bg-gray-800" : ""
                      }`}
                    onClick={() => toggleTab(item.id)}
                  >
                    <div className="w-5 h-5 fill-current dark:text-gray-400">
                      {item.icon}
                    </div>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}

            </ul>
          </div>
        </div>
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          <img
            src={auth?.user?.avtar}
            alt={auth?.user?.name}
            className="w-12 h-12 rounded-lg dark:bg-gray-500"
          />
          <div>
            <h2 className="text-lg font-semibold">{auth?.user?.name}</h2>
            <span className="flex items-center space-x-1">
              <Link
                to="/user/profile"
                className="text-xs hover:underline dark:text-gray-400"
              >
                View profile
              </Link>
            </span>
          </div>

        </div>
        <div className="flex justify-center items-center mt-56 ">
          <button
            className="flex items-center p-2 w-48 space-x-3 rounded-md bg-gray-800  hover:bg-red-300 "
            onClick={() => handleLogout()}
          >
            <div className="w-5 h-5 mt-1 ml-5 fill-current ">
              <BiLogOut />
            </div>
            <span className="text-white ">Log Out</span>
          </button>
        </div>

      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 md:ml-60">
        {/* Header */}
        <button
          className="top-5 left-0 md:hidden"
          onClick={toggleSidebar}
        >
          {showSidebar ? (
            <FiArrowLeft className="w-5 h-5 fill-current dark:text-gray-800" />
          ) : (
            <FiMenu className="w-5 h-5 fill-current dark:text-gray-800 mb-5" />
          )}
        </button>

        {/* Main Content */}
        <div className="flex-1 p-3 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


