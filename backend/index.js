const express = require("express");
const app = express();
const mongoose = require("./config");
const cors = require("cors");
// Middleware to parse JSON data
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//Import and use the routers
const credentialsRouter = require("./routes/credentialsRouter");
const podcastsRouter = require("./routes/podcastsRouter");
const categoriesRouter = require("./routes/categoriesRouter");
const playlistsRouter = require("./routes/playlistsRouter");
const userRouter = require("./routes/userRouter");

const validateToken = require("./middleware/userData");

app.use("/credentials", credentialsRouter); // Use the credentials router at '/credentials'
app.use("/podcasts", podcastsRouter); // Use the podcasts router at '/podcasts'
app.use("/categories", categoriesRouter); // Use the categories router at '/categories'
app.use("/playlists", playlistsRouter); // Use the playlists router at '/playlists'
app.use("/api", validateToken, userRouter);
// Other middleware and configurations go here

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
