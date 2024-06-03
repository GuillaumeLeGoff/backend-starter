import { IsBoolean, IsInt, IsNotEmpty } from "class-validator";

export class GlobalSettingsDto {
  @IsBoolean()
  @IsNotEmpty()
  standby: boolean;

  @IsInt()
  @IsNotEmpty()
  standby_start_time: number;

  @IsInt()
  @IsNotEmpty()
  standby_end_time: number;

  @IsInt()
  @IsNotEmpty()
  restart_at: number;
}
