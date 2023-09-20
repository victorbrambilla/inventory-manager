import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entry/entry.entity';
import { Unit } from 'src/unit/unit.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
// import { Entry } from './entry.entity';

@ObjectType()
@Entity()
export class Food {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Number)
  @Column()
  unitId: number;

  @Field(() => [Unit], { nullable: true })
  @ManyToOne(() => Unit, (unit) => unit.foods)
  unit?: Unit;

  @Field(() => [Entry], { nullable: true })
  @OneToMany(() => Entry, (entry) => entry.food)
  entries: Entry[];
}
