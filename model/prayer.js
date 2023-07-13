const mongoose = require("mongoose");
const argon2 = require("argon2");

const prayerSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  body: {
    type: String,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const Prayer = mongoose.model("Prayer", prayerSchema);

module.exports = Prayer;
