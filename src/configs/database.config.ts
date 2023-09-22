export const databaseConfig = {
  type: process.env.DB_TYPE as any,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  useUTC: true,
};
