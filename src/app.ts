import mongoose from 'mongoose';
import express from 'express';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import NotFoundError from './errors/notFoundError';
import errorHandler from './middlewares/errorHandler';
import { createUser, login } from './controllers/usersController';
import config from './conifg';
import auth from './middlewares/auth';
import { requestLogger, errorLogger } from './middlewares/logger';

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/login', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(config.port);
