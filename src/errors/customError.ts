class CustomError extends Error {
  payload?: Object;

  statusCode?: number;

  constructor(public message: string) {
    super(message);
  }
}

export default CustomError;
