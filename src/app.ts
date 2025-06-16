import mongoose from 'mongoose';

import express, { NextFunction, Request, Response } from 'express';
import usersRouter from './routes/usersRouter';
import cardsRouter from './routes/cardsRouter';
import NotFoundError from './errors/notFoundError';
import errorHandler from './middlewares/errorHandler';

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  req.body.user = { _id: '684f7990e16380d35a3194a6' };
  next();
});

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});
app.use(errorHandler);

app.listen(3000);
