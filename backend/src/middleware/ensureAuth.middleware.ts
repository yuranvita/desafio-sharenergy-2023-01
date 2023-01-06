import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ message: "Token not valid" });
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.SECRET_KEY!) as IPayLoad;

    req.userId = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err });
  }
}
