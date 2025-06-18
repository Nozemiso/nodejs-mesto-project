import CustomError from './customError';

class BadRequestError extends CustomError {
  constructor(public message: string, payload?: Object) {
    super(message, payload);
    this.statusCode = 400;
  }
}

export default BadRequestError;
