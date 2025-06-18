import CustomError from './customError';

class UnauthorizedError extends CustomError {
  constructor(public message: string = 'Ошибка авторизации') {
    super(message);
    this.statusCode = 401;
  }
}

export default UnauthorizedError;
