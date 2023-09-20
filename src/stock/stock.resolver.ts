import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QueryArgs } from 'src/common/dto/query.args';
import {
  CreateStockInput,
  UpdateStockInput,
} from 'src/stock/inputs/stock-input';

import { Stock } from 'src/stock/stock.entity';
import { StockService } from 'src/stock/stock.service';

@Resolver(() => Stock)
export class StockResolver {
  constructor(private readonly stockService: StockService) {}

  @Query(() => [Stock])
  async stocks(@Args() args?: QueryArgs): Promise<Stock[]> {
    return this.stockService.findAll(args);
  }

  @Query(() => Stock)
  async stock(@Args('id') id: number): Promise<Stock> {
    return this.stockService.findOne(id);
  }

  @Mutation(() => Stock)
  async createStock(@Args('data') data: CreateStockInput): Promise<Stock> {
    return this.stockService.create(data);
  }

  @Mutation(() => Stock)
  async updateStock(
    @Args('id') id: number,
    @Args('data') data: UpdateStockInput,
  ): Promise<Stock> {
    return this.stockService.update(id, data);
  }
}
