import { Dialect } from 'sequelize';

interface DatabaseConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}

export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  base_url: process.env.BASE_URL as string,
  jwt_secret: process.env.JWT_SECRET as string,
  database: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    dialect: process.env.DB_DIALECT as Dialect,
  } as DatabaseConfig,
});
