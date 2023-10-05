import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryArgs } from 'src/common/dto/query.args';
import { Food } from 'src/food/food.entity';
import { CreateFoodInput, UpdateFoodInput } from 'src/food/inputs/food-input';
import { FoodOutput } from 'src/food/outputs/food-output';
import { UnitService } from 'src/unit/unit.service';
import { Like, Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    private unitService: UnitService,
  ) {}

  async findAll(args?: QueryArgs): Promise<Food[]> {
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
    return this.foodRepository.find({
      where,
      order,
    });
  }

  async findOne(id: number): Promise<FoodOutput> {
    const food = await this.foodRepository.findOne({
      where: { id },
      relations: ['entries'],
      select: ['id', 'name', 'unitId'],
    });

    return {
      ...food,
      quantity: food.entries.reduce((acc, entry) => acc + entry.quantity, 0),
    };
  }

  async findOneByName(name: string): Promise<Food> {
    const food = this.foodRepository.findOne({
      where: { name },
      relations: ['entries'],
    });
    console.log(food);
    return food;
  }

  async create(food: CreateFoodInput): Promise<Food> {
    const foodExists = await this.foodRepository.findOne({
      where: { name: food.name },
    });

    if (foodExists) {
      throw new HttpException('Já existe um alimento com esse nome', 409);
    }

    const unitExists = await this.unitService.findOne(food.unitId);

    if (!unitExists) {
      throw new HttpException('Não existe uma unidade com esse id', 409);
    }

    const foodEntity = new Food();
    foodEntity.name = food.name;
    foodEntity.unitId = food.unitId;
    return await this.foodRepository.save(foodEntity);
  }

  async update(id: number, food: UpdateFoodInput): Promise<Food> {
    const foodExists = await this.foodRepository.findOne({
      where: { name: food.name },
    });

    if (foodExists) {
      throw new HttpException('Já existe um alimento com esse nome', 409);
    }

    const unitExists = await this.unitService.findOne(food.unitId);

    if (!unitExists) {
      throw new HttpException('Não existe uma unidade com esse id', 409);
    }

    const foodEntity = await this.foodRepository.findOne({
      where: { id },
    });

    foodEntity.name = food.name;
    foodEntity.unitId = food.unitId;
    return await this.foodRepository.save(foodEntity);
  }
}
