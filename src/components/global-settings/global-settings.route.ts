import { Router } from "express";
import { Container } from "typedi";
import { GlobalSettingController } from "./global-settings.controller";
import { validateDto } from "../../middlewares/validation.middleware";
import { GlobalSettingsDto } from "./global-settings.validation";

const router = Router();

const globalSettingController = Container.get(GlobalSettingController);

router.get("/", (req, res, next) =>
  globalSettingController.getGlobalSettings(req, res, next)
);

router.post("/", validateDto(GlobalSettingsDto), (req, res, next) =>
  globalSettingController.createGlobalSetting(req, res, next)
);

router.get("/:globalSettingId", (req, res, next) =>
  globalSettingController.getGlobalSettingById(req, res, next)
);

router.put("/:globalSettingId", validateDto(GlobalSettingsDto), (req, res, next) =>
  globalSettingController.updateGlobalSetting(req, res, next)
);

router.delete("/:globalSettingId", (req, res, next) =>
  globalSettingController.deleteGlobalSetting(req, res, next)
);

export default router;
