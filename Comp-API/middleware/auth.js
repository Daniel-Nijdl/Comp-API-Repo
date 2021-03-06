const jwt = require("jsonwebtoken");
const { UnAuthError } = require("../errors")
require("dotenv").config();

const auth = async (req, res, next) => {
  const authheader = req.headers.authorization;
  if (!authheader || !authheader.startsWith("Bearer")) {
    throw new UnAuthError("Not authorized to access this part of the site");
  }

  const token = authheader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userID: payload.userID, name: payload.name };
    next();
  } catch (err) {
    throw new UnAuthError("Authorization Invalid");
  }
};

module.exports = auth;
