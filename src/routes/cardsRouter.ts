import { Router } from 'express';
import {
  createCard, createCardSchema, deleteCard, getCards, placeLike, removeLike, requireIdParam,
} from '../controllers/cardsController';
import { validateBody, validateParams } from '../middlewares/validation';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', validateBody(createCardSchema), createCard);
cardsRouter.delete('/:id', validateParams(requireIdParam), deleteCard);

cardsRouter.put('/:id/likes', validateParams(requireIdParam), placeLike);
cardsRouter.delete('/:id/likes', validateParams(requireIdParam), removeLike);

export default cardsRouter;
