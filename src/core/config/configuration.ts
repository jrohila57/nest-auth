import { Dialect } from 'sequelize';

export default () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  base_url: process.env.BASE_URL,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10) || 5432,
    dialect: process.env.DB_DIALECT as Dialect,
  },
});
