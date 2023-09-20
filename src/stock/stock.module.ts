import { Module } from '@nestjs/common';
import { StockResolver } from './stock.resolver';
import { StockService } from './stock.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from 'src/stock/stock.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StockService, StockResolver],
  exports: [StockService],
})
export class StockModule {}
