import {
  Controller,
  Get,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/decorators/user-id.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @UseGuards(AuthGuard)
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
