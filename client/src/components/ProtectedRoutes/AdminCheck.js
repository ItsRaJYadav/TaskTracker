import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/auth";
import axios from "axios";
import Spinner from "./Spinner";
import AccessDeniedPage from "./AccessDenied";

const AdminCheck = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await axios.get("/api/v1/auth/admin-auth");
        setIsAdmin(response.data.ok);
      } catch (error) {
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      checkAdminStatus();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!isAdmin && !loading) {
      // If the user is not an admin and loading is complete,
      // show the AccessDeniedPage for 5 seconds before redirecting to home
      setShowAccessDenied(true);
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isAdmin, loading, navigate]);

  if (!auth?.token) {
    return <Spinner />;
  }

  if (showAccessDenied) {
    return <AccessDeniedPage />;
  }

  if (!isAdmin || loading) {
    return <Spinner />;
  }

  return children;
};

export default AdminCheck;
