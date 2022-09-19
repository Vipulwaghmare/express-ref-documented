import winston from "winston"
import myLogger from "./myLogger";

let logger: null | winston.Logger = null;

if (process.env.NODE_ENV !== "production") {
  logger = myLogger()
}

export default logger