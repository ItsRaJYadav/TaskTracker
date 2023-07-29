
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contextApi/auth";
import { RiDeleteBinLine, RiEdit2Line, RiSearchLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

function TodoList() {
  const [auth] = useAuth();

  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const userId = auth.user._id;
        const response = await axios.get(`/api/v1/auth/mytasks/${userId}`);
        if (response.status === 404) {
          return;
        }
        const fetchedTodos = response.data;
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [auth.user._id]);

  useEffect(() => {
    const filterTodos = () => {
      let filtered = todos;

      if (filterType === "completed") {
        filtered = filtered.filter((todo) => todo.completed);
      } else if (filterType === "incomplete") {
        filtered = filtered.filter((todo) => !todo.completed);
      }

      filtered = filtered.filter((todo) => {
        const titleMatch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = todo.description.toLowerCase().includes(searchQuery.toLowerCase());
        const tagsMatch = todo.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return titleMatch || descriptionMatch || tagsMatch;
      });

      setFilteredTodos(filtered);
    };

    filterTodos();
  }, [todos, searchQuery, filterType]);

  const handleDelete = (todoId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/v1/auth/todos/${todoId}`);
          Swal.fire("Deleted!", "Your todo has been deleted.", "success");
          setTimeout(() => {
            window.location.reload(); // Reload the page
          }, 2000);
        } catch (error) {
          console.error("Error deleting todo:", error);
          Swal.fire("Error", "Failed to delete todo.", "error");
        }
      }
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilter = (filter) => {
    setFilterType(filter);
  };

  const completedTasks = todos.filter((todo) => todo.completed);
  const incompleteTasks = todos.filter((todo) => !todo.completed);

  return (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
      <div className="flex justify-center w-full ">
        <div className="flex items-center bg-gray-100 p-4 rounded-md">
          <p className="mr-4">
            <span className="text-gray-600 font-semibold">
              Hey{" "}
              <span className="text-blue-500">
                {auth?.user.name}
              </span>
              , your stats are:
            </span>{" "}
            <span className="text-green-500 font-semibold">
              Completed Tasks: {completedTasks.length}
            </span>{" "}
            |{" "}
            <span className="text-red-500 font-semibold">
              Incomplete Tasks: {incompleteTasks.length}
            </span>{" "}
            |{" "}
            <span className="text-gray-500">All Tasks: {filteredTodos.length}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 w-64 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearch}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <RiSearchLine />
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full ">
        <button
          className={`mr-4 ${filterType === "all" ? "font-bold" : ""}`}
          onClick={() => handleFilter("all")}
        >
          All
        </button>
        <button
          className={`mr-4 ${filterType === "completed" ? "font-bold" : ""}`}
          onClick={() => handleFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filterType === "incomplete" ? "font-bold" : ""}
          onClick={() => handleFilter("incomplete")}
        >
          Incomplete
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="text-gray-600">No matching todos found.</p>
      ) : (
        filteredTodos.map((todo) => (
          <div key={todo._id} className="border shadow-md rounded-md p-4 w-64">
            <Link to={`/user/mytasks/${todo._id}`} className="text-blue-500 hover:underline">
              <h2 className="text-2xl font-bold mb-4">
              {todo.title}{" "}
                {todo.completed && (
                  <FiCheckCircle className="inline-block w-6 h-6 text-green-500 mr-2" />
                )}

              </h2>


            </Link>
            <div className="flex flex-wrap gap-1 mb-4">
              {todo.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-600 mb-4">{todo.description.slice(0, 100)}...</p>
            <div className="flex items-center">
              <Link to={`/user/mytasks/${todo._id}/edit`} className="text-blue-500 hover:text-blue-700 mr-4">
                <RiEdit2Line />
              </Link>
              <button
                className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                onClick={() => handleDelete(todo._id)}
              >
                <RiDeleteBinLine />
              </button>
              <p className="text-gray-600 ml-8">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TodoList;


