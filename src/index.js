const { prototype } = require("events");
const app = require("./app.js");

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
