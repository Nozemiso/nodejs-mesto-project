import { Router } from 'express';
import {
  getMe,
  getUser, getUsers, updateAvatar, updateUser,
} from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:id', getUser);

usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
