import CustomError from './customError';

class Forbidden extends CustomError {
  constructor(public message: string = 'Недостаточно прав для совершения операции.') {
    super(message);
    this.statusCode = 403;
  }
}

export default Forbidden;
