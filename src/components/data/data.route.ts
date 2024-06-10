import { Router } from "express";
import { Container } from "typedi";
import { DataController } from "./data.controller";

const router = Router();
const dataController = Container.get(DataController);

router.post("/", (req, res, next) => dataController.createData(req, res, next));
router.get("/:dataId", (req, res, next) =>
  dataController.getDataById(req, res, next)
);
router.put("/:dataId", (req, res, next) =>
  dataController.updateData(req, res, next)
);
router.delete("/:dataId", (req, res, next) =>
  dataController.deleteData(req, res, next)
);

export default router;
