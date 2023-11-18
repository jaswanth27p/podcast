const Playlist = require("../models/playlists");
const Podcast = require("../models/podcasts")

// Controller function to create a new playlist
const createPlaylist = async (req, res) => {
  const { user_id, name, podcasts } = req.body;

  try {
    // Create a new playlist document
    const newPlaylist = new Playlist({ user_id, name, podcasts });

    // Save the new playlist to the database
    await newPlaylist.save();

    res.status(201).json({ message: "Playlist created successfully" });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Failed to create playlist" });
  }
};

// Controller function to get a list of all playlists
const getPlaylists = async (req, res) => {
  const { id:user_id} = req.user;

  try {
    // Retrieve a list of all playlists from the database
    const playlists = await Playlist.find({ user_id });
    res.status(200).json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
};

// Controller function to get a single playlist by ID
const getPlaylistById = async (req, res) => {
  const playlistId = req.params.id;

  try {
    // Retrieve the playlist by its ID
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.error("Error fetching playlist:", error);
    res.status(500).json({ message: "Failed to fetch playlist" });
  }
};

// Controller function to update an existing playlist by ID
const updatePlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const { name, podcasts } = req.body;

  try {
    // Find the playlist by ID
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Update the playlist properties
    playlist.name = name;
    playlist.podcasts = podcasts;

    // Save the updated playlist to the database
    await playlist.save();

    res.status(200).json({ message: "Playlist updated successfully" });
  } catch (error) {
    console.error("Error updating playlist:", error);
    res.status(500).json({ message: "Failed to update playlist" });
  }
};

// Controller function to delete an existing playlist by ID
const deletePlaylist = async (req, res) => {
  const playlistId = req.params.id;

  try {
    // Find the playlist by ID and remove it
    const result = await Playlist.findByIdAndRemove(playlistId);

    if (!result) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Failed to delete playlist" });
  }
};

// Controller function to get a list of playlists based on the user
const getPlaylistByName = async (req, res) => {
  const name = req.params.name;
  const {id :user_id} =req.user;
  try {
    // Retrieve the category by its name
    const playlist = await Playlist.findOne({ name: name });

    if (!playlist) {
      return res.status(404).json({ message: "playlist not found" });
    }
    if (playlist.user_id==user_id){
      // Extract podcast IDs from the category
      const podcastIds = playlist.podcasts || [];
      // Fetch podcasts using the array of podcast IDs
      const podcasts = await Podcast.find({ _id: { $in: podcastIds } });
      res.status(200).json(podcasts);
    }else{
        res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Failed to fetch category" });
  }
};

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistByName,
};
