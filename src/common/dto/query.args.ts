import { ArgsType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class SortArgs {
  @Field(() => String)
  by: string;

  @Field(() => String, { defaultValue: 'ASC' })
  order: 'ASC' | 'DESC';
}

@InputType()
export class FilterArgs {
  @Field(() => String)
  by: string;

  @Field(() => String)
  operator: string;

  @Field(() => String || Number)
  value: string | number;
}

@ArgsType()
export class QueryArgs {
  @Field(() => SortArgs, { nullable: true })
  sort?: SortArgs;

  @Field(() => [FilterArgs], { nullable: true })
  filter?: FilterArgs[];
}
