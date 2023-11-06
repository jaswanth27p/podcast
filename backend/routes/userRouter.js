const express = require("express");
const userRouter = express.Router();
const {validateAdmin ,validateUser}= require("../middleware/validateUser");

userRouter.get("/user",validateUser, (req, res) => {
  const user = req.user;
  res.json({ user });
});
userRouter.get("/admin",validateAdmin, (req, res) => {
  const user = req.user;
  res.json({ user });
});

module.exports = userRouter;