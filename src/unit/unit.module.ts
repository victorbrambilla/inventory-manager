import { Module } from '@nestjs/common';
import { UnitResolver } from './unit.resolver';
import { UnitService } from './unit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from 'src/unit/unit.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitService, UnitResolver],
  exports: [UnitService],
})
export class UnitModule {}
