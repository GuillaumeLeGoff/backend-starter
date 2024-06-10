import { log } from "console";
import { PrismaClient, UserSettings } from "@prisma/client";
import { Service } from "typedi";
import { HttpException } from "../../exceptions/HttpException";
const prisma = new PrismaClient();
@Service()
export class UserSettingService {
  public async createUserSetting(
    userSettingData: UserSettings
  ): Promise<UserSettings> {
    const user = await prisma.user.findUnique({
      where: { id: userSettingData.user_id },
    });

    if (!user) {
      throw new HttpException(
        404,
        `User with ID ${userSettingData.user_id} doesn't exist.`
      );
    }
    const userSettings = await prisma.userSettings.findUnique({
      where: { user_id: userSettingData.user_id },
    });

    if (userSettings) {
      throw new HttpException(
        404,
        `User setting for user with ID ${userSettingData.user_id} already exists.`
      );
    }

    return prisma.userSettings.create({
      data: {
        ...userSettingData,
        user_id: userSettingData.user_id,
      },
    });
  }
  public async findAllUserSetting(): Promise<UserSettings[]> {
    return prisma.userSettings.findMany({});
  }

  public async findUserSetting(userId: number): Promise<UserSettings> {
    const userSettings = await prisma.userSettings.findUnique({
      where: { user_id: userId },
    });

    if (!userSettings) {
      throw new HttpException(
        404,
        `User setting for user with ID ${userId} doesn't exist.`
      );
    }

    return userSettings;
  }

  public async updateUserSetting(
    userId: number,
    userSettingData: Partial<UserSettings>
  ): Promise<UserSettings> {
    const userSettings = await prisma.userSettings.findUnique({
      where: { user_id: userId },
    });

    if (!userSettings) {
      throw new HttpException(
        404,
        `User setting for user with ID ${userId} doesn't exist.`
      );
    }

    return prisma.userSettings.update({
      where: { user_id: userId },
      data: userSettingData,
    });
  }

  public async deleteUserSetting(userId: number): Promise<UserSettings> {
    const userSettings = await prisma.userSettings.findUnique({
      where: { user_id: userId },
    });

    if (!userSettings) {
      throw new HttpException(
        404,
        `User setting for user with ID ${userId} doesn't exist.`
      );
    }

    return prisma.userSettings.delete({
      where: { user_id: userId },
    });
  }
}
