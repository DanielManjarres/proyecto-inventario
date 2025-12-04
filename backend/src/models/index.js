import sequelize from "../config/database.js";
import Category from "./category.model.js";
import Product from "./product.model.js";

// Importar modelos para que se registren en sequelize.models
import "./category.model.js";
import "./product.model.js";


if (process.env.NODE_ENV !== "test") {
  sequelize
    .sync({ alter: true })
    .then(() => console.log("Modelos sincronizados"))
    .catch((err) => console.error("Sync error:", err));
}

export { sequelize, Category, Product };
