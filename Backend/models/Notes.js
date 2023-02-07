const mongoose = require("mongoose");

module.exports = mongoose.model("notes", {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    defalut: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
