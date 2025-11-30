import { Product, Category } from "../models/index.js";

export const getAllProducts = () =>
  Product.findAll({
    include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
  });

export const getProductById = (id) =>
  Product.findByPk(id, {
    include: [{ model: Category, as: "category", attributes: ["id", "name"] }],
  });

export const createProduct = (data) => Product.create(data);
export const updateProduct = (id, data) => Product.update(data, { where: { id } });
export const deleteProduct = (id) => Product.destroy({ where: { id } });