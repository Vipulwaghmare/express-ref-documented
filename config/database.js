const mongoose = require("mongoose");
const logger = require("../src/logger");

const { MONGODB_URL } = process.env;

function dbConnection() {
  mongoose
    .connect(MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      logger.error("DB Connection Failed : " + error);
    });
}
module.exports = dbConnection;
