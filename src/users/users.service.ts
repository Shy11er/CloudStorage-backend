import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto);
  }

  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User is undefined', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
