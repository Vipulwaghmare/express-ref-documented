module.exports = (err, req, res, next) => {
  console.log("X---------->\n", err);
  res.status(500).send("Something went wrong");
};
