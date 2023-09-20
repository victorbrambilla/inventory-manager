import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateEntryInput {
  @Field(() => Number)
  foodId: number;

  @Field(() => Number)
  stockId: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Date)
  expirationDate: Date;
}

@InputType()
export class UpdateEntryInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  foodId?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  stockId?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  quantity?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  expirationDate?: Date;
}
