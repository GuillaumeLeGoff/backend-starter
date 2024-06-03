import { GlobalSettings } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { GlobalSettingService } from "./global-settings.service";

@Service()
export class GlobalSettingController {
  constructor(
    @Inject(() => GlobalSettingService)
    private globalSettingService: GlobalSettingService
  ) {}

  initializeGlobalSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSetting: GlobalSettings | null =
        await this.globalSettingService.initializeGlobalSettings();
      res.status(200).json({ data: globalSetting, message: "initialized" });
    } catch (error) {
      next(error);
    }
  };

  getGlobalSettings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSettings: GlobalSettings[] =
        await this.globalSettingService.getGlobalSettings();
      res.status(200).json({ data: globalSettings, message: "found" });
    } catch (error) {
      next(error);
    }
  };

  createGlobalSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSettingData = req.body;
      const newGlobalSetting: GlobalSettings =
        await this.globalSettingService.createGlobalSetting(globalSettingData);
      res.status(201).json({ data: newGlobalSetting, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  getGlobalSettingById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSettingId: number = parseInt(req.params.globalSettingId);
      const globalSetting: GlobalSettings | null =
        await this.globalSettingService.getGlobalSettingById(globalSettingId);
      if (!globalSetting) {
        res.status(404).json({ message: "Global setting not found" });
      } else {
        res.status(200).json({ data: globalSetting, message: "found" });
      }
    } catch (error) {
      next(error);
    }
  };

  updateGlobalSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSettingId: number = parseInt(req.params.globalSettingId);
      const globalSettingData = req.body;
      const updatedGlobalSetting: GlobalSettings | null =
        await this.globalSettingService.updateGlobalSetting(
          globalSettingId,
          globalSettingData
        );
      if (!updatedGlobalSetting) {
        res.status(404).json({ message: "Global setting not found" });
      } else {
        res
          .status(200)
          .json({ data: updatedGlobalSetting, message: "updated" });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteGlobalSetting = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const globalSettingId: number = parseInt(req.params.globalSettingId);
      const deletedGlobalSetting: GlobalSettings | null =
        await this.globalSettingService.deleteGlobalSetting(globalSettingId);
      if (!deletedGlobalSetting) {
        res.status(404).json({ message: "Global setting not found" });
      } else {
        res.status(200).json({ message: "deleted" });
      }
    } catch (error) {
      next(error);
    }
  };
}
