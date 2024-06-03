import { Router } from "express";
import { Container } from "typedi";
import { UserSettingController } from "./user-setting.controller";
import { validateDto } from "../../middlewares/validation.middleware";
import {
  CreateUserSettingDto,
  UpdateUserSettingDto,
} from "./user-setting.validation";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const userSettingController = Container.get(UserSettingController);

router.post(
  "/",
  authMiddleware,
  validateDto(CreateUserSettingDto),
  (req, res, next) => userSettingController.createUserSetting(req, res, next)
);

router.get("/", authMiddleware, (req, res, next) =>
  userSettingController.getUserSetting(req, res, next)
);

router.get("/:userId", authMiddleware, (req, res, next) =>
  userSettingController.getUserSettingById(req, res, next)
);

router.put(
  "/:userId",
  authMiddleware,
  validateDto(UpdateUserSettingDto),
  (req, res, next) => userSettingController.updateUserSetting(req, res, next)
);

router.delete("/:userId", authMiddleware, (req, res, next) =>
  userSettingController.deleteUserSetting(req, res, next)
);

export default router;
