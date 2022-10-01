const devLogger = require("./devLogger");
const prodLogger = require("./prodLogger");

let logger = devLogger();

if (process.env.NODE_ENV === "production") {
  logger = prodLogger();
}

// ! Test only
// logger = prodLogger();

module.exports = logger;
