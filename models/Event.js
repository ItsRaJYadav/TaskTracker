import { Schema, model } from "mongoose";

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: [
            {
              type: String,
              required: true,
            },
            
        ],
        images: {
            type: [String],
            default: [
              "https://hire4event.com/blogs/wp-content/uploads/2019/05/Event-Management-Proposal-Hire4event.jpg",
              "https://t4.ftcdn.net/jpg/02/09/62/17/360_F_209621794_KfZHJKAL5D7xcVViRhbSEiPJ618bhXbs.jpg",
              "https://www.pcma.org/wp-content/uploads/2020/12/Covening-Asia-Pacific-Sydney-1.jpg"
            ],
          },
        moreDetails: [
            {
              type: String,
              required: true,
            },
            
        ],
        location: {
            type: String,
            required: true,
        },
        contact: {
            type: String,
            required: true,
        },
        
        completed: {
            type: Boolean,
            default: false,
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        startDate: {
            type: Date,
            required: true,
        },
        priority: {
            type: String,
            enum: ["science", "bussiness", "entertainment", "sports","others"],
        },
        tags: {
            type: [String],
        },
        user: {
            type: String,
            required: true,
        },
        ticketPrice: {
            type: [String],
            required: true,
        },
        organiser: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

const Event = model("Event", todoSchema);

export default Event;
