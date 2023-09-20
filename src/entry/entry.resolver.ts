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
import {
  CreateEntryInput,
  UpdateEntryInput,
} from 'src/entry/inputs/entry-input';
import { Exit } from 'src/exit/exit.entity';
import { ExitService } from 'src/exit/exit.service';
import { Food } from 'src/food/food.entity';
import { FoodService } from 'src/food/food.service';
import { Stock } from 'src/stock/stock.entity';
import { StockService } from 'src/stock/stock.service';

@Resolver(() => Entry)
export class EntryResolver {
  constructor(
    private readonly entryService: EntryService,
    private readonly foodService: FoodService,
    private readonly stockService: StockService,
    private readonly exitService: ExitService,
  ) {}

  @Query(() => [Entry])
  async entries(
    @Args() args?: QueryArgs,
    @Args('filterByFoodName', {
      nullable: true,
    })
    filterByFoodName?: string | null,
  ): Promise<Entry[]> {
    return this.entryService.findAll(args, filterByFoodName);
  }

  @Query(() => Entry)
  async entry(@Args('id') id: number): Promise<Entry> {
    return this.entryService.findOne(id);
  }

  @Mutation(() => Entry)
  async createEntry(@Args('data') data: CreateEntryInput): Promise<Entry> {
    return this.entryService.create(data);
  }

  @Mutation(() => Entry)
  async updateEntry(
    @Args('id') id: number,
    @Args('data') data: UpdateEntryInput,
  ): Promise<Entry> {
    return this.entryService.update(id, data);
  }

  @ResolveField(() => Food)
  async food(@Parent() entry: Entry) {
    const { foodId } = entry;
    return this.foodService.findOne(foodId);
  }

  @ResolveField(() => Stock)
  async stock(@Parent() entry: Entry) {
    const { stockId } = entry;
    return this.stockService.findOne(stockId);
  }

  @ResolveField(() => [Exit])
  async exits(@Parent() entry: Entry) {
    const { id } = entry;
    return this.exitService.findAllByEntryId(id);
  }
}
