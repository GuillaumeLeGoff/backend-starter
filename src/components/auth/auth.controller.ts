import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto, RegisterDto } from "./auth.validation";

@Service()
export class AuthController {
  constructor(@Inject(() => AuthService) private authService: AuthService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto & RegisterDto = req.body;
      const user: User = await this.authService.register(userData);
      res
        .status(201)
        .json({ data: user, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials: LoginUserDto = req.body;
      const token = await this.authService.login(credentials);
      res.status(200).json({ data: token, message: "Logged in successfully" });
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  };
}
