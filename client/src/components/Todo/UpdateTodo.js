import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../../contextApi/auth";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function TodoAddPage() {
    const [auth] = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        tags: "",
    });

    useEffect(() => {
        const fetchTodo = async () => {
            try {
                const response = await axios.get(`/api/v1/auth/todos/${id}`);
                const fetchedTodo = response.data;

                // Set the form data with the fetched todo data
                setFormData({
                    title: fetchedTodo.title,
                    description: fetchedTodo.description,
                    dueDate: fetchedTodo.dueDate,
                    priority: fetchedTodo.priority,
                    tags: fetchedTodo.tags.join(","),
                });
            } catch (error) {
                console.error("Error fetching todo:", error);
            }
        };

        fetchTodo();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/v1/auth/todos/${id}/update`, {
                user: auth.user._id,
                title: formData.title,
                description: formData.description,
                dueDate: formData.dueDate,
                priority: formData.priority,
                tags: formData.tags.split(","),
            });

            // Handle successful submission
            console.log("Todo updated:", res.data);
            toast.success("Todo updated successfully");

            // Redirect to the home user page
            navigate(`/user/mytasks/${id}`);
        } catch (error) {
            console.error("Error updating todo:", error);

            if (error.response && error.response.data && error.response.data.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to update todo");
            }
        }
    };
    return (
        <div className="max-w-md mx-auto mt-3 sm:p-4 px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-bold mb-3">Todo Id: <strong>{id}</strong></h2>
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
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y h-40"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
                        Due Date
                    </label>
                    <input
                        className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
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
                <div className="mb-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tags">
                        Tags
                    </label>
                    <input
                        className="pl-3 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        id="tags"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <FiPlus className="mr-2" />
                        Update Todo
                    </button>
                </div>

            </form>
        </div>
    );
}

export default TodoAddPage;
