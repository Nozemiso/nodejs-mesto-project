import { Request, Response } from 'express';
import CustomError from '../errors/customError';

const errorHandling = (err: CustomError, req: Request, res: Response) => {
  res.status(err.statusCode || 500).send({ message: err.message });
};

export default errorHandling;
