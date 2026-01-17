const mongoose = require("mongoose");
// never change ur schema mid project
const dbschema = mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visits: [
    {
      time: {
        type: Number,
      },
    },
  ],
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
  }
});

const URL = mongoose.model("URL", dbschema);

module.exports = URL;
