import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from 'src/auth/inputs/auth-input';
import { User } from 'src/users/user.entity';
import { compareSync } from 'bcrypt';
import { AuthOutput } from 'src/auth/outputs/auth-output';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthOutput> {
    const user = await this.userService.getUserByEmail(data.email);

    const validPasssword = compareSync(data.password, user.password);

    if (!validPasssword) {
      throw new UnauthorizedException('Incorrect password');
    }

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }
}
