const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://MongoHSA:core4life@cluster0-9eojy.mongodb.net/user-registration-db?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true
});
