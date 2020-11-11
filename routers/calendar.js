const express = require("express");
const User = require("../models/User");
const Member = require("../models/Member");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const { core, event } = require("../middleware/database");
const router = express.Router();




router.post("/google/calendar/main", async (req, res) => {
    try {
        
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  module.exports = router;