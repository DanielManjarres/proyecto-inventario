import * as service from "../services/category.service.js";

export const getAll = async (req, res) => {
  const categories = await service.getAllCategories();
  res.json(categories);
};

export const getById = async (req, res) => {
  const category = await service.getCategoryById(req.params.id);
  if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
  res.json(category);
};

export const create = async (req, res) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const [updated] = await service.updateCategory(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Categoría no encontrada" });
  const category = await service.getCategoryById(req.params.id);
  res.json(category);
};

export const remove = async (req, res) => {
  const deleted = await service.deleteCategory(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Categoría no encontrada" });
  res.status(204).send();
};