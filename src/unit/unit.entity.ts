// src/unity/unity.entity.ts
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Food } from 'src/food/food.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Unit {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Food, (food) => food.unit)
  foods: Food[];
}
