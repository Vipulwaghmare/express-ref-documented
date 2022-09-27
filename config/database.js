const mongoose = require("mongoose");

const { MONGODB_URL } = process.env;
console.log("XXX", process.env.MONGODB_URL);

function dbConnection() {
  mongoose
    .connect(MONGODB_URL, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.log("DB Connection Failed");
      console.log("DB ERROR", error);
    });
}
module.exports = dbConnection;
