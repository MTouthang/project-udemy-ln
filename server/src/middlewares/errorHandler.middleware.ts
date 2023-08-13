import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import AppError from "@/utils/AppError.util";

const errorHandler: ErrorRequestHandler = async (
  err: AppError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
