const Podcasts = require("../models/podcasts");

// Controller function to create a new podcast
const createPodcast = async (req, res) => {
  const { title, description, author, audio_url, user_id } = req.body;
  try {
    // Create a new podcast document
    const newPodcast = new Podcasts({
      title,
      description,
      author,
      audio_url,
      user_id,
    });

    // Save the new podcast to the database
    await newPodcast.save();
    res.status(201).json({ message: "Podcast created successfully" });
  } catch (error) {
    console.error("Error creating podcast:", error);
    res.status(500).json({ message: "Failed to create podcast" });
  }
};

// Controller function to retrieve podcasts
const getPodcast = async (req, res) => {
    const id= req.query.id;
  try {
    // Retrieve a list of podcasts from the database
    const podcasts = await Podcasts.find({_id :id});
    res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    res.status(500).json({ message: "Failed to fetch podcasts" });
  }
};

// Controller function to update an existing podcast
const updatePodcast = async (req, res) => {
  const podcastId = req.params.id;
  const { title, description, author, audio_url, categories, user_id } =
    req.body;

  try {
    // Find the podcast by ID
    const podcast = await Podcasts.findById(podcastId);

    if (!podcast) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    // Update the podcast properties
    podcast.title = title;
    podcast.description = description;
    podcast.author = author;
    podcast.audio_url = audio_url;
    podcast.categories = categories;
    podcast.user_id = user_id;

    // Save the updated podcast to the database
    await podcast.save();

    res.status(200).json({ message: "Podcast updated successfully" });
  } catch (error) {
    console.error("Error updating podcast:", error);
    res.status(500).json({ message: "Failed to update podcast" });
  }
};

// Controller function to delete an existing podcast
const deletePodcast = async (req, res) => {
  const podcastId = req.params.id;

  try {
    // Find the podcast by ID and remove it
    const result = await Podcasts.findByIdAndRemove(podcastId);

    if (!result) {
      return res.status(404).json({ message: "Podcast not found" });
    }

    res.status(200).json({ message: "Podcast deleted successfully" });
  } catch (error) {
    console.error("Error deleting podcast:", error);
    res.status(500).json({ message: "Failed to delete podcast" });
  }
};

module.exports = {
  createPodcast,
  getPodcast,
  updatePodcast,
  deletePodcast,
  // Add other controller functions here
};
