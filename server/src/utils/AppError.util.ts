export interface IAppError extends Error {
  statusCode: number;
}

class AppError extends Error implements IAppError {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  // keyValue(keyValue: any) {
  //   throw new Error("Method not implemented!");
  // }

  // code: number | undefined;
  // path: unknown;

  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
