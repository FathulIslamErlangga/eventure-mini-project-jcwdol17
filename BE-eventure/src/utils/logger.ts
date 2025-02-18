import winston from "winston";
import path from "path";
import fs from "fs";

const logDirectory = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
  })
);

class Logger {
  private logger: winston.Logger;

  constructor(logFileName: string) {
    this.logger = winston.createLogger({
      level: "info",
      format: logFormat,
      transports: [
        new winston.transports.File({
          filename: path.join(logDirectory, logFileName),
          maxsize: 5 * 1024 * 1024,
          maxFiles: 3,
        }),
      ],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  error(message: string) {
    this.logger.error(message);
  }
}

// Logger khusus untuk cron job
export const cronLogger = new Logger("expiredPoints.log");
export const notifLogger = new Logger("notification.log");
export const userLogger = new Logger("user.log");
