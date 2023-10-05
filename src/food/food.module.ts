import { Module, forwardRef } from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from 'src/food/food.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitModule } from 'src/unit/unit.module';
import { FoodResolver } from 'src/food/food.resolver';
import { EntryModule } from 'src/entry/entry.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Food]),
    forwardRef(() => UnitModule),
    forwardRef(() => EntryModule),
  ],

  providers: [FoodService, FoodResolver],
  exports: [FoodService],
})
export class FoodModule {}
