import { createLogger, format, transports } from "winston";

const logger = createLogger({
    level: "info",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, msg }) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${msg}`;
        })
    ),
    transports: [
        new transports.File({ filename: "logs/error.log", level: "info" }),
        new transports.Console(),
    ],
});

export default logger;