const express = require("express");
const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const multer = require("multer");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "./config/.env" });
const dbConnection = require("./config/database");
const errorHandler = require("./middleware/errorHandler");
const pageNotFound = require("./middleware/pageNotFound");

// Routes import
const authRoutes = require("./routes/auth");

// Set - Up
const swaggerDocument = YAML.load("./swagger.yaml");
const app = express();
const upload = multer({ dest: "uploads/" });
dbConnection();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_, res) => {
  throw Error;
  res.send("Hi Mom");
});
// Routes
app.use("/api/v1", authRoutes);

// app.use();
app.use(errorHandler);
app.use(pageNotFound);

module.exports = app;
