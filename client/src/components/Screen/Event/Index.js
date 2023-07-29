import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../../Global/Spinner';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FiMapPin } from "react-icons/fi"; 

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get('/api/v1/auth/allevents/public');
        setEvents(response.data);
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching event data:', error);
        setError('Failed to fetch event data.');
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredEvents = events.filter((event) => {
      const { title, tags, description, moreDetails, location } = event;
      const searchTerm = query.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm) ||
        tags.join(' ').toLowerCase().includes(searchTerm) ||
        description.join(' ').toLowerCase().includes(searchTerm) ||
        moreDetails.join(' ').toLowerCase().includes(searchTerm) ||
        location.toLowerCase().includes(searchTerm)
      );
    });
    setSearchResults(filteredEvents);
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' });
    return { day, month };
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const today = new Date().toISOString();
  const upcomingEvents = searchResults.filter((event) => event.startDate >= today);
  const pastEvents = searchResults.filter((event) => event.startDate < today);

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2"
          style={{ maxWidth: '400px' }}
        />
      </div>

      {upcomingEvents.length > 0 && (
        <div className="my-4">
          <Carousel
            autoPlay={true}
            infiniteLoop={true}
            showStatus={false}
            showThumbs={false}
            showArrows={true}
            swipeable={true}
            interval={5000}
          >
            {upcomingEvents.map((event) => {
              const { day, month } = formatDate(event.startDate);
              return (
                <section key={event._id} className="mb-2 px-4 lg:px-8">
                  <div className="lg:flex shadow rounded-lg border border-gray-400 bg-white overflow-hidden">
                    <div className="bg-blue-600 lg:w-2/12 py-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold text-4xl">{day}</div>
                        <div className="text-white font-normal text-2xl">{month}</div>
                      </div>
                    </div>
                    <div className="w-full lg:w-10/12 px-4 py-4">
                      <Link to={`/allevents/public/${event._id}`} className="block mt-2">
                        <img src={event.images[1]} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-2" />
                        <h2 className="text-gray-800 font-semibold text-xl">Tittle: {event.title}</h2>
                        <div className="flex flex-row items-center justify-between mt-2">
                          
                        </div>
                        <p className="text-gray-600 font-medium text-sm mt-1">
                          <FiMapPin className="mr-1" />
                          Location: {event.location}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
          </Carousel>
        </div>
      )}


      <>



      <h1 className='text-4xl  text-center mb-3'>Upcomming Events</h1>
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => {
            const { day, month } = formatDate(event.startDate);
            return (
              
              <section className='mb-2 px-4 lg:px-8' key={event._id}>
                <>
                
                  <div className="lg:flex shadow rounded-lg border border-gray-400 bg-white overflow-hidden ">
                    
                    <div className="bg-blue-600 lg:w-2/12 py-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-white font-bold text-4xl">{day}</div>
                        <div className="text-white font-normal text-2xl">{month}</div>
                      </div>
                    </div>

                    <div className="w-full lg:w-10/12 px-4 py-4">

                      <Link to={`/allevents/public/${event._id}`} className="block mt-2">
                        <h2 className="text-gray-800 font-semibold text-xl">{event.title}</h2>
                        <div className="flex flex-row items-center justify-between">
                          <div className="text-gray-700 font-medium text-sm">
                            <i className="far fa-clock" />Date :  {new Date(event.startDate).toLocaleString()}
                          </div>
                          <div className="text-gray-700 font-medium text-sm">
                            <i className="far fa-clock" />Event Organiser: {event.organiser}
                          </div>

                        </div>
                        <p className="text-gray-600 font-medium text-sm mt-1">
                          Location: {event.location}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </Link>
                    </div>
                  </div>


                </>
              </section>
            );
          })
        ) : (
          <p>No events found.</p>
        )}
      </>

      {pastEvents.length > 0 && (
        <div className="my-4 px-10">
          <h2 className="text-2xl font-bold mb-4">Past Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {pastEvents.map((event) => {
              const { day, month } = formatDate(event.startDate);
              return (
                <section className='mb-2 px-4 lg:px-8' key={event._id}>
                  <>
                    <div className="lg:flex shadow rounded-lg border border-gray-400 bg-white overflow-hidden ">
                      <div className="bg-blue-600 lg:w-2/12 py-4 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-white font-bold text-4xl">{day}</div>
                          <div className="text-white font-normal text-2xl">{month}</div>
                        </div>
                      </div>

                      <div className="w-full lg:w-10/12 px-4 py-4">

                        <Link to={`/allevents/public/${event._id}`} className="block mt-2">
                          <h2 className="text-gray-800 font-semibold text-xl">{event.title}</h2>
                          <div className="flex flex-row items-center justify-between">
                            <div className="text-gray-700 font-medium text-sm">
                              <i className="far fa-clock" />Date :  {new Date(event.startDate).toLocaleString()}
                            </div>
                            <div className="text-gray-700 font-medium text-sm">
                              <i className="far fa-clock" />Event Organiser: {event.organiser}
                            </div>

                          </div>
                          <p className="text-gray-600 font-medium text-sm mt-1">
                            Location: {event.location}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {event.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="bg-blue-100 text-blue-500 px-2 py-1 rounded-md text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </Link>
                      </div>
                    </div>


                  </>
                </section>
              );
            })}
          </div>
        </div>
      )}

      {searchResults.length === 0 && <p>No events found.</p>}
    </>
  );
};

export default EventPage;
