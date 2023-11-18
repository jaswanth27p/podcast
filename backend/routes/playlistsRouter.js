const express = require("express");
const playlistRouter = express.Router();
const {
  createPlaylist,
  getPlaylists,
  getPlaylistByName,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playlistsController");
const { validateUser } = require("../middleware/validateUser");

// Route to create a new playlist
playlistRouter.post("/",validateUser, createPlaylist);

// Route to get a list of all playlists
playlistRouter.get("/", validateUser, getPlaylists);

playlistRouter
  .route("/:id")
  .put(validateUser,updatePlaylist)
  .delete(validateUser ,deletePlaylist);
  
// Route to get a list of playlists based on the user
playlistRouter.get("/name/:name",validateUser , getPlaylistByName);

module.exports = playlistRouter;
