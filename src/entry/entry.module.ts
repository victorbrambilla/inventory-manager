import { Module, forwardRef } from '@nestjs/common';
import { EntryService } from './entry.service';
import { Entry } from 'src/entry/entry.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodModule } from 'src/food/food.module';
import { EntryResolver } from 'src/entry/entry.resolver';
import { StockModule } from 'src/stock/stock.module';
import { ExitModule } from 'src/exit/exit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry]),
    forwardRef(() => FoodModule),
    forwardRef(() => StockModule),
    forwardRef(() => ExitModule),
  ],
  providers: [EntryService, EntryResolver],
  exports: [EntryService],
})
export class EntryModule {}
