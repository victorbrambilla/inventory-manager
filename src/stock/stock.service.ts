import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/Stock/Stock.entity';
import { QueryArgs } from 'src/common/dto/query.args';
import {
  CreateStockInput,
  UpdateStockInput,
} from 'src/stock/inputs/stock-input';
import { Repository } from 'typeorm';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async findAll(args?: QueryArgs): Promise<Stock[]> {
    const order: any = {};
    if (args.sort) {
      order[args.sort.by] = args.sort.order;
    }
    const where: any = {};
    if (args.filter) {
      args.filter.forEach((filter) => {
        where[filter.by] = {};
        where[filter.by][`$${filter.operator}`] = filter.value;
      });
    }

    return this.stockRepository.find({
      where,
      order,
    });
  }

  async findOne(id: number): Promise<Stock> {
    return this.stockRepository.findOne({
      where: { id },
    });
  }

  async create(stock: CreateStockInput): Promise<Stock> {
    const stockExists = await this.getByStockName(stock.name);

    if (stockExists) {
      throw new HttpException('Já existe um estoque com esse nome', 409);
    }

    const stockEntity = new Stock();
    stockEntity.name = stock.name;

    return await this.stockRepository.save(stockEntity);
  }

  async update(id: number, stock: UpdateStockInput): Promise<Stock> {
    const stockExists = await this.getByStockName(stock.name);
    if (stockExists) {
      throw new HttpException('Já existe uma unidade com esse nome', 409);
    }

    await this.stockRepository.update(id, stock);
    return this.stockRepository.findOne({
      where: { id },
    });
  }

  async getByStockName(name: string): Promise<Stock> {
    return this.stockRepository.findOne({
      where: { name },
    });
  }
}
