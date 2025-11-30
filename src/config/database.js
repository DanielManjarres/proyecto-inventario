import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = process.env.DATABASE_URL
  ? {
      url: process.env.DATABASE_URL,
      options: {
        dialect: "mysql",
        logging: false,
      },
    }
  : {
      url: `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
      options: {
        dialect: "mysql",
        logging: false,
      },
    };

const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

export default sequelize;
