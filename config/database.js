const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;
console.log("MOG", process.env.PORT);

function dbConnection() {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.log("DB ERROR", error);
      process.exit(1);
    });
}

module.exports = dbConnection;
