import { Request, Response, NextFunction } from "express";
import { UserPayload } from "../types/UserPayload";

interface CustomRequest extends Request {
  user?: UserPayload;
}

export const extractUserId = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    req.user.id = Number(req.user.id);
    req.user.username = String(req.user.username);
  }
  next();
};
