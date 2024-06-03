import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export enum Language {
  EN = "EN",
  FR = "FR",
  DE = "DE",
  ES = "ES",
  IT = "IT",
  PT = "PT",
  RU = "RU",
  ZH = "ZH",
  JA = "JA",
  KO = "KO",
  AR = "AR",
}

export class CreateUserSettingDto {
  @IsNotEmpty()
  @IsString()
  public language: Language;

  @IsNotEmpty()
  @IsBoolean()
  public event_auto: boolean;

  @IsNotEmpty()
  @IsNumber()
  public user_id: number;
}

export class UpdateUserSettingDto {
  @IsString()
  public language?: Language;

  @IsBoolean()
  public event_auto?: boolean;
}
