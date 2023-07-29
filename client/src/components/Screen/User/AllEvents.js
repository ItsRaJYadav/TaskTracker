import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import { AiFillEdit, AiFillDelete, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import toast from 'react-hot-toast';
import MySwal from 'sweetalert2';

const EventPage = () => {
  const [auth] = useAuth();
  const userId = auth?.user._id;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchEventData();
    }
  }, [userId]);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/user/allevents/${userId}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching event data:', error);
    }
  };

  const handleUpdateEvent = (eventId) => {
    // Implement update event logic here
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      const response = await MySwal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this event!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
      });
  
      if (response.isConfirmed) {
        await axios.delete(`/api/v1/auth/user/events/${eventId}`);
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        MySwal.fire('Deleted!', 'Event has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      MySwal.fire('Error!', 'Failed to delete event.', 'error');
    }
  };
  
  
  
  const handleTogglePublic = async (eventId) => {
    try {
      const event = events.find((event) => event._id === eventId);
      const updatedEvent = { ...event, isPublic: !event.isPublic };
      const response = await axios.put(`/api/v1/auth/user/events/${eventId}`, updatedEvent);
  
      if (response.status === 200) {
        setEvents((prevEvents) =>
          prevEvents.map((event) => (event._id === eventId ? updatedEvent : event))
        );
  
        const toastMessage = updatedEvent.isPublic ? 'Event made public' : 'Event made private';
        toast.success(toastMessage);
      }
    } catch (error) {
      console.error('Error toggling event visibility:', error);
      toast.error('Failed to toggle event visibility');
    }
  };
  

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-10">
      {events.map((event) => (
        <div key={event._id} className="border rounded p-4 shadow">
          <h2 className="text-xl font-bold mb-2">{event.title}</h2>
          <p className="text-sm mb-4">{truncateText(event.description[0], 100)}</p>
          <div>
            <h3 className="text-lg font-bold">Location:</h3>
            <p>{event.location}</p>
            <h3 className="text-lg font-bold">Date and Time:</h3>
            <p>Start: {formatDate(event.startDate)}</p>
            <h3 className="text-lg font-bold">Organizer:</h3>
            <p>{event.organiser}</p>
            <h3 className="text-lg font-bold">Tags:</h3>
            <ul>
              {event.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <button
              onClick={() => handleUpdateEvent(event._id)}
              className="bg-blue-500 text-white rounded p-2 mr-2"
            >
              <AiFillEdit className="inline-block mr-1" />
              Update
            </button>
            <button
              onClick={() => handleDeleteEvent(event._id)}
              className="bg-red-500 text-white rounded p-2 mr-2"
            >
              <AiFillDelete className="inline-block mr-1" />
              Delete
            </button>
            <button
              onClick={() => handleTogglePublic(event._id)}
              className="bg-gray-500 text-white rounded p-2"
            >
              {event.isPublic ? (
                <>
                  <AiOutlineLock className="inline-block mr-1" />
                  Make Private
                </>
              ) : (
                <>
                  <AiOutlineUnlock className="inline-block mr-1" />
                  Make Public
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventPage;