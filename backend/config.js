const mongoose = require("mongoose");

const dbConfig = {
  host: "localhost", // MongoDB host (replace with your database host)
  port: "3001", // MongoDB port (replace with your database port)
  dbName: "podcast", // Replace with your database name
};
mongoose.set("strictQuery", true);
mongoose.connect(
  `mongodb+srv://niteeshch57:12345@podcast-db.g14bwz8.mongodb.net/podcast`,
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.on("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
