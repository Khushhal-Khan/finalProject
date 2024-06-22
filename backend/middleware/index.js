// middleware code here
const jwt = require("jsonwebtoken");

const secretKey = "secret_key";

const jwtMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const data = jwt.verify(token, secretKey);
    req.user = data.userExists;
  } catch (error) {
    return res.status(400).json({ error: "invalid token" });
  }
  next();
};

module.exports = jwtMiddleware;

// verifye/decode
// return user_id in req object

// req.user_id = decoded._id
