const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://jaswanth27p:<password>@cluster0.9ijk5io.mongodb.net/`
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
