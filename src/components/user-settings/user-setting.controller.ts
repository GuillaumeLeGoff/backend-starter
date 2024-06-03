import { log } from "console";
import { UserSettings } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { UserSettingService } from "./user-setting.service";
import { CreateUserSettingDto } from "./user-setting.validation";

@Service()
export class UserSettingController {
  constructor(
    @Inject(() => UserSettingService)
    private userSettingService: UserSettingService
  ) {}

  createUserSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userSettingData = req.body as CreateUserSettingDto;
      const newUserSetting = await this.userSettingService.createUserSetting(
        userSettingData
      );
      res.status(201).json({ data: newUserSetting, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  getUserSetting = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params.userId);

    try {
      const userSetting: UserSettings[] | null =
        await this.userSettingService.findAllUserSetting();
      if (userSetting) {
        res.status(200).json({ data: userSetting, message: "found" });
      } else {
        res.status(404).json({ message: "user setting not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  getUserSettingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.params.userId);

    try {
      const userId = Number(req.params.userId);

      const userSetting: UserSettings | null =
        await this.userSettingService.findUserSetting(userId);
      if (userSetting) {
        res.status(200).json({
          data: userSetting,
          message: "all user setting found",
        });
      } else {
        res.status(404).json({ message: "user setting not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  updateUserSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.userId);
      const userSettingData = req.body;
      const updatedUserSetting: UserSettings =
        await this.userSettingService.updateUserSetting(
          userId,
          userSettingData
        );
      res.status(200).json({ data: updatedUserSetting, message: "updated" });
    } catch (error) {
      next(error);
    }
  };

  deleteUserSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = Number(req.params.userId);
      await this.userSettingService.deleteUserSetting(userId);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}
