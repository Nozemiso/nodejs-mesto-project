import CustomError from './customError';

class ConflictError extends CustomError {
  constructor(public message: string) {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
