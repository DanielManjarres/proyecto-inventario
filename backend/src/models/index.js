// backend/src/models/index.js
import sequelize from "../config/database.js";
import "./category.model.js";
import "./product.model.js";

// Esto fuerza a que los modelos se registren en sequelize.models
import Category from "./category.model.js";
import Product from "./product.model.js";

// Sincroniza las tablas (solo en desarrollo)
if (import.meta.env.MODE!== "production") {
  sequelize.sync({ alter: true }).catch(console.error);
}

export { sequelize, Category, Product };