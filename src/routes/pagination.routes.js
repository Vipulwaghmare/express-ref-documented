const express = require("express");
const { pagination } = require("../controllers/pagination.controller");
const errorHandler = require("../middleware/errorHandler");
const paginationMiddleware = require("../middleware/pagination");

const paginationRoute = express.Router();

paginationRoute
  .route("/pagination")
  .get(paginationMiddleware("dd"), pagination, errorHandler);

module.exports = paginationRoute;
