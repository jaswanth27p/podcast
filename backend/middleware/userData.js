const { verifyToken } = require("../auth");

const validateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = verifyToken(token.split(" ")[1]);
  if (!user) {
    return res.status(403).json({ message: "Token verification failed" });
  }
  req.user = user;
  next();
};

module.exports = validateToken;
