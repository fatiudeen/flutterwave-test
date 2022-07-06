import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ErrorResponse from './Error';

export default {
  error404: (_req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: 'Route not Found',
    });
  },
  errorHandler: (
    err: ErrorResponse | Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    _next: NextFunction,
  ) => {
    const error = { ...err };

    error.message = err.message;

    let statusCode: number;
    if ('statusCode' in error) {
      statusCode = error.statusCode;
    } else {
      statusCode = 500;
    }

    res.status(statusCode).json({
      sucess: false,
      message: error.message || 'Server Error',
      error,
    });
  },
  validator: (req: Request, _res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.array();
      throw new ErrorResponse('user input validation error', 400, error);
    }
    next();
  },
};
