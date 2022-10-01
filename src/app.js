const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const multer = require("multer");
const session = require("express-session");
const dotEnv = require("dotenv");
const helmet = require("helmet");
const logger = require("./logger");
const cron = require("node-cron");

dotEnv.config({ path: "./config/.env" });
const dbConnection = require("../config/database");
const { errorLogger, errorResponder } = require("./middleware/errorHandler");
const pageNotFound = require("./middleware/pageNotFound");

// Routes import
const authRoutes = require("./routes/auth.routes");
const corsOptions = require("../config/cors");
// // const paginationRoute = require('./routes/pagination.routes')

const swaggerDocument = YAML.load("./swagger.yaml");
const app = express();
const upload = multer({ dest: "uploads/" });
dbConnection();

// try {
//   cron.schedule("*/10 * * * * *", function () {
//     console.log("running a task every 10 second");
//   });
// } catch (error) {
//   logger?.error("ERROR")
// }
// * AUTH WITH SESSION
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);
// Middlewares
app.use(express.urlencoded({ extended: false })); // For content-type: application/x-www-form-urlencoded
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet()); // Helmet is used for security : Adds additional headers to req res
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.get("/", (req: Request, res: Response) => {
//   logger?.info("INSIDE GET FUNTION")
//   throw Error("TRHOW");
//   // res.send("Hi Mom");
//   res.send("BRO")
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "views", "index.html"));
// });

// // Routes
app.use("/api/v1", authRoutes);
// // app.use("/api/v1", paginationRoute)

// // app.use();
app.use(errorLogger);
app.use(errorResponder);
app.use(pageNotFound);

// logger.info("STARTING")
// logger.info("logger")
// logger.error("ERROR")
// logger.warn("ERROR")
// logger.debug("ERROR")

module.exports = app;
