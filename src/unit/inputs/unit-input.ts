import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUnitInput {
  @Field(() => String)
  name: string;
}

@InputType()
export class UpdateUnitInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  name?: string;
}
