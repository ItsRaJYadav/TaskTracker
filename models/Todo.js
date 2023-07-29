import { Schema, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    tags: {
      type: [String],
    },
    user: {
      type: String,
      required: true,
    }

  },
  { timestamps: true }
);

const Todo = model("Todo", todoSchema);

export default Todo;
