import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Loader from '../Global/Spinner'


function TodoDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(`/api/v1/auth/todos/${id}`);
        const fetchedTodo = response.data;

        if (!fetchedTodo) {
          toast.error("Todo not found. Please go back.");
          navigate("/"); // Redirect to home page
          return;
        }

        setTodo(fetchedTodo);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching todo:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, navigate]);
  

  const handleDelete = async () => {
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
          await axios.delete(`/api/v1/auth/todos/${id}`);
          Swal.fire("Deleted!", "Your todo has been deleted.", "success");
          navigate("/user/mytasks"); 
        } catch (error) {
          console.error("Error deleting todo:", error);
          Swal.fire("Error", "Failed to delete todo.", "error");
        }
      }
    });
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`/api/v1/auth/todos/${id}/completed`, updatedTodo);
      setTodo(updatedTodo);
      if (updatedTodo.completed) {
        toast.success('Todo marked as completed!');
      } else {
        toast('Todo marked as Incompleted!', {
            icon: '❌❌❌',
          });
      }
    } catch (error) {
      console.error("Error toggling todo completion:", error);
      Swal.fire("Error", "Failed to toggle completion status.", "error");
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500"> Failed to fetch todo details or Todo not avaliable.</p>
          <button
            onClick={() => navigate("/user/mytasks")}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8  sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-center">Task Details</h2>
          <label className="flex items-center cursor-pointer">
            <span className="mr-2">{todo.completed ? "Completed" : "Incomplete"}</span>
            {todo.completed ? (
              <BsToggleOn
                className="text-blue-500 w-8 h-8 cursor-pointer"
                onClick={handleToggleComplete}
              />
            ) : (
              <BsToggleOff
                className="text-red-500 w-8 h-8 cursor-pointer"
                onClick={handleToggleComplete}
              />
            )}
          </label>
        </div>
        <h3 className="text-xl font-semibold">{todo?.title}</h3>
        <p className="mb-2">Description: {todo.description}</p>
        <p className="mb-2">
          Completed:{" "}
          <span
            className={`${
              todo.completed ? "text-green-500" : "text-red-500"
            } font-semibold`}
          >
            {todo.completed ? "Yes" : "No"}
          </span>
        </p>
        <p className="mb-2">Due Date: {new Date(todo.dueDate).toLocaleString()}</p>

        <p className="mb-2">
          Priority:{" "}
          <span
            className={`${
              todo.priority === "low"
                ? "text-blue-500"
                : todo.priority === "medium"
                ? "text-yellow-500"
                : "text-red-500"
            } font-semibold`}
          >
            {todo.priority}
          </span>
        </p>
        <div className="mb-4">
          Tags:
          <div className="flex flex-wrap gap-1">
            {todo.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleDelete}
            className="flex items-center bg-red-500 text-white rounded-md px-4 py-2 mr-2"
          >
            <RiDeleteBinLine className="mr-2" /> Delete
          </button>
          <Link
            to={`/user/mytasks/${todo._id}/edit`}
            className="flex items-center bg-blue-500 text-white rounded-md px-4 py-2"
          >
            <RiEdit2Line className="mr-2" /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TodoDetailsPage;
