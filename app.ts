import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import multer from 'multer'
import session from 'express-session'
import dotEnv from 'dotenv'

dotEnv.config({ path: './config/.env' })
import dbConnection from "./config/database"
import errorHandler from "./middleware/errorHandler"
import pageNotFound from "./middleware/pageNotFound"

// Routes import
const authRoutes = require("./routes/auth");

const swaggerDocument = YAML.load("./swagger.yaml");
const app = express()
const upload = multer({ dest: "uploads/" });
dbConnection();

// ENV VARIABLE TYPES
declare var process: {
  env: {
    SESSION_SECRET: string,
    MONGODB_URL: string
  }
}

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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.get("/", (req: Request, res: Response) => {
  // throw Error;
  // res.send("Hi Mom");
  res.send("BRO")
});

// Routes
app.use("/api/v1", authRoutes);

// app.use();
app.use(errorHandler);
app.use(pageNotFound);

export default app;