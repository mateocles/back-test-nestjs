import {  Length,  IsString,  IsEmail,  IsEnum,  IsNumberString,} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class SignUpDto {
  @ApiProperty()
  @IsString()
  @Length(10, 11)
  document: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumberString()
  @Length(3, 30)
  password: string;
}
