const { createLogger, format, transports } = require("winston");

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${level}] : ${message}`;
});

const devLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(
      // colorize(),
      // label({ label: 'right meow!' }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat,
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.Console(),
      new transports.File({
        filename: "./logs/devLogs/error.log",
        level: "error",
        maxsize: 5242880,
      }), // 0
      new transports.File({
        filename: "./logs/devLogs/warnings.log",
        level: "warn",
        maxsize: 5242880,
      }), // 1
      new transports.File({
        filename: "./logs/devLogs/info.log",
        level: "info",
        maxsize: 5242880,
      }), // 2
      new transports.File({
        filename: "./logs/devLogs/debug.log",
        level: "debug",
        maxsize: 5242880,
      }), // 5
      new transports.File({
        filename: "./logs/devLogs/combined.log",
        maxsize: 5242880,
      }), // 5
    ],
    exceptionHandlers: [
      new transports.File({ filename: "./logs/devLogs/exceptions.log" }),
    ],
  });
};

module.exports = devLogger;
