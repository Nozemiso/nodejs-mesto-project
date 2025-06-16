import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import user from '../models/user';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  user.create({ name, about, avatar })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании пользователя. '));
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
  const { id } = req.body.user;
  user.findByIdAndUpdate({ _id: id }, { name, about }, { new: true, runValidators: true })
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
  const { id } = req.body.user;
  user.findByIdAndUpdate({ _id: id }, { avatar }, { new: true, runValidators: true })
    .then((result) => {
      if (!result) next(new NotFoundError('Пользователь по указанному _id не найден.'));
      res.send(result);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при обновлении аватара. '));
      else next(err);
    });
};
