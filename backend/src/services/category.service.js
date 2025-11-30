import { Category } from "../models/index.js";

export const getAllCategories = () => Category.findAll();
export const getCategoryById = (id) => Category.findByPk(id);
export const createCategory = (data) => Category.create(data);
export const updateCategory = (id, data) => Category.update(data, { where: { id } });
export const deleteCategory = (id) => Category.destroy({ where: { id } });