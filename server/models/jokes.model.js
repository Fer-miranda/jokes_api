
const mongoose = require("mongoose");

const JokeSchema = new mongoose.Schema({
  setup: {
    type: String,
    required: [true, "Setup is Required"],
    minlength: [10, "Setup must be at least 10 characters long"]
  },
  punchline: {
    type: String,
    required: [true, "Punchline is Required"],
    minlength: [3, "Punchline must be at least 3 characters long"]
  },
  date_task: {
    type: Date,
}
}, { timestamps: true });

module.exports = mongoose.model("Joke", JokeSchema);