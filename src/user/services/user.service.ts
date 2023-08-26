import { UserEntity } from '@/entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find({ select: ['id', 'username'] });
  }

  async getUserById(id: number): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'username'],
    });

    if (!user) throw new NotFoundException('User is not found');

    return user;
  }

  // For Auth
  async getUserByUsername(username: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findOne({
      where: { username },
    });
    if (!user) return null;
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = new UserEntity();
    const saltOrRounds = 10;
    newUser.username = createUserDto.username;
    newUser.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    return await this.userRepository.save(newUser);
  }

  async removeUser(id: number) {
    const user: UserEntity = await this.getUserById(id);

    return await this.userRepository.remove(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user: UserEntity = await this.getUserById(id);

    user.password = updateUserDto.password;

    return await this.userRepository.save(user);
  }
}
