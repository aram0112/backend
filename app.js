const express = require("express");
const userRouter = require("./routers/user");
const eventsRouter = require("./routers/events");
var cors = require("cors");
var cookieParser = require("cookie-parser");
const port = process.env.PORT;
require("./db/db");
let {google} = require('googleapis');
let privatekey = require("../backend/hsapp-265823-8b7e5e5ca1d8.json");

let jwtClient = new google.auth.JWT(
  privatekey.client_email,
  null,
  privatekey.private_key,
  ['https://www.googleapis.com/auth/calendar']);
//authenticate request
jwtClient.authorize(function (err, tokens) {
if (err) {
console.log(err);
return;
} else {
console.log("Successfully connected!");
}
});

let calendar = google.calendar('v3');
calendar.events.list({
   auth: jwtClient,
   calendarId: 'sr6i1g2q8ka3r4ii4vp6g1vbhc@group.calendar.google.com'
}, function (err, response) {
   if (err) {
       console.log('The API returned an error: ' + err);
       return;
   }
   console.log(response.data.items)
   var events = response.data.items;
   if (events.length == 0) {
       console.log('No events found.');
   } else {
       console.log('Event from Google Calendar:');
       for (let event of response.data.items) {
           console.log('Event name: %s, Creator name: %s, Create date: %s', event.summary, event.creator, event.created);
       }
   }
});


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
