import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { Md5 } from 'ts-md5';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import user from '../models/user';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import UnauthorizedError from '../errors/unauthorizedError';
import config from '../conifg';
import ConflictError from '../errors/conflictError';

export const userSchema = z.object({
  name: z.string().min(2).max(30).optional(),
  about: z.string().min(2).max(200).optional(),
  avatar: z.string().url().optional(),
  email: z.string().email(),
  password: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(30),
  about: z.string().min(2).max(200),
});

export const updateAvatarSchema = z.object({
  avatar: z.string().url(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  user.create({
    name, about, avatar, email, password: Md5.hashStr(password),
  })
    .then((result) => user.findById(result._id).select('-password'))
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании пользователя. '));
      else if (err.code === 11000) next(new ConflictError('Пользователь с таким e-mail уже существует.'));
      else next(err);
    });
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  user.find({}).then((result) => {
    res.send(result);
  }).catch((err) => next(err));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id);
  user.findById(id)
    .then((result) => {
      if (!result) next(new NotFoundError('Пользователь по указанному _id не найден.'));
      res.send(result);
    }).catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Передан некорректный _id пользователя. '));
      else next(err);
    });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const { _id } = req.body.user;
  user.findByIdAndUpdate({ _id }, { name, about }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) next(new NotFoundError('Пользователь по указанному _id не найден.'));
      res.send(result);
    }).catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении профиля. '));
      else next(err);
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const { _id } = req.body.user;
  user.findByIdAndUpdate({ _id }, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) next(new NotFoundError('Пользователь по указанному _id не найден.'));
      res.send(result);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении аватара. '));
      else next(err);
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password').then((result) => {
    if (!result) next(new UnauthorizedError());
    else if (Md5.hashStr(password) !== result.password) next(new UnauthorizedError('Неверный логин или пароль'));
    else res.status(200).send({ token: jwt.sign({ _id: result._id }, config.jwt_secret, { expiresIn: '7d' }) });
  });
};

export const getMe = (req: Request, res: Response, next: NextFunction) => {
  user.findOne({ _id: req.body.user._id }).then((result) => {
    if (!result) next(new NotFoundError('Пользователь по указанному _id не найден.'));
    res.send(result);
  }).catch((err) => next(err));
};
