import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateFoodInput {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  unitId: number;
}

@InputType()
export class UpdateFoodInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  unitId?: number;
}
