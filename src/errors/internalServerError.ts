import CustomError from './customError';

class InternalServerError extends CustomError {
  constructor(error: Error, public message: string = 'Внутренняя ошибка сервера') {
    super(message);
    this.statusCode = 500;
    this.payload = error.message;
  }
}

export default InternalServerError;
