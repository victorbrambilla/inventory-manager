import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateStockInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdateStockInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;
}
