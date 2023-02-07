const jwt = require("jsonwebtoken");

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("please enter valid token");
  }
  const data = jwt.verify(token, "ayushsingh");
  req.id = data.id;
  next();
};

module.exports = fetchUser;
