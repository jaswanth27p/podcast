const express = require("express");
const podcastsRouter = express.Router();
const {
  createPodcast,
  getPodcast,
  updatePodcast, // Add the controller function for updating
  deletePodcast, // Add the controller function for deleting
} = require("../controllers/podcastsContoller");

podcastsRouter.route("/").post(createPodcast);
podcastsRouter
  .route("/:id")
  .put(updatePodcast)
  .delete(deletePodcast)
  .get(getPodcast);

module.exports = podcastsRouter;