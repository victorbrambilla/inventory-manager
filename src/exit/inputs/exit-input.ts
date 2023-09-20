import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateExitInput {
  @Field(() => Number)
  entryId: number;

  @Field(() => Number)
  quantity: number;
}

@InputType()
export class UpdateExitInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  stockId?: number;
}
