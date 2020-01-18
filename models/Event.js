const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var boothSchema = mongoose.Schema({
  description: { type: String },
  title: { type: String }
});

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  booths: [boothSchema]
});

eventSchema.methods.addBooth = async event => {
  event.booths = event.booths.concat({
    title: "Title",
    description: "Description"
  });
  await event.save();
  return event;
};
eventSchema.methods.deleteBooth = async (event, id) => {
  try {
    event.booths.pull({ _id: id });
    await event.save();
  } catch {
    console.log("fuck");
  }
  return event;
};

eventSchema.methods.updateBooth = async (
  event,
  code,
  title,
  description,
  index,
  id
) => {
  try {
    event.booths.id(id).code = code;
    event.booths.id(id).title = title;
    event.booths.id(id).description = description;
    await event.save();
  } catch {
    console.log("fuck");
  }

  return event;
};

eventSchema.statics.findEvent = async name => {
  // Search for a user by email and password.
  const event = await Event.findOne({ name: name });
  if (!event) {
    throw new Error({ error: "Invalid Event" });
  }
  return event;
};

const Event = mongoose.model("Event", eventSchema);
const Booth = mongoose.model("Booth", boothSchema);
module.exports = Event;
