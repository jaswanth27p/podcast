const express = require("express");
const podcastsRouter = express.Router();
const {
  getPodcastsByUser,
  createPodcast,
  getPodcast,
  updatePodcast, // Add the controller function for updating
  deletePodcast, // Add the controller function for deleting
} = require("../controllers/podcastsContoller");
const { validateAdmin } = require("../middleware/validateUser");

podcastsRouter.route("/").post(validateAdmin,createPodcast).get(validateAdmin,getPodcastsByUser);
podcastsRouter
  .route("/:id")
  .put(updatePodcast)
  .delete(deletePodcast)
  .get(getPodcast);

module.exports = podcastsRouter;