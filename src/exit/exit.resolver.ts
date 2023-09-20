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
import { Exit } from 'src/exit/exit.entity';
import { ExitService } from 'src/exit/exit.service';
import { CreateExitInput, UpdateExitInput } from 'src/exit/inputs/exit-input';
import { Stock } from 'src/stock/stock.entity';
import { StockService } from 'src/stock/stock.service';

@Resolver(() => Exit)
export class ExitResolver {
  constructor(
    private readonly exitService: ExitService,
    private readonly entryService: EntryService,
    private readonly stockervice: StockService,
  ) {}

  @Query(() => [Exit])
  async exits(
    @Args() args?: QueryArgs,
    @Args('filterByFoodName', {
      nullable: true,
    })
    filterByFoodName?: string | null,
  ): Promise<Exit[]> {
    return this.exitService.findAll(args, filterByFoodName);
  }

  @Query(() => Exit)
  async exit(@Args('id') id: number): Promise<Exit> {
    return this.exitService.findOne(id);
  }

  @Mutation(() => Exit)
  async createExit(@Args('data') data: CreateExitInput): Promise<Exit> {
    return this.exitService.create(data);
  }

  @Mutation(() => Exit)
  async updateExit(
    @Args('id') id: number,
    @Args('data') data: UpdateExitInput,
  ): Promise<Exit> {
    return this.exitService.update(id, data);
  }

  @ResolveField(() => Entry)
  async entry(@Parent() exit: Exit) {
    const { entryId } = exit;
    return this.entryService.findOne(entryId);
  }

  @ResolveField(() => Stock)
  async stock(@Parent() exit: Exit) {
    const { stockId } = exit;
    return this.stockervice.findOne(stockId);
  }
}
