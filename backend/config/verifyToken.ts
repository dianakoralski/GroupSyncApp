import dotenv from "dotenv";

dotenv.config();
const jwt = require("jsonwebtoken");
const secretKey = `${process.env.SECRET_KEY}`;

function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, secretKey, (err: Error, decoded: any) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Attach the decoded user information to the request object
    req.user = decoded;
    //console.log("userInfo returned by verifyToken: ", decoded);
    next();
  });
}

module.exports = verifyToken;
