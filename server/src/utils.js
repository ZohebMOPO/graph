const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some";

function getPayloadToken(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("Token is not authorizing");
      }

      const { userId } = getPayloadToken(token);
      return userId;
    } else if (authToken) {
      const { userId } = getPayloadToken(authToken);
      return userId;
    }
  }

  throw new Error("Cant be authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
