import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entry/entry.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class Stock {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Entry, (entry) => entry.stock)
  entries: Entry[];
}
