const express = require("express");
const app = express();
const mongoose = require("./config");
const cors = require("cors");
// Middleware to parse JSON data
app.use(express.json());
app.use(cors());
//Import and use the routers
const credentialsRouter = require("./routes/credentialsRouter");
const podcastsRouter = require("./routes/podcastsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const playlistsRouter = require("./routes/playlistsRouter");

app.use("/credentials", credentialsRouter); // Use the credentials router at '/credentials'
app.use("/podcasts", podcastsRouter); // Use the podcasts router at '/podcasts'
app.use("/categories", categoriesRouter); // Use the categories router at '/categories'
app.use("/playlists", playlistsRouter); // Use the playlists router at '/playlists'

// Other middleware and configurations go here

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
