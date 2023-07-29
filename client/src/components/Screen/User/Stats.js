import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiCheckCircle, FiAlertCircle, FiPlusCircle } from 'react-icons/fi';
import { useAuth } from '../../../contextApi/auth';

const StatsPage = () => {
    const [auth] = useAuth();
    const [totalTodos, setTotalTodos] = useState(0);
    const [completedTodos, setCompletedTodos] = useState(0);
    const [incompletedTodos, setIncompletedTodos] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);
    const [upcomingEvents, setUpcomingEvents] = useState(0);
    const [pastEvents, setPastEvents] = useState(0);
  
    useEffect(() => {
      // Fetch todo data
      const fetchTodos = async () => {
        try {
          const userId = auth.user._id;
          const response = await axios.get(`/api/v1/auth/mytasks/${userId}`);
          const fetchedTodos = response.data;
          const completedCount = fetchedTodos.filter((todo) => todo.completed).length;
  
          setTotalTodos(fetchedTodos.length);
          setCompletedTodos(completedCount);
          setIncompletedTodos(fetchedTodos.length - completedCount);
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
      };
  
      fetchTodos();
    }, [auth.user._id]);
  
    useEffect(() => {
        // Fetch event data
        const fetchEventData = async () => {
          try {
            const userId = auth.user._id;
            const response = await axios.get(`/api/v1/auth/user/allevents/${userId}`);
            const eventsData = response.data;
    
            // Get the current date in the user's local time zone
            const currentDate = new Date();
    
            // Filter upcoming and past events based on their start dates
            const upcomingEventsCount = eventsData.filter(
              (event) => new Date(event.startDate) >= currentDate
            ).length;
            const pastEventsCount = eventsData.filter(
              (event) => new Date(event.startDate) < currentDate
            ).length;
    
            setTotalEvents(eventsData.length);
            setUpcomingEvents(upcomingEventsCount);
            setPastEvents(pastEventsCount);
          } catch (error) {
            console.error('Error fetching event data:', error);
          }
        };
    
        fetchEventData();
      }, [auth.user._id]);
    
  return (
    <div className="p-8">
        <div className="flex justify-center">
        <div className=" p-4 rounded-md shadow-md mb-8 flex items-center space-x-4">
         
          <div>
            <p className="text-lg text-gray-800 font-semibold">
              Welcome, {auth.user.name}!
            </p>
            <p className="text-base text-gray-700 mt-2">
              Here, you can see your progress and statistics for todos and events.
            </p>
          </div>
        </div>
      </div>
      <div className="flex">
        
        {/* Todo Statistics */}
        <div className="w-1/2 pr-4">
            
          <h2 className="text-xl font-bold mb-4 text-center">Todo Statistics</h2>
          <div className="grid grid-cols-1 gap-4">
             {/* Total Todos */}
             <div className="bg-blue-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiPlusCircle className="w-10 h-10 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Total Todos</h3>
                <p className="text-gray-900">
                  {totalTodos} total
                </p>
              </div>
            </div>
            {/* Completed Todos */}
            <div className="bg-green-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiCheckCircle className="w-10 h-10 text-green-500" />
              <div>
                <h3 className="text-lg font-semibold">Completed Todos</h3>
                <p className="text-gray-600">
                  <span className="text-gray-900">{completedTodos}</span> completed
                </p>
              </div>
            </div>
            {/* Incompleted Todos */}
            <div className="bg-red-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiAlertCircle className="w-10 h-10 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold">Incompleted Todos</h3>
                <p className="text-gray-900">
                  {incompletedTodos} incompleted
                </p>
              </div>
            </div>
           
          </div>
        </div>

        {/* Event Statistics */}
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-bold mb-4 text-center">Event Statistics</h2>
          <div className="grid grid-cols-1 gap-4">
             {/* Total Events */}
             <div className="bg-blue-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiPlusCircle className="w-10 h-10 text-blue-500" />
              <div>
                <h3 className="text-lg font-semibold">Total Events</h3>
                <p className="text-gray-600">
                  <span className="text-gray-900">{totalEvents}</span> total
                </p>
              </div>
            </div>
            {/* Upcoming Events */}
            <div className="bg-yellow-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiPlusCircle className="w-10 h-10 text-yellow-500" />
              <div>
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <p className="text-gray-600">
                  <span className="text-gray-900">{upcomingEvents}</span> upcoming
                </p>
              </div>
            </div>
           
            {/* Past Events */}
            <div className="bg-red-200 p-6 rounded-md shadow-md flex items-center space-x-4">
              <FiAlertCircle className="w-10 h-10 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold">Past Events</h3>
                <p className="text-gray-600">
                  <span className="text-gray-900">{pastEvents}</span> past
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
