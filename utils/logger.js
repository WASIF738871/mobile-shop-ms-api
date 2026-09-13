const winston = require("winston");

const env = require("../config/env");

const loggerTransports = [
  // Always log to console
  new winston.transports.Console({
    format:
      env.nodeEnv === "production"
        ? winston.format.json()
        : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
  }),
];

// File logging ONLY in development
if (env.nodeEnv !== "production") {
  loggerTransports.push(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "logs/combined.log",
    })
  );
}

const logger = winston.createLogger({
  level: env.nodeEnv === "development" ? "debug" : "info",

  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),

  defaultMeta: {
    service: "ms-api",
  },

  transports: loggerTransports,
});

module.exports = logger;