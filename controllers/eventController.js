import EventData from '../models/Event.js'
import Comment from '../models/Comment.js';

export const newEventController = async (req, res) => {
  try {
    const newEventData = new EventData({
      title: req.body.title,
      description: req.body.description,
      moreDetails: req.body.moreDescription,
      startDate: req.body.start,
      ticketPrice: req.body.ticketPrice,
      location: req.body.location,
      priority: req.body.priority,
      tags: req.body.tags,
      user: req.body.user,
      isPublic: req.body.isPublic,
      organiser: req.body.organiser,
      contact: req.body.contact,

    });

    const savedEvent = await newEventData.save();

    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: "Failed to add event" });
  }
}


export const getAllPublicEventsController = async (req, res) => {
  try {
    const publicEvents = await EventData.find({ isPublic: true });
    res.status(200).json(publicEvents);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve public events" });
  }
};


export const allEventIdController = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await EventData.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

export const EventCommentController = async (req, res) => {
  const { userImg, content, user, eventId } = req.body;

  try {
    const newComment = new Comment({
      userImg,
      content,
      user,
      eventId
    });

    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const getEventComments = async (req, res) => {
  const { eventId } = req.params;

  try {
    const comments = await Comment.find({ eventId });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error fetching event comments:', error);
    res.status(500).json({ error: 'Failed to fetch event comments' });
  }
};


export const fetchEventsbyUserId = async (req, res) => {
  const { userId } = req.params;
  try {
  const events = await EventData.find({ user: userId  });
  res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events by user ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const deleteEventController = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventData.findByIdAndDelete(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};




export const toggleEventController = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const event = await EventData.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    event.isPublic = !event.isPublic;
    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error toggling event visibility:', error);
    res.status(500).json({ error: 'Failed to toggle event visibility' });
  }
};





