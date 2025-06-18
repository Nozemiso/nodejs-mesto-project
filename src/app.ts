import mongoose from 'mongoose';
import express from 'express';
import { z } from 'zod';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import NotFoundError from './errors/notFoundError';
import errorHandler from './middlewares/errorHandler';
import {
  createUser, login, loginSchema, userSchema,
} from './controllers/usersController';
import config from './conifg';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';
import { validateBody, validateHeaders } from './middlewares/validation';

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/login', validateBody(loginSchema), login);
app.post('/signup', validateBody(userSchema), createUser);

const headersSchema = z.object({
  authorization: z.string().startsWith('Bearer '),
}).passthrough();

app.use(validateHeaders(headersSchema), auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(config.port);
