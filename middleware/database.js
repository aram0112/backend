const Member = require("../models/Member");
const Event = require("../models/Event");

const core = async (req, res, next) => {
  var memberMap = {};
  Member.find({}, function(err, members) {
    try {
      members.forEach(function(member) {
        memberMap[member._id] = member;
      });
      req.members = memberMap;
      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  });
};

const event = async (req, res, next) => {
  var eventObj = {};
  Event.find({}, function(err, events) {
    try {
      events.forEach(function(event) {
        if (event.name == req.body.event) {
          eventObj = event;
        }
      });
      res.event = eventObj;
      next();
    } catch (error) {
      res.status(401).send({ error: "Not authorized to access this resource" });
    }
  });
};

module.exports = { core, event };
