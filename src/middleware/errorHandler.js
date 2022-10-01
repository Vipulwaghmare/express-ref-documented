const logger = require("../logger");

const errorLogger = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

const errorResponder = (err, req, res, next) => {
  res.status(500).send({ error: "Something went wrong" });
};

module.exports = { errorLogger, errorResponder };
