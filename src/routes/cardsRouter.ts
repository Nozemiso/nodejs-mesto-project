import { Router } from 'express';
import {
  createCard, deleteCard, getCards, placeLike, removeLike,
} from '../controllers/cardsController';

const cardsRouter = Router();

cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);
cardsRouter.delete('/:id', deleteCard);

cardsRouter.put('/:id/likes', placeLike);
cardsRouter.delete('/:id/likes', removeLike);

export default cardsRouter;
