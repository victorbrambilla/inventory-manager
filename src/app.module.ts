import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UnitModule } from './unit/unit.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { databaseConfig } from 'src/configs/database.config';
import { FoodModule } from './food/food.module';
import { EntryModule } from './entry/entry.module';
import { StockModule } from 'src/stock/stock.module';
import { ExitModule } from './exit/exit.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CronjobsModule } from './cronjobs/cronjobs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // <--- "driver" should be here, as shown in the docs
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot(databaseConfig as ConnectionOptions),
    ScheduleModule.forRoot(),
    UnitModule,
    FoodModule,
    EntryModule,
    StockModule,
    ExitModule,
    CronjobsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
