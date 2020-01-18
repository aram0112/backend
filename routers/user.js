const express = require("express");
const User = require("../models/User");
const Member = require("../models/Member");
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const { core, event } = require("../middleware/database");
const router = express.Router();
const cookieConfig = {
  httpOnly: true, // to disable accessing cookie via client side js
  maxAge: 3600000
  //secure: true, // to force https (if you use it)
};

router.post("/users", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res
      .status(201)
      .cookie("JWT", token, cookieConfig)
      .send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users/login", async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res
        .status(401)
        .send({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.cookie("JWT", token, cookieConfig).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.get("/members/core", auth, core, async (req, res) => {
  // View logged in user profile
  try {
    res.send(req.members);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token;
    });
    await req.user.save();
    res.clearCookie("JWT");
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/users/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
