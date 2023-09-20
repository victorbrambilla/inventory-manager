import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Exit } from 'src/exit/exit.entity';
import { Food } from 'src/food/food.entity';
import { Stock } from 'src/stock/stock.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@ObjectType()
@Entity()
export class Entry {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  foodId: number;

  @Field(() => Number)
  @Column()
  stockId: number;

  @Field(() => Date)
  @Column()
  expirationDate: Date;

  @Field(() => Number)
  @Column()
  quantity: number;

  @Field(() => [Exit], { nullable: true })
  @OneToMany(() => Exit, (exit) => exit.entry)
  exits: Exit[];

  @ManyToOne(() => Food, (food) => food.entries)
  food: Food;

  @ManyToOne(() => Stock, (stock) => stock.entries)
  stock: Stock;
}
