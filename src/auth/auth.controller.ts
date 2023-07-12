import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  login(@Request() req) {
    return this.authService.login(req.user as UserEntity);
  }

  @Post('/register')
  @ApiBody({ type: CreateUserDto })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
