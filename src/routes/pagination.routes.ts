import express from "express";
import { pagination } from "../controllers/pagination.controller";
import errorHandler from "../middleware/errorHandler";
import paginationMiddleware from "../middleware/pagination";

const paginationRoute = express.Router();

paginationRoute.route("/pagination").get(paginationMiddleware('dd'), pagination, errorHandler);

export default paginationRoute;
