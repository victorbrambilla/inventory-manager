import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entry/entry.entity';
import { Food } from 'src/food/food.entity';
import { Stock } from 'src/stock/stock.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Exit {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column()
  stockId: number;

  @Field(() => Number)
  @Column()
  entryId: number;

  @Field(() => Number)
  @Column()
  foodId: number;

  @Field(() => Number)
  @Column()
  quantity: number;

  @ManyToOne(() => Stock, (stock) => stock.entries)
  stock: Stock;

  @ManyToOne(() => Entry, (entry) => entry.exits)
  entry: Entry;

  @ManyToOne(() => Food, (food) => food.entries)
  food: Food;
}
