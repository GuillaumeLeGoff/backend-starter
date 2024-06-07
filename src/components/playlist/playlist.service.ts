import { PrismaClient, Playlist, Media } from "@prisma/client";
import { Service } from "typedi";
import { CreatePlaylistDto } from "./playlist.validation";

const prisma = new PrismaClient();
interface PlaylistWithMedia extends Playlist {
  medias: Media[];
}
@Service()
export class PlaylistService {
  async getAllPlaylists(): Promise<Playlist[]> {
    console.log("getAllPlaylists");

    const playlists = await prisma.playlist.findMany({
      include: {
        medias: true,
      },
    });
    return playlists;
  }

  async getPlaylistById(id: number): Promise<PlaylistWithMedia | null> {
    const playlist = await prisma.playlist.findUnique({
      where: { id },
      include: {
        medias: true,
      },
    });
    return playlist;
  }

  async createPlaylist(playlistData: CreatePlaylistDto): Promise<Playlist> {
    const playlist = await prisma.playlist.create({
      data: {
        name: playlistData.name,
        user_id: playlistData.user_id,
      },
    });
    console.log(playlist);

    return playlist;
  }

  async updatePlaylist(
    id: number,
    playlistData: CreatePlaylistDto
  ): Promise<Playlist | null> {
    const playlist = await prisma.playlist.update({
      where: { id },
      data: {
        name: playlistData.name,
      },
    });
    return playlist;
  }

  async deletePlaylist(id: number): Promise<Playlist | null> {
    const playlist = await prisma.playlist.delete({
      where: { id },
    });
    return playlist;
  }

  async getUserPlaylists(userId: number): Promise<Playlist[]> {
    return prisma.playlist.findMany({
      where: { user_id: userId },
    });
  }

  async addMediaToPlaylist(id: number, mediaId: number): Promise<Playlist> {
    const playlist = await prisma.playlist.update({
      where: { id },
      data: {
        medias: {
          connect: { id: mediaId },
        },
      },
    });
    return playlist;
  }

  async updateMediasInPlaylist(id: number, medias: Media[]): Promise<Playlist> {
    // D'abord, dissocier tous les médias actuellement liés
    console.log("updateMediasInPlaylist", medias);

    await prisma.playlist.update({
      where: { id },
      data: {
        medias: {
          set: [],
        },
      },
    });

    // Ensuite, associer les nouveaux médias
    const updatedPlaylist = await prisma.playlist.update({
      where: { id },
      data: {
        medias: {
          connect: medias.map((media) => ({ id: media.id })),
        },
      },
    });

    return updatedPlaylist;
  }
}
