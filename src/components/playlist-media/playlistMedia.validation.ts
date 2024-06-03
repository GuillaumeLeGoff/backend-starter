import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePlaylistMediaDto {
  @IsNotEmpty()
  @IsNumber()
  public media_id: number;

  @IsNotEmpty()
  @IsNumber()
  public playlist_id: number;

  @IsNotEmpty()
  @IsNumber()
  public media_dur_in_playlist: number;

  @IsNotEmpty()
  @IsNumber()
  public media_pos_in_playlist: number;
}
