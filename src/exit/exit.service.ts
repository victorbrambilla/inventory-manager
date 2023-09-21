import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryArgs } from 'src/common/dto/query.args';
import { EntryService } from 'src/entry/entry.service';
import { Exit } from 'src/exit/exit.entity';
import { CreateExitInput, UpdateExitInput } from 'src/exit/inputs/exit-input';
import { FoodService } from 'src/food/food.service';
import { StockService } from 'src/stock/stock.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ExitService {
  constructor(
    @InjectRepository(Exit)
    private exitRepository: Repository<Exit>,
    private stockService: StockService,
    private entryService: EntryService,
    private foodService: FoodService,
  ) {}

  async findAll(
    args?: QueryArgs,
    filterByFoodName?: string | null,
  ): Promise<Exit[]> {
    const order: any = {};
    if (args.sort) {
      order[args.sort.by] = args.sort.order;
    }
    const where: any = {};
    if (args.filter) {
      args.filter.forEach((filter) => {
        if (!filter.value) return;
        where[filter.by] = {};
        where[filter.by] = Like(`%${filter.value}%`);
      });
    }

    if (filterByFoodName) {
      const food = await this.foodService.findOneByName(filterByFoodName);
      where.foodId = food?.id;
      order.foodId = 'DESC';
    }

    const exits = await this.exitRepository.find({
      where,
      order,
    });
    return exits;
  }
  async findAllByEntryId(entryId: number): Promise<Exit[]> {
    return this.exitRepository.find({
      where: { entryId },
    });
  }

  async findOne(id: number): Promise<Exit> {
    return this.exitRepository.findOne({
      where: { entryId: id },
    });
  }

  async create(exit: CreateExitInput): Promise<Exit> {
    if (exit.quantity < 0) {
      throw new HttpException('A quantidade deve ser maior que zero', 400);
    }

    const existEntry = await this.entryService.findOne(exit.entryId);
    if (!existEntry) {
      throw new HttpException('Não existe uma entrada com esse id', 404);
    }

    if (existEntry.quantity < exit.quantity) {
      throw new HttpException(
        `A quantidade de saída não pode ser maior que a quantidade de entrada. Estoque restante: ${existEntry.quantity}`,
        400,
      );
    }
    if (existEntry.quantity >= exit.quantity) {
      await this.entryService.update(exit.entryId, {
        quantity: existEntry.quantity - exit.quantity,
      });
    }

    const exitEntity = new Exit();
    exitEntity.stockId = existEntry.stockId;
    exitEntity.entryId = exit.entryId;
    exitEntity.quantity = exit.quantity;
    exitEntity.foodId = existEntry.foodId;
    return await this.exitRepository.save(exitEntity);
  }

  async update(id: number, exit: UpdateExitInput): Promise<Exit> {
    const exitEntity = await this.exitRepository.findOne({
      where: { id },
    });
    if (!exitEntity) {
      throw new HttpException('Não existe uma saída com esse id', 404);
    }
    const existStock = await this.stockService.findOne(exit.stockId);
    if (!existStock) {
      throw new HttpException('Não existe um estoque com esse id', 404);
    }

    return await this.exitRepository.save({
      ...exitEntity,
      ...exit,
    });
  }

  async remove(id: number): Promise<Exit> {
    const exitEntity = await this.exitRepository.findOne({
      where: { id },
    });
    return await this.exitRepository.remove(exitEntity);
  }
}
