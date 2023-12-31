import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== pass) {
      throw new UnauthorizedException('Failed to authorize');
    }

    const payload = { fullName: user.fullName, id: user.id };

    return {
      _token: await this.jwtService.signAsync(payload),
      // message: 'auth',
    };
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.usersService.findByEmail(dto.email);

      if (userData) {
        throw new HttpException(
          'User with same email is existing already',
          HttpStatus.FORBIDDEN,
        );
      }

      const user = await this.usersService.create(dto);
      return {
        _token: this.jwtService.sign({ id: user.id }),
        user,
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
