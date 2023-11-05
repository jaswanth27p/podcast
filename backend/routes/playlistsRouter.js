const express = require("express");
const playlistRouter = express.Router();
const {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
  getPlaylistsByUser,
} = require("../controllers/playlistsController");

// Route to create a new playlist
playlistRouter.post("/", createPlaylist);

// Route to get a list of all playlists
playlistRouter.get("/", getPlaylists);

playlistRouter
  .route("/:id")
  .get(getPlaylistById)
  .put(updatePlaylist)
  .delete(deletePlaylist);
// Route to get a list of playlists based on the user
playlistRouter.get("/user/:user_id", getPlaylistsByUser);

module.exports = playlistRouter;
