const express = require("express");
const User = require("../models/User");
const Member = require("../models/Member");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const { core, event } = require("../middleware/database");
const router = express.Router();

const data = [
  {
    name: "haw",
    title: "Hinduism Awareness Week",
    booths: [
      {
        code: "Code",
        description: "Abhaysbjdbusdbjsncusncus",
        title: "Hindu in America"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  },
  {
    name: "diwali",
    title: "Diwali",
    booths: [
      {
        code: "Code",
        description: "Description",
        title: "Diwali"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  },
  {
    name: "holi",
    title: "Holi",
    booths: [
      {
        code: "Code",
        description: "Description",
        title: "History of Holi"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  },
  {
    name: "kidscamp",
    title: "Kid's Camp",
    booths: [
      {
        code: "Code",
        description: "Description",
        title: "History of Kid's Camp"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  },
  {
    name: "navratri",
    title: "Navratri",
    booths: [
      {
        code: "Code",
        description: "Description",
        title: "History of Navratri"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  },
  {
    name: "sankranti",
    title: "Sankranti",
    booths: [
      {
        code: "Code",
        description: "Sankranti has existed for a while",
        title: "History of Sankranti"
      },
      {
        code: "Code",
        description: "Description",
        title: "Title"
      }
    ]
  }
];

// router.get('/events/store', async (req,res) =>{
//     try {
//         for (var i = 0; i < data.length; i++) {
//             const user = new Event(data[i])
//             await user.save()
//         }
//         res.status(201).send()
//     } catch (error) {
//         res.status(400).send(error)
//     }

// })

router.post("/events/", auth, event, async (req, res) => {
  try {
    res.status(200).send(res.event);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/events/booth/create", auth, async (req, res) => {
  try {
    console.log(req.body.event);
    const eventName = req.body.event;
    const event = await Event.findEvent(eventName);
    if (!event) {
      return res.status(401).send({ error: "Could'nt find event" });
    }
    await event.addBooth(event);
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/events/booth/update", auth, async (req, res) => {
  try {
    const b = req.body;
    const eventName = req.body.event;
    const event = await Event.findEvent(eventName);
    if (!event) {
      return res.status(401).send({ error: "Could'nt find event" });
    }
    await event.updateBooth(
      event,
      b.code,
      b.title,
      b.description,
      b.index,
      b.id
    );
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/events/booth/delete", auth, async (req, res) => {
  try {
    const eventName = req.body.event;
    const event = await Event.findEvent(eventName);
    if (!event) {
      return res.status(401).send({ error: "Could'nt find event" });
    }
    await event.deleteBooth(event, req.body.id);
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
