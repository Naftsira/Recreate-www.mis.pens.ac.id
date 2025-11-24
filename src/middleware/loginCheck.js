const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token || req.body?.token || req.query?.token || req.headers["x-access-token"];

  // check
  if (!token) {
    return next();
  }

  //   verify
  try {
    const decodedToken = await jwt.verify(token, TOKEN_KEY);
    req.currentUser = decodedToken;
  } catch (error) {
    return next();
  }
  //   continue to private
  return res.redirect("/api/v1/user/private");
};

module.exports = verifyToken;
