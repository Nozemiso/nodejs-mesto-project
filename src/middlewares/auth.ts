import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/unauthorizedError';
import config from '../conifg';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let payload;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError();
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, config.jwt_secret);
  } catch (error) {
    next(new UnauthorizedError());
  }
  req.body.user = payload;
  next();
};

export default auth;
