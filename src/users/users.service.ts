import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/users/inputs/create-user';
import { UpdateUserInput } from 'src/users/inputs/update-user';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRespository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.usersRespository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const user = this.usersRespository.create(createUserInput);
    return await this.usersRespository.save(user);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRespository.findOne({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.usersRespository.findOne({
      where: { id: +data.id },
    });
    const a = { ...user, ...data, id: +data.id };
    return this.usersRespository.save(a);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(+id);
    const userDeleted = await this.usersRespository.delete(user);
    if (!userDeleted) {
      throw new InternalServerErrorException();
    }
  }
}
