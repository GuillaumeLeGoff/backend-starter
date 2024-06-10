import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class CreateDataDto {
  @IsString()
  @MaxLength(32)
  public data_string_1?: string;

  @IsNumber()
  public data_int_1?: number;

  public data_boolean_1: boolean;

  @IsString()
  @MaxLength(32)
  public data_string_2?: string;

  @IsNumber()
  public data_int_2?: number;

  public data_boolean_2?: boolean;

  @IsString()
  @MaxLength(32)
  public data_string_3?: string;

  @IsNumber()
  public data_int_3?: number;

  public data_boolean_3?: boolean;
}
