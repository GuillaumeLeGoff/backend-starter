import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import { Service } from "typedi";
import { HttpException } from "../../exceptions/HttpException";
import { LoginUserDto, RegisterDto } from "./auth.validation";

const prisma = new PrismaClient();

@Service()
export class AuthService {
  async register(userData: RegisterDto): Promise<User> {
    const findUser = await prisma.user.findUnique({
      where: { username: userData.username },
    });
    if (findUser) {
      throw new HttpException(
        409,
        `This username ${userData.username} already exists`
      );
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        username: userData.username,
        password: hashedPassword,
      },
    });

    await prisma.userSettings.create({
      data: {
        user_id: user.id,
        language: "FR",
      },
    });

    const uploadDir = path.join(__dirname, `../../uploads/${user.username}`);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    return user;
  }

  async login(credentials: LoginUserDto): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { username: credentials.username },
    });

    if (!user) {
      throw new HttpException(401, "Incorrect username or password");
    }

    const isValidPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isValidPassword) {
      throw new HttpException(401, "Incorrect username or password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  }
}
