import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserInput } from 'src/users/inputs/create-user';
import { UpdateUserInput } from 'src/users/inputs/update-user';
import { UsersService } from 'src/users/users.service';
import { UserOutput } from 'src/users/outputs/user-output';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import Role from 'src/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserOutput)
  async createUser(@Args('data') data: CreateUserInput): Promise<UserOutput> {
    return this.usersService.create(data);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.usersService.getUserById(+id);
  }

  @Query(() => UserOutput)
  async userByEmail(@Args('email') email: string): Promise<UserOutput> {
    return this.usersService.getUserByEmail(email);
  }

  @Query(() => [UserOutput])
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async users(): Promise<UserOutput[]> {
    return await this.usersService.findAll();
  }

  @Mutation(() => UserOutput)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<UserOutput> {
    return this.usersService.updateUser({ id, ...data });
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('id') id: number): Promise<true> {
    await this.usersService.deleteUser(id);
    return true;
  }
}
