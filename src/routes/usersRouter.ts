import { Router } from 'express';
import {
  getMe,
  getUser, getUsers, updateAvatar, updateAvatarSchema, updateUser, updateUserSchema,
} from '../controllers/usersController';
import { validateBody, validateParams } from '../middlewares/validation';
import { requireIdParam } from '../controllers/cardsController';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:id', validateParams(requireIdParam), getUser);

usersRouter.patch('/me', validateBody(updateUserSchema), updateUser);
usersRouter.patch('/me/avatar', validateBody(updateAvatarSchema), updateAvatar);

export default usersRouter;
