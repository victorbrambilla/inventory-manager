import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { hashPasswordTransform } from 'src/common/transformers/crypto-transform';
import Role from 'src/enums/roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  email: string;

  @Column({
    transformer: hashPasswordTransform,
  })
  @HideField()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  @Field()
  role: Role;
}
