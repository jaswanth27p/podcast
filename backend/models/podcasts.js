const mongoose = require("mongoose");

const podcastsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: String,
  audio_url: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Credentials",
    required: true,
  },
  // Other podcast-related fields (e.g., duration, upload date)
});

const Podcasts = mongoose.model("Podcasts", podcastsSchema);

module.exports = Podcasts;
