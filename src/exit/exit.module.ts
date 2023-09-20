import { Module, forwardRef } from '@nestjs/common';
import { ExitService } from './exit.service';
import { EntryModule } from 'src/entry/entry.module';
import { Exit } from 'src/exit/exit.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockModule } from 'src/stock/stock.module';
import { ExitResolver } from 'src/exit/exit.resolver';
import { FoodModule } from 'src/food/food.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exit]),
    forwardRef(() => EntryModule),
    forwardRef(() => StockModule),
    forwardRef(() => FoodModule),
  ],
  providers: [ExitService, ExitResolver],
  exports: [ExitService],
})
export class ExitModule {}
