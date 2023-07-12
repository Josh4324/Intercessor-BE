const mongoose = require("mongoose");
const argon2 = require("argon2");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  memberCount: {
    type: Number,
    default: 0,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isPrivate: { type: Boolean, default: false },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
