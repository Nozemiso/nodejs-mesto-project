import { NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import card from '../models/card';
import NotFoundError from '../errors/notFoundError';
import BadRequestError from '../errors/badRequestError';
import InternalServerError from '../errors/internalServerError';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  card.find({}).then((cards) => {
    res.send(cards);
  }).catch((err) => next(new InternalServerError(err)));
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = req.body.user.id;
  card.create({ name, link, owner }).then((result) => {
    res.send(result);
  }).catch((err) => {
    if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные при создании карточки. '));
    else next(new InternalServerError(err));
  });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  card.remove({ _id: id }).then((result) => {
    if (result.deletedCount === 0) next(new NotFoundError('Карточка с указанным _id не найдена.'));
    res.send(result);
  }).catch((err) => {
    if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Передан некорректный _id карточки. '));
    else next(new InternalServerError(err));
  });
};

export const placeLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  card.findByIdAndUpdate(id, {
    $addToSet: { likes: req.body.user.id },
  }, { new: true }).then((result) => {
    if (!result) next(new NotFoundError('Передан несуществующий _id карточки.'));
    res.send(result);
  })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки. '));
      else next(new InternalServerError(err));
    });
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  card.findByIdAndUpdate(id, {
    $pull: { likes: req.body.user.id },
  }, { new: true })
    .then((result) => {
      if (!result) next(new NotFoundError('Передан несуществующий _id карточки.'));
      res.send(result);
    })
    .catch((err) => {
      if (err instanceof Error.CastError || err instanceof Error.ValidationError) next(new BadRequestError('Переданы некорректные данные для постановки/снятия лайка или некорректный _id карточки. '));
      else next(new InternalServerError(err));
    });
};
