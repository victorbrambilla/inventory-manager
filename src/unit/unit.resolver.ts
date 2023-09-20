import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUnitInput, UpdateUnitInput } from 'src/unit/inputs/unit-input';
import { Unit } from 'src/unit/unit.entity';
import { UnitService } from 'src/unit/unit.service';

@Resolver(() => Unit)
export class UnitResolver {
  constructor(private readonly unitService: UnitService) {}

  @Query(() => [Unit])
  async units(): Promise<Unit[]> {
    return this.unitService.findAll();
  }

  @Query(() => Unit)
  async unit(@Args('id') id: number): Promise<Unit> {
    return this.unitService.findOne(id);
  }

  @Mutation(() => Unit)
  async createUnit(@Args('data') data: CreateUnitInput): Promise<Unit> {
    return this.unitService.create(data);
  }

  @Mutation(() => Unit)
  async updateUnit(
    @Args('id') id: number,
    @Args('data') data: UpdateUnitInput,
  ): Promise<Unit> {
    return this.unitService.update(id, data);
  }
}
