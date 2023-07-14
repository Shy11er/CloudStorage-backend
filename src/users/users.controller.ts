import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  async getMe(@UserId() userId: number) {
    try {
      return this.usersService.findById(userId);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  // @Delete('delete')
  // async removeAll(id: number) {
  //   return this.usersService.removeAll(id);
  // }
}
