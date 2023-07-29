import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventComments = ({ eventId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        fetchEventComments();
    }, []);

    const fetchEventComments = async () => {
        try {
            const response = await axios.get(`/api/v1/auth/events/${eventId}/comments`);
            const updatedComments = response.data.map((comment) => ({
                ...comment,
            }));
            setComments(updatedComments);
        } catch (error) {
            console.error('Error fetching event comments:', error);
        }
    };

    



    
    return (
        <div className="w-full max-w-2xl mx-auto">
            <hr className="mt-5" />
            <h3 className="text-lg font-semibold mb-4 text-center">Comments</h3>
            {comments.length > 0 ? (
                <ul className="space-y-4">
                    {comments.map((comment) => (
                        <li key={comment._id} className="flex space-x-4">
                            <div className="w-full mx-auto max-w-xl rounded-xl border px-4 py-6 text-gray-700">
                                <div className="flex items-center">
                                   
                                    <div>
                                        <img
                                            className="h-10 w-10 rounded-full object-cover"
                                            src={comment.userImg}
                                            alt="task"
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium text-gray-700">{comment.user}</p>
                                        <p className="text-sm text-gray-400">
                                            You commented on {new Date(comment.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">{comment.content}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments found.</p>
            )}
        </div>
    );
};

export default EventComments;
