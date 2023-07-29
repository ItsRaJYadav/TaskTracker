import React, { useEffect, useState ,useCallback} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FiClock, FiMapPin, FiUser, FiTag } from "react-icons/fi";
import { MdContactPhone } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import Loader from '../../Global/Spinner'


import AddCommentForm from "./AddComments";
import EventComments from "./ShowComments";

function EventDetailsPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    

    const fetchEventData = useCallback(async () => {
        try {
          const response = await axios.get(`/api/v1/auth/allevents/public/${id}`);
          setEvent(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching event data:", error);
          setError("Failed to fetch event data");
          setLoading(false);
        }
      }, [id]);
      
      useEffect(() => {
        fetchEventData();
      }, [fetchEventData]);
      

    if (loading) {
        return <Loader/>;
    }

    if (error) {
        return <>
        <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p className="text-red-500"> Failed to fetch event details or Events not avaliable.</p>
          <button
            onClick={() => navigate("/allevents/public")}
            className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2"
          >
            Go Back
          </button>
        </div>
      </div>
        </>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mx-auto px-10 mt-5">
            <div className="w-auto mx-auto bg-white shadow-md p-4">
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <div className="mb-3 mt-3">
                    <div className="flex items-center mt-4">
                        <FiMapPin className="mr-2 text-indigo-500" />
                        <p>{event.location}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <FiClock className="mr-2 text-indigo-500" />
                        <p>
                            {formatDate(event.startDate)}
                        </p>
                    </div>
                    <div className="flex items-center mt-2">
                        <MdContactPhone className="mr-2 text-indigo-500" />
                        <p>
                            {event.contact}
                        </p>
                    </div>
                    <div className="flex items-center mt-2">
                        <FiUser className="mr-2 text-indigo-500" />
                        <p>{event.organiser}</p>
                    </div>
                    <div className="flex items-center mt-2">
                        <FiTag className="mr-2 text-indigo-500" />
                        <div className="flex flex-wrap">
                            {event.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-indigo-500 text-white px-2 py-1 rounded-full text-sm font-semibold mr-2 mb-2"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <FaRupeeSign className="mr-2 text-indigo-500" />
                        <p>
                            Ticket Price:{" "}
                            {event.ticketPrice.length > 0
                                ? event.ticketPrice.join(", ")
                                : "Free"}
                        </p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <ul className="list-disc list-inside">
                        {event.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">More Details</h3>
                    <ul className="list-disc list-inside">
                        {event.moreDetails.map((detail, index) => (
                            <li key={index}>{detail}</li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="max-w-4xl mx-auto mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {event.images.map((image, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <img
                                src={image}
                                alt={`events ${index}`}
                                className="w-full h-full object-cover rounded-lg shadow-md"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <EventComments eventId={id} />
            <AddCommentForm eventId={id} />
        </div>
    );
}

export default EventDetailsPage;
