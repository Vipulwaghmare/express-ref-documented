const logger = require("../src/logger");

const whitelist = [
  "https://www.youtube.com",
  "http://localhost:3000",
  "http://127.0.0.1:3001",
];

const corsOptions = {
  origin: (origin, callback) => {
    // ! !origin is only for development
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      logger.info("Tried accessing with origin :" + origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
