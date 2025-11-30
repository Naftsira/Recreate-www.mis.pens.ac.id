const jwt = require("jsonwebtoken");

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  // check
  if (!token) {
    return res.status(403).redirect("/login");
  }

  //   verify
  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY);
    req.currentUser = decodedToken;
  } catch (error) {
    return res.status(401).redirect("/login");
  }
  //   to req
  return next();
};

module.exports = verifyToken;
