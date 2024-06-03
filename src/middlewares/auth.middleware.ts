import { HttpException } from "../exceptions/HttpException";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const getAuthorization = (req) => {
  const header = req.header("Authorization");

  if (header) {
    return header.split(" ")[1];
  }

  return null;
};

export const authMiddleware = async (req, res, next) => {
  const token = getAuthorization(req);

  if (!token) {
    return next(
      new HttpException(
        401,
        "Accès refusé. Aucun jeton d'authentification fourni."
      )
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const currentTime = Date.now() / 1000; 
    if (decoded.exp < currentTime) {
      const newToken = jwt.sign(
        { userId: decoded.userId, sessionId: decoded.sessionId },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      req.header("x-auth-token", newToken); 
    }

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, "Jeton d'authentification expiré."));
    }
    throw new HttpException(400, "Jeton d'authentification invalide.");
  }
};
