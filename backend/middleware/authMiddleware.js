// authMiddleware.js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Get token from headers
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Remove 'Bearer' from the token if present
    const actualToken = token.split(" ")[1] || token;

    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
