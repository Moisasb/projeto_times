import { IsString, IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

export class CreateTimesDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsString()
  @IsNotEmpty()
  origem!: string;

  @IsInt()
  ano!: number;

  @IsBoolean()
  registrado!: boolean;
}