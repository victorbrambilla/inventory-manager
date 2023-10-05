import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => Number)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;
}
