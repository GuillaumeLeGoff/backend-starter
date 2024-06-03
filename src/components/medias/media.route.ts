import { Router } from "express";
import { Container } from "typedi";
import { MediaController } from "./media.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();
const mediaController = Container.get(MediaController);

router.post("/:user_id", authMiddleware, mediaController.uploadFile);

router.get("/", authMiddleware, mediaController.getAllMedia);

router.get("/:media_id", authMiddleware, mediaController.getMediaById);

router.put("/:media_id", authMiddleware, mediaController.updateMedia);

router.delete(
  "/:user_id/:media_id",
  authMiddleware,
  mediaController.deleteMedia
);

export default router;
