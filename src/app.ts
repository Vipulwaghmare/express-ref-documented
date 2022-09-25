import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import multer from 'multer'
import session from 'express-session'
import dotEnv from 'dotenv'
import helmet from "helmet";
import logger from './logger'
import cron from 'node-cron'

// dotEnv.config({ path: './config/.env' })
import dbConnection from "../config/database"
import errorHandler from "./middleware/errorHandler"
import pageNotFound from "./middleware/pageNotFound"

// Routes import 
import authRoutes from './routes/auth.routes'
// import paginationRoute from './routes/pagination.routes'

const swaggerDocument = YAML.load("./swagger.yaml");
const app = express()
const upload = multer({ dest: "uploads/" });
dbConnection();

// ENV VARIABLE TYPES
declare var process: {
  env: {
    SESSION_SECRET: string,
    MONGODB_URL: string,
    SMTP_SERVER: string,
    SMTP_PORT: string,
    SMTP_LOGIN: string,
    SMTP_PASSWORD: string,
  }
}
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
app.use(express.json());
app.use(cookieParser());
// Helmet is used for security : Adds additional headers to req res
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req: Request, res: Response) => {
  logger?.info("INSIDE GET FUNTION")
  throw Error("TRHOW");
  // res.send("Hi Mom");
  res.send("BRO")
});

// Routes
app.use("/api/v1", authRoutes);
// app.use("/api/v1", paginationRoute)

// app.use();
// app.use(errorHandler);
app.use(pageNotFound);

logger.info("STARTING")
logger.info("logger")
logger.error("ERROR")
logger.warn("ERROR")
logger.debug("ERROR")

export default app;