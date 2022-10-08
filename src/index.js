const mongoose = require("mongoose");
const app = require("./app.js");

let PORT = process.env.PORT || 8080;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
  });
});
