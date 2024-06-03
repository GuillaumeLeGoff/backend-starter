import { GlobalSettings, PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class GlobalSettingService {
  private prisma = new PrismaClient();

  async initializeGlobalSettings(): Promise<GlobalSettings | null> {
    const globalSetting = await this.prisma.globalSettings.findUnique({
      where: { id: 1 },
    });

    if (!globalSetting) {
      const newGlobalSetting = await this.prisma.globalSettings.create({
        data: {
          id: 1,
          standby: true,
          standby_start_time: 8,
          standby_end_time: 20,
          restart_at: 2
        },
      });

      return newGlobalSetting;
    }

    return globalSetting;
  }

  async getGlobalSettings(): Promise<GlobalSettings[]> {
    const globalSettings = await this.prisma.globalSettings.findMany();
    return globalSettings;
  }

  async createGlobalSetting(
    globalSettingData: GlobalSettings
  ): Promise<GlobalSettings> {
    const newGlobalSetting = await this.prisma.globalSettings.create({
      data: globalSettingData,
    });
    return newGlobalSetting;
  }

  async getGlobalSettingById(
    globalSettingId: number
  ): Promise<GlobalSettings | null> {
    const globalSetting = await this.prisma.globalSettings.findUnique({
      where: { id: globalSettingId },
    });
    return globalSetting;
  }

  async updateGlobalSetting(
    globalSettingId: number,
    globalSettingData: GlobalSettings
  ): Promise<GlobalSettings | null> {
    const updatedGlobalSetting = await this.prisma.globalSettings.update({
      where: { id: globalSettingId },
      data: globalSettingData,
    });
    return updatedGlobalSetting;
  }

  async deleteGlobalSetting(
    globalSettingId: number
  ): Promise<GlobalSettings | null> {
    const deletedGlobalSetting = await this.prisma.globalSettings.delete({
      where: { id: globalSettingId },
    });
    return deletedGlobalSetting;
  }
}
