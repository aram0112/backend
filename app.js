const express = require("express");
const userRouter = require("./routers/user");
const eventsRouter = require("./routers/events");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const port = process.env.PORT;
require("./db/db");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);
app.use(eventsRouter);

// make the server listen to requests
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});
