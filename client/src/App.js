import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Global/Headers/Index.js";
import ProtectedRoutes from "./components/ProtectedRoutes/UserCheck";
import ErrorPage from "./components/Global/Error";
import AddTodo from "./components/Todo/AddList";
import AdminCheck from "./components/ProtectedRoutes/AdminCheck";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AllUsers from "./components/Admin/AllUsers";


import User from "./components/Screen/User";
import UserProfile from "./components/Screen/User/Userprofile.js";
import UserStats from "./components/Screen/User/Stats.js";

import UserVerify from "./components/Screen/User/VerifyEmail";

import TodoDetailsPage from "./components/Todo/TodoDetailsPage";
import AllTasks from "./components/Screen/User/AllTasks";
import Home from "./components/Screen/Home";
import Login from "./components/Screen/Login";
import Register from "./components/Screen/Register";
import About from "./components/Screen/About";
import UpdateTodo from "./components/Todo/UpdateTodo";
import UpdateProfile from "./components/Screen/User/UpdateProfile";
import ForgotPasswordPage from "./components/Screen/User/ForgotPassword";
import AllEvents from "./components/Screen/User/AllEvents";

import ContactForm from "./components/Screen/Contact/Index";
import AddEvent from "./components/Screen/Event/AddEvent";
import Event from "./components/Screen/Event/Index";
import EventDetails from "./components/Screen/Event/EventDetails";



function App() {
  return (
    <Router>
      <Header />


      <Routes>    {/* Protected routes for user */}
        <Route path="/user" element={<ProtectedRoutes><User /></ProtectedRoutes>}>
        <Route index element={<UserStats />} />

          <Route path="profile" element={<UserProfile />} />
          <Route path="newtask" element={<AddTodo />} />
          <Route path="mytasks" element={<AllTasks />} />
          <Route path="mytasks/:id" element={<TodoDetailsPage />} />
          <Route path="mytasks/:id/edit" element={<UpdateTodo />} />
          <Route path="updateProfile/:id" element={<UpdateProfile />} />
          <Route path="addevent" element={<AddEvent />} />
          <Route path="allevents" element={<AllEvents />} />


        </Route>






        {/* Protected routes for admin */}
        <Route path="/admin" element={<AdminCheck><AdminDashboard /></AdminCheck>}>
          <Route path="alluser" element={<AllUsers />} />

        </Route>

        <Route path="/allevents/public" element={<Event />} />
        <Route path="/allevents/public/:id" element={<EventDetails />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email/:token" element={<UserVerify />} exact />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<ContactForm />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
