import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ default: 'User' })
  @IsString()
  fullName: string;

  @ApiProperty({ default: 'test@bk.ru' })
  @IsEmail()
  email: string;

  @ApiProperty({ default: '1234' })
  @IsString()
  password: string;
}
