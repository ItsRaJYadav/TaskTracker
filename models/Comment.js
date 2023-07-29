import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    eventId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: true,
    },
    upvotes: {
        type: [Number],
        default: [],
      },
      downvotes: {
        type: [Number],
        default: [],
      },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
