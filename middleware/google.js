const {google} = require('googleapis');
const privatekey = require("../backend/hsapp-265823-8b7e5e5ca1d8.json");
const calendar = google.calendar('v3');

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
var events= [];
        calendar.events.list({
            auth: jwtClient,
            calendarId: 'sr6i1g2q8ka3r4ii4vp6g1vbhc@group.calendar.google.com'
         }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log(response.data.items)
            events = response.data.items;
        })

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