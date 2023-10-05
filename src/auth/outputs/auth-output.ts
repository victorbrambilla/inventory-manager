import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/user.entity';

@ObjectType()
export class AuthOutput {
  @Field(() => User)
  user: User;

  @Field(() => String)
  token: string;
}
