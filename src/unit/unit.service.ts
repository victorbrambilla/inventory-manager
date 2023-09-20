import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUnitInput, UpdateUnitInput } from 'src/unit/inputs/unit-input';
import { Unit } from 'src/unit/unit.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(Unit)
    private unitRepository: Repository<Unit>,
  ) {}

  async findAll(): Promise<Unit[]> {
    return this.unitRepository.find();
  }

  async findOne(id: number): Promise<Unit> {
    return this.unitRepository.findOne({
      where: { id },
    });
  }

  async create(unit: CreateUnitInput): Promise<Unit> {
    const unitExists = await this.getByUnitName(unit.name);

    if (unitExists) {
      throw new HttpException('Já existe uma unidade com esse nome', 409);
    }

    const unitEntity = new Unit();
    unitEntity.name = unit.name;

    return await this.unitRepository.save(unitEntity);
  }

  async update(id: number, unit: UpdateUnitInput): Promise<Unit> {
    const unitExists = await this.getByUnitName(unit.name);
    if (unitExists) {
      throw new HttpException('Já existe uma unidade com esse nome', 409);
    }

    await this.unitRepository.update(id, unit);
    return this.unitRepository.findOne({
      where: { id },
    });
  }

  async getByUnitName(name: string): Promise<Unit> {
    return this.unitRepository.findOne({
      where: { name },
    });
  }
}
