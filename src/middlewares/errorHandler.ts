import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/customError';

const errorHandling = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({ message: err.message });
  next();
};

export default errorHandling;
