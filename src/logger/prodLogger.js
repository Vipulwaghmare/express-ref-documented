const { createLogger, format, transports } = require("winston");
const { Mail } = require("winston-mail");

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${level}] : ${message}`;
});

const options = {
  to: "vipulwaghmare2202@gmail.com",
  from: process.env.SMTP_SENDER,
  host: process.env.SMTP_SERVER,
  subject: "Backend broke",
  username: process.env.SMTP_LOGIN,
  password: process.env.SMTP_PASSWORD,
  ssl: true,
};

const prodLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      format.splat(),
      format.simple(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat,
    ),
    handleExceptions: true,
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "./logs/prodLogs/error.log",
        level: "error",
        maxsize: 5242880,
      }),
      new transports.File({
        filename: "./logs/prodLogs/warnings.log",
        level: "warn",
        maxsize: 5242880,
      }),
      new transports.File({
        filename: "./logs/prodLogs/info.log",
        level: "info",
        maxsize: 5242880,
      }),
      new transports.File({
        filename: "./logs/prodLogs/debug.log",
        level: "debug",
        maxsize: 5242880,
      }),
      new transports.File({
        filename: "./logs/prodLogs/combined.log",
        maxsize: 5242880,
      }),
      new transports.Mail(options),
    ],
    exceptionHandlers: [
      new transports.File({ filename: "./logs/prodLogs/exceptions.log" }),
      new transports.Mail(options),
    ],
  });
};

module.exports = prodLogger;
