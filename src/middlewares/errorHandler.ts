import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/customError';

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  if (!err.statusCode || err.statusCode === 500) res.status(500).send({ message: 'Внутренняя ошибка сервера' });
  else res.status(err.statusCode).send({ message: err.message });
  next();
};

export default errorHandler;
