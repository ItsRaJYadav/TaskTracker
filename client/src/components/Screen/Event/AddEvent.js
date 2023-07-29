import axios from "axios";
import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../../contextApi/auth";

function TodoAddPage() {
  const [auth] = useAuth();
  const Navigate = useNavigate();
  const [eventData, setEventData] = useState({

    title: "",
    description: "",
    moreDetails: "",
    start: "",
    contact: "",
    priority: "science",
    tags: "",
    ticketPrice: "",
    location: "",
    organiser: "",
    isPublic: true,

  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEventData({ ...eventData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/addevent", {
        user: auth.user._id,
        title: eventData.title,
        description: eventData.description,
        moreDescription: eventData.moreDetails,
        start: eventData.start,
        contact: eventData.contact,
        priority: eventData.priority,
        location: eventData.location,
        ticketPrice: eventData.ticketPrice,
        isPublic: eventData.isPublic,
        tags: eventData.tags.split(","),
        organiser: eventData.organiser,
      });
      console.log("Event added:", res.data);
      toast.success("Event added successfully");
      setTimeout(() => {
        Navigate('/user/allevents')
      }, 1000);


      setEventData({
        title: "",
        description: "",
        moreDetails: "",
        start: "",
        contact: "",
        priority: "science",
        tags: "",
        ticketPrice: "",
        location: "",
        organiser: "",
        isPublic: false,
      });
    }
    catch (error) {
      console.error("Error adding todo:", error);

      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Failed to add todo");
      }
    }
  };



  return (
    <>
      <div className="container mx-auto p-14">
        <h1 className="text-2xl font-bold text-center mb-5">Add Event</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-semibold mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={eventData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-1">
                Main Description
              </label>
              <textarea
                id="description"
                name="description"
                value={eventData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500 h-48"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="moreDetails" className="block text-gray-700 font-semibold mb-1">
                More Details
              </label>
              <textarea
                id="moreDetails"
                name="moreDetails"
                value={eventData.moreDetails}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="isPublic" className="block text-gray-700 font-semibold mb-1">
                Public Event
              </label>
              <input
                type="checkbox"
                id="isPublic"
                name="isPublic"
                checked={eventData.isPublic}
                onChange={(e) => setEventData({ ...eventData, isPublic: e.target.checked })}
                className="mr-2 leading-tight"
              />
              <span className="text-gray-700">Check if the event is private</span>
            </div>
          </div>
          <div className="ml-3">
            <div className="mb-4 ">
              <label htmlFor="start" className="block text-gray-700 font-semibold mb-1">
                Start Date
              </label>
              <input
                type="datetime-local"
                id="start"
                name="start"
                value={eventData.start}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="contact" className="block text-gray-700 font-semibold mb-1">
                Contact Info
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={eventData.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-gray-700 font-semibold mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={eventData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
            {/* <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">
                Image
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="image"
                  className="flex items-center px-4 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
                >
                  <FiUpload className="mr-2" /> Upload Image
                </label>
              </div>
            </div> */}
            <div className="mb-4">
              <label htmlFor="ticketPrice" className="block text-gray-700 font-semibold mb-1">
                Ticket Price
              </label>
              <input
                type="text"
                id="ticketPrice"
                name="ticketPrice"
                value={eventData.ticketPrice}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="organiser" className="block text-gray-700 font-semibold mb-1">
                Name of Organiser
              </label>
              <input
                type="text"
                id="organiser"
                name="organiser"
                value={eventData.organiser}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
              Priority
            </label>
            <select
              className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="priority"
              name="priority"
              value={eventData.priority}
              onChange={handleChange}

            >
              <option value="science">Science & tech</option>
              <option value="bussiness">Bussiness</option>
              <option value="entertainment">Entertainment</option>
              <option value="sports">Sports</option>
              <option value="others">others</option>


            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            <input
              className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
              type="text"
              id="tags"
              name="tags"
              value={eventData.tags}
              onChange={handleChange}
              placeholder="use Comma ',' for next tags eg: react, tech, node, etc"
            />
          </div>

          <div className="flex justify-center">
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TodoAddPage;