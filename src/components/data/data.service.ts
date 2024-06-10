import { PrismaClient, Data } from "@prisma/client";
import { Service } from "typedi";
import { CreateDataDto } from "./data.validation";

const prisma = new PrismaClient();

@Service()
export class DataService {
  async createData(dataDto: CreateDataDto): Promise<Data> {
    const data = await prisma.data.create({
      data: dataDto,
    });
    return data;
  }

  async getDataById(id: number): Promise<Data | null> {
    return prisma.data.findUnique({
      where: { id },
    });
  }

  async updateData(id: number, dataDto: CreateDataDto): Promise<Data | null> {
    return prisma.data.update({
      where: { id },
      data: dataDto,
    });
  }

  async deleteData(id: number): Promise<Data | null> {
    return prisma.data.delete({
      where: { id },
    });
  }
}
