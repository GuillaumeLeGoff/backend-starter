import { Router } from "express";
import { Container } from "typedi";
import { PlaylistController } from "./playlist.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

const playlistController = Container.get(PlaylistController);

router.post("/", authMiddleware, (req, res, next) =>
  playlistController.createPlaylist(req, res, next)
);

router.get("/:playlistId", authMiddleware, (req, res, next) =>
  playlistController.getPlaylistById(req, res, next)
);

router.get("/", authMiddleware, (req, res, next) =>
  playlistController.getAllPlaylists(req, res, next)
);

router.put("/:playlistId", authMiddleware, (req, res, next) =>
  playlistController.updatePlaylist(req, res, next)
);

router.delete("/:playlistId", authMiddleware, (req, res, next) =>
  playlistController.deletePlaylist(req, res, next)
);

export default router;
