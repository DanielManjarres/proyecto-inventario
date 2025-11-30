import * as service from "../services/product.service.js";

export const getAll = async (req, res) => {
  const products = await service.getAllProducts();
  res.json(products);
};

export const getById = async (req, res) => {
  const product = await service.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
};

export const create = async (req, res) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  const [updated] = await service.updateProduct(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Producto no encontrado" });
  const product = await service.getProductById(req.params.id);
  res.json(product);
};

export const remove = async (req, res) => {
  const deleted = await service.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Producto no encontrado" });
  res.status(204).send();
};