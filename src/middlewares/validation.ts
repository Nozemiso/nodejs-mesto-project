import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import BadRequestError from '../errors/badRequestError';
import UnauthorizedError from '../errors/unauthorizedError';

export const validateHeaders = (
  schema: z.ZodSchema,
) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.headers);
  if (!result.success) next(new UnauthorizedError());
  else next();
};

export const validateBody = (
  schema: z.ZodSchema,
) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.body);
  if (!result.success) next(new BadRequestError('Некорректный формат данных.', result.error.errors));
  else next();
};

export const validateParams = (
  schema: z.ZodSchema,
) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.params);
  if (!result.success) next(new BadRequestError('Некорректный формат данных.', result.error.errors));
  else next();
};
