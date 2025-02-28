import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
import ApiError from "./apiError";

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {

    console.log(err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

  
    logger.error(`${statusCode} - ${message} - ${req.method} ${req.originalUrl}`);
  
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
};

export default errorHandler;