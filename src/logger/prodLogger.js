const { createLogger, format, transports } = require("winston");
const { Mail } = require("winston-mail");

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${level}] : ${message}`;
});

const options = {
  to: "vipulwaghmare2202@gmail.com",
  port: parseInt(process.env.SMTP_PORT),
  host: process.env.SMTP_SERVER,
  secure: false,
  auth: {
    user: process.env.SMTP_SENDER,
    pass: process.env.SMTP_PASSWORD,
  },
};

const prodLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp({ format: "DD-MM-YYYY HH:mm:ss" }), myFormat),
    handleExceptions: true,
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "./logs/prodLogs/error.log",
        level: "error",
        maxsize: 5242880,
      }), // 0
      new transports.File({
        filename: "./logs/prodLogs/warnings.log",
        level: "warn",
        maxsize: 5242880,
      }), // 1
      new transports.File({
        filename: "./logs/prodLogs/info.log",
        level: "info",
        maxsize: 5242880,
      }), // 2
      new transports.File({
        filename: "./logs/prodLogs/debug.log",
        level: "debug",
        maxsize: 5242880,
      }), // 5
      new transports.File({
        filename: "./logs/prodLogs/combined.log",
        maxsize: 5242880,
      }), // 5
      // new Mail(options)
    ],
    exceptionHandlers: [
      new transports.File({ filename: "./logs/prodLogs/exceptions.log" }),
    ],
  });
};

module.exports = prodLogger;
