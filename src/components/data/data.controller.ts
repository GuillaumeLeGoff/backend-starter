import { Data } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import { DataService } from "./data.service";
import { CreateDataDto } from "./data.validation";

@Service()
export class DataController {
  constructor(@Inject(() => DataService) private dataService: DataService) {}

  createData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataDto = req.body as CreateDataDto;
      const newData: Data = await this.dataService.createData(dataDto);
      res.status(201).json({ data: newData, message: "Data created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  getDataById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataId: number = parseInt(req.params.dataId);
      const data: Data | null = await this.dataService.getDataById(dataId);
      if (!data) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json({ data: data, message: "Data found" });
      }
    } catch (error) {
      next(error);
    }
  };

  updateData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataId: number = parseInt(req.params.dataId);
      const dataDto = req.body as CreateDataDto;
      const updatedData: Data | null = await this.dataService.updateData(
        dataId,
        dataDto
      );
      if (!updatedData) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json({ data: updatedData, message: "Data updated" });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataId: number = parseInt(req.params.dataId);
      const deletedData: Data | null = await this.dataService.deleteData(
        dataId
      );
      if (!deletedData) {
        res.status(404).json({ message: "Data not found" });
      } else {
        res.status(200).json({ message: "Data deleted" });
      }
    } catch (error) {
      next(error);
    }
  };
}
