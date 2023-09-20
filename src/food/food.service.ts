import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/food/food.entity';
import { CreateFoodInput, UpdateFoodInput } from 'src/food/inputs/food-input';
import { UnitService } from 'src/unit/unit.service';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    private unitService: UnitService,
  ) {}

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find();
  }

  async findOne(id: number): Promise<Food> {
    return this.foodRepository.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<Food> {
    return this.foodRepository.findOne({
      where: { name },
    });
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
