import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsNumber()
  id: string;

  @Field()
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Invalid characters' })
  name?: string;

  @Field()
  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  email?: string;
}
