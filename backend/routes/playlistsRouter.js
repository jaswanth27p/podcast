import { validateUser } from "../middleware/validateUser";

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
const { validateUser } = require("../middleware/validateUser");

// Route to create a new playlist
playlistRouter.post("/",validateUser, createPlaylist);

// Route to get a list of all playlists
playlistRouter.get("/", validateUser, getPlaylists);

playlistRouter
  .route("/:id")
  .get(getPlaylistById)
  .put(validateUser,updatePlaylist)
  .delete(validateUser ,deletePlaylist);
// Route to get a list of playlists based on the user
playlistRouter.get("/user/:user_id",validateUser, getPlaylistsByUser);

module.exports = playlistRouter;
