const jwt = require("jsonwebtoken");

const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Token not provided", result: false });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid token", result: false });
      }
      req.user = decoded.user;

      next();
    });
  } catch (error) {
    return res
      .status(500)
      .json({   message: error.message, result: false });
  }
};

module.exports = verifyUser;