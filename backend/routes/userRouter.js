const express = require("express");
const userRouter = express.Router();

userRouter.get("/user-data", (req, res) => {
  const user = req.user;
  res.json({ user });
});

module.exports = userRouter;