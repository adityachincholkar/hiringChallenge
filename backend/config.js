// backend/config.js
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/rentify",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
};
