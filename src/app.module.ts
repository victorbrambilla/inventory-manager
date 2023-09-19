import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UnitModule } from './unit/unit.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { databaseConfig } from 'src/configs/database.config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, // <--- "driver" should be here, as shown in the docs
      playground: true,
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRoot(databaseConfig as ConnectionOptions),
    UnitModule,
  ],
})
export class AppModule {}
