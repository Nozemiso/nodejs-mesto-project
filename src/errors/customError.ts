class CustomError extends Error {
  payload?: Object;

  statusCode?: number;

  constructor(public message: string, payload?: Object) {
    super(message);
    this.payload = payload || {};
  }
}

export default CustomError;
