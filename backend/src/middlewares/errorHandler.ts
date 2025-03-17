import { Request, Response, NextFunction } from 'express'
import AppError from './appError'
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  logger.error(err.message, { stack: err.stack });

  if (err instanceof AppError) {
     res.status(err.statusCode).json({
      success: false,
      msg: err.message
    });
  }

   res.status(500).json({
    success: false,
    msg: 'Internal Server Error'
  })
}

export default errorHandler;