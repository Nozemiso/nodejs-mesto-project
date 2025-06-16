import CustomError from './customError';

class NotFoundError extends CustomError {
  constructor(public message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
