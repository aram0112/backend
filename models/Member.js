const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const memberSchema = mongoose.Schema({
  address: {
    type: String,
    trim: true
  },
  birthday: {
    type: String,
    trim: true
  },
  car: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  shirtSize: {
    type: String,
    required: true
  }
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
