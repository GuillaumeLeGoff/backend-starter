import { Media, PrismaClient } from "@prisma/client";
import { Service } from "typedi";
import { HttpException } from "../../exceptions/HttpException";

const prisma = new PrismaClient();

@Service()
export class MediaService {
  async createMedia(req: any, res: any, next: any) {
    const file = req.file;
    const media = {
      original_file_name: file.originalname,
      file_name: file.filename,
      path: file.path,
      format: file.mimetype.split("/")[1],
      type: file.mimetype.split("/")[0],
      size: file.size,
      uploaded_at: new Date(),
      user_id: parseInt(req.params.user_id, 10),
    };
    try {
      const newMedia = await prisma.media.create({
        data: media,
      });
      next();
    } catch (error) {
      console.log(error);
      throw new HttpException(500, "Cannot create media");
    }
  }

  async findAllMedias(): Promise<Media[]> {
    return prisma.media.findMany();
  }

  async findMedia(mediaId: number): Promise<Media> {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });
    if (!media) {
      throw new HttpException(404, `Media with ID ${mediaId} doesn't exist.`);
    }
    return media;
  }

  async updateMedia(mediaId: number, data: Partial<Media>): Promise<Media> {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });
    if (!media) {
      throw new HttpException(404, `Media with ID ${mediaId} doesn't exist.`);
    }
    return prisma.media.update({
      where: { id: mediaId },
      data,
    });
  }

  async deleteMedia(mediaId: number): Promise<Media> {
    const media = await prisma.media.findUnique({
      where: { id: mediaId },
    });
    if (!media) {
      throw new HttpException(404, `Media with ID ${mediaId} doesn't exist.`);
    }
    return prisma.media.delete({
      where: { id: mediaId },
    });
  }
}
