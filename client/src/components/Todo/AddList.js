import axios from "axios";
import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../contextApi/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom'

function TodoAddPage() {
  const [auth] = useAuth();
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({

    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/addtask", {
        user: auth.user._id,
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        priority: formData.priority,
        tags: formData.tags.split(","),
      });
      console.log("Todo added:", res.data);
      toast.success("Todo added successfully");
      setTimeout(() => {
        Navigate('/user/mytasks')
      }, 1000);

      // Reset the form
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        tags: "",
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
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-6">Add Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter the title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="description"
            name="description"
            placeholder="enter description"
            value={formData.description}
            onChange={handleChange}
            style={{ height: "160px" }} 
          ></textarea>

        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priority">
            Priority
          </label>
          <select
            className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
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
            value={formData.tags}
            onChange={handleChange}
            placeholder="use Comma ',' for next tags eg: react, tech, node, etc"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <FiPlus className="mr-2" />
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
}

export default TodoAddPage;
