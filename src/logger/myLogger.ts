import { createLogger, format, transports, Logger } from "winston"

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${level}] : ${message}`;
});

const myLogger = (): Logger => {
  return createLogger({
    level: 'debug',
    format: combine(
      // colorize(),
      // label({ label: 'right meow!' }),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
    ),
    // defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
      new transports.Console(),
      new transports.File({ filename: 'error.log', level: 'error' }), // 0
      new transports.File({ filename: 'warnings.log', level: "warn" }), // 1
      new transports.File({ filename: 'info.log', level: "info" }), // 2
      new transports.File({ filename: 'debug.log', level: "debug" }),// 5
      new transports.File({ filename: 'combined.log' }),// 5
    ],
  });
}

export default myLogger