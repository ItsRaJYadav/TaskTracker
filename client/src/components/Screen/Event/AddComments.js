import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../contextApi/auth';
import { toast } from 'react-hot-toast';

const AddCommentForm = ({ eventId, onAddComment }) => {
  const [auth] = useAuth();
  const user = auth?.user?.name;
  const userImg = auth?.user?.avtar;

  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      // User is not logged in, handle the error
      toast.error("Please log in to add a comment.");
      return;
    }

    try {
      const response = await axios.post('/api/v1/auth/events/addcomment', {
        user,
        userImg,
        eventId,
        content,
      });

      if (response.status === 200) {
        onAddComment(response.data);
      }

      toast.success("Comment added successfully");
      setContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 font-semibold mb-1">
          Description
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="Add a comment..."
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddCommentForm;
