import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/customError';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode || 500).send({ message: err.message || 'Внутренняя ошибка сервера' });
  next();
};

export default errorHandler;
