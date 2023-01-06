import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

function ensureAppError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error ${err.message}`,
  });
}

export { ensureAppError };
