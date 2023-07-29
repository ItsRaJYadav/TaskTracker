import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contextApi/auth";
import axios from "axios";
import Spinner from "./Spinner";

const UserAuthorization = ({ children }) => {
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuthorization = async () => {
      try {
        const response = await axios.get("/api/v1/auth/user-auth");
        setIsUserAuthorized(response.data.ok);
      } catch (error) {
        setIsUserAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    if (auth?.token) {
      checkUserAuthorization();
    }
  }, [auth?.token]);

  useEffect(() => {
    if (!isUserAuthorized && !loading) {
      // If the user is not authorized and loading is complete,
      // redirect to the home page after a short delay
      const redirectTimer = setTimeout(() => {
        navigate("/");
      }, 5000);

      return () => clearTimeout(redirectTimer);
    }
  }, [isUserAuthorized, loading, navigate]);

  
  if (!isUserAuthorized || loading) {
    return <Spinner />;
  }

  return children;
};

export default UserAuthorization;
