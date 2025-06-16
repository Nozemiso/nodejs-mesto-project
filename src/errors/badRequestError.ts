import CustomError from './customError';

class BadRequestError extends CustomError {
  constructor(public message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
