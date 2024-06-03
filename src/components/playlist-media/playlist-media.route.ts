import { Router } from "express";
import { Container } from "typedi";
import { PlaylistMediaController } from "./playlist-media.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const playlistMediaController = Container.get(PlaylistMediaController);

router.post("/", authMiddleware, (req, res, next) =>
  playlistMediaController.createPlaylistMedia(req, res, next)
);

router.get("/:playlistMediaId", authMiddleware, (req, res, next) =>
  playlistMediaController.getPlaylistMediaById(req, res, next)
);

router.get("/", authMiddleware, (req, res, next) =>
  playlistMediaController.getAllPlaylistMedias(req, res, next)
);

router.put("/:playlistMediaId", authMiddleware, (req, res, next) =>
  playlistMediaController.updatePlaylistMedia(req, res, next)
);

router.delete("/:playlistMediaId", authMiddleware, (req, res, next) =>
  playlistMediaController.deletePlaylistMedia(req, res, next)
);

export default router;
