const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://jaswanth27p:BO7uK1V7ywROiH0F@cluster0.9ijk5io.mongodb.net/Podcasts`
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
