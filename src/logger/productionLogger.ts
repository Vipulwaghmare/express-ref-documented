import { createLogger, format, transports, Logger } from "winston"
import { Mail } from 'winston-mail'

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] - [${level}] : ${message}`;
});

// ENV VARIABLE TYPES
// !DUPLICATE
declare var process: {
  env: {
    SESSION_SECRET: string,
    MONGODB_URL: string,
    SMTP_SERVER: string,
    SMTP_PORT: string,
    SMTP_LOGIN: string,
    SMTP_PASSWORD: string,
    SMTP_SENDER: string
  }
}

const options = {
  to: "vipulwaghmare2202@gmail.com",
  port: parseInt(process.env.SMTP_PORT),
  host: process.env.SMTP_SERVER,
  secure: false,
  auth: {
    user: process.env.SMTP_SENDER,
    pass: process.env.SMTP_PASSWORD,
  },
}

const myLogger = (): Logger => {
  return createLogger({
    level: 'debug',
    format: combine(
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.Console(),
      // new transports.File({
      //   filename: 'error.log', level: 'error',
      //   maxsize: 5242880
      // }), // 0
      // new transports.File({
      //   filename: 'warnings.log', level: "warn",
      //   maxsize: 5242880
      // }), // 1
      // new transports.File({
      //   filename: 'info.log', level: "info",
      //   maxsize: 5242880
      // }), // 2
      // new transports.File({
      //   filename: 'debug.log', level: "debug",
      //   maxsize: 5242880
      // }),// 5
      // new transports.File({
      //   filename: 'combined.log',
      //   maxsize: 5242880
      // }),// 5 
      // new Mail(options)
    ],
  });
}

export default myLogger