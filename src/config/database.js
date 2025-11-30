import { Sequelize } from "sequelize";

const dbUrl = process.env.MYSQL_URL || process.env.DATABASE_URL;

const sequelize = new Sequelize(dbUrl, {
  dialect: "mysql",
  logging: false,
});

export default sequelize;
