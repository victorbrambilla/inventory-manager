import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FoodOutput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  unitId: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  id: number;
}
