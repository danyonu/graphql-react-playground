const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const events = async (eventIds) => {
    try {
      const events = await Event.find({ _id: { $in: eventIds } });
  
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event.creator)
        };
      });
    } catch (err) {
      throw err;
    }
  };
  const singleEvent = async (eventId) => {
    try {
      const event = await Event.findById(eventId);
  
      return {
        ...event._doc,
        _id: event.id,
        creator: user.bind(this, event.creator)
      };
    } catch (error) {
      throw error;
    }
  };
  const user = async (userId) => {
    try {
      const user = await User.findById(userId);
  
      return {
        ...user._doc,
        _id: user.id,
        createdEvents: events.bind(this, user._doc.createdEvents)
      };
    } catch (error) {
      throw error;
    }
  };

  const transformEvent = (event) => {
    return {
      ...event._doc,
      _id: event.id,
      date: dateToString(event._doc.date),
      creator: user.bind(this, event._doc.creator)
    }
  }

  const transformBooking = (booking) => {
    return {
      ...booking._doc,
      _id: booking.id,
      user: user.bind(this, booking._doc.user),
      event: singleEvent.bind(this, booking._doc.event),
      createdAt: dateToString(booking._doc.createdAt),
      updatedAt: dateToString(booking._doc.updatedAt)
    }
  }

  exports.transformEvent = transformEvent;
  exports.transformBooking = transformBooking;

// exports.events = events;
// exports.singleEvent = singleEvent;
// exports.user = user;