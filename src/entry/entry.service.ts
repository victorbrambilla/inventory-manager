import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { HttpException, Injectable } from '@nestjs/common';
import { FoodService } from 'src/food/food.service';
import { Entry } from 'src/entry/entry.entity';
import {
  CreateEntryInput,
  UpdateEntryInput,
} from 'src/entry/inputs/entry-input';
import { QueryArgs } from 'src/common/dto/query.args';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    private foodService: FoodService,
  ) {}

  async findAll(
    args?: QueryArgs,
    filterByFoodName?: string | null,
  ): Promise<Entry[]> {
    const order: any = {};
    if (args?.sort) {
      order[args.sort.by] = args.sort.order;
    }

    const where: any = {};
    if (args?.filter) {
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

    const entries = await this.entryRepository.find({
      where,
      order,
    });

    return entries;
  }
  async findAllByFoodId(foodId: number): Promise<Entry[]> {
    return this.entryRepository.find({
      where: { foodId },
    });
  }
  async findOne(id: number): Promise<Entry> {
    return this.entryRepository.findOne({
      where: { id },
    });
  }

  async create(entry: CreateEntryInput): Promise<Entry> {
    if (entry.quantity <= 0) {
      throw new HttpException('A quantidade deve ser maior que zero', 400);
    }
    const foodExists = await this.foodService.findOne(entry.foodId);
    // const stockExists = await this.foodService.findOne(entry.stockId);
    if (!foodExists) {
      throw new HttpException('Não existe um alimento com esse id', 409);
    }

    const entryEntity = new Entry();
    entryEntity.foodId = entry.foodId;
    entryEntity.quantity = entry.quantity;
    entryEntity.stockId = entry.stockId;
    entryEntity.expirationDate = entry.expirationDate;
    return await this.entryRepository.save(entryEntity);
  }

  async update(id: number, entry: UpdateEntryInput): Promise<Entry> {
    if (entry.quantity < 0) {
      throw new HttpException('A quantidade deve ser maior que zero', 400);
    }

    const foodExists = await this.foodService.findOne(entry.foodId);
    // const stockExists = await this.foodService.findOne(entry.stockId);
    if (!foodExists) {
      throw new HttpException('Não existe um alimento com esse id', 404);
    }

    const entryEntity = await this.entryRepository.findOne({
      where: { id },
    });

    if (!entryEntity) {
      throw new HttpException('Não existe uma entrada com esse id', 404);
    }
    return await this.entryRepository.save({
      ...entryEntity,
      ...entry,
    });
  }

  async remove(id: number): Promise<void> {
    const entryEntity = await this.entryRepository.findOne({
      where: { id },
    });
    if (!entryEntity) {
      throw new HttpException('Não existe uma entrada com esse id', 404);
    }
    await this.entryRepository.remove(entryEntity);
  }
}
