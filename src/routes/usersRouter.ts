import { Router } from 'express';
import {
  createUser, getUser, getUsers, updateAvatar, updateUser,
} from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);

usersRouter.get('/:id', getUser);

usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

export default usersRouter;
