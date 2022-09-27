const errorHandler = (err, req, res, next) => {
  console.log("X---------->\n", err);
  res.status(500).send("Something went wrong");
};

module.exports = errorHandler;
