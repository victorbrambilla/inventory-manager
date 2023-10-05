import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { QueryArgs } from 'src/common/dto/query.args';
import { Entry } from 'src/entry/entry.entity';
import { EntryService } from 'src/entry/entry.service';

import { Food } from 'src/food/food.entity';
import { FoodService } from 'src/food/food.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateFoodInput, UpdateFoodInput } from 'src/food/inputs/food-input';
import { FoodOutput } from 'src/food/outputs/food-output';
import { Unit } from 'src/unit/unit.entity';
import { UnitService } from 'src/unit/unit.service';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { User } from 'src/users/user.entity';

@Resolver(() => Food)
export class FoodResolver {
  constructor(
    private readonly unitService: UnitService,
    private readonly foodService: FoodService,
    private readonly entryService: EntryService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [Food])
  async foods(
    @CurrentUser() user: User,
    @Args() args?: QueryArgs,
  ): Promise<Food[]> {
    return this.foodService.findAll(args);
  }

  @Query(() => FoodOutput)
  async food(@Args('id') id: number): Promise<FoodOutput> {
    return this.foodService.findOne(id);
  }

  @Mutation(() => Food)
  async createFood(@Args('data') data: CreateFoodInput): Promise<Food> {
    return this.foodService.create(data);
  }

  @Mutation(() => Food)
  async updateFood(
    @Args('id') id: number,
    @Args('data') data: UpdateFoodInput,
  ): Promise<Food> {
    return this.foodService.update(id, data);
  }

  @ResolveField(() => Unit)
  async unit(@Parent() food: Food) {
    const { unitId } = food;
    return this.unitService.findOne(unitId);
  }

  @ResolveField(() => [Entry])
  async entries(@Parent() food: Food) {
    const { id } = food;
    return this.entryService.findAllByFoodId(id);
  }
}
