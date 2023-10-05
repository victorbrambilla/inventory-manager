import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthOutput } from 'src/auth/outputs/auth-output';
import { AuthInput } from 'src/auth/inputs/auth-input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthOutput)
  public async login(@Args('data') data: AuthInput): Promise<AuthOutput> {
    const response = await this.authService.validateUser(data);

    return {
      user: response.user,
      token: response.token,
    };
  }
}
