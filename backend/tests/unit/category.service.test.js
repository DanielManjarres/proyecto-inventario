/**
 * @jest-environment node
 */

import { jest } from "@jest/globals";

// 1. MOCK PRIMERO (antes de importar el servicio)
jest.unstable_mockModule("../../src/models/index.js", () => ({
  Category: {
    findAll: jest.fn(),
    create: jest.fn(),
  },
}));

// 2. AHORA SÍ: importa todo después del mock
const { Category } = await import("../../src/models/index.js");
const { getAllCategories, createCategory } = await import(
  "../../src/services/category.service.js"
);

describe("UNIT - Category Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllCategories devuelve categorías mockeadas", async () => {
    const mockData = [{ id: 1, name: "Electrónica" }];
    Category.findAll.mockResolvedValue(mockData);

    const result = await getAllCategories();

    expect(result).toEqual(mockData);
    expect(Category.findAll).toHaveBeenCalled();
  });

  test("createCategory crea y devuelve una categoría", async () => {
    const nuevaCategoria = { id: 999, name: "Gaming" };
    Category.create.mockResolvedValue(nuevaCategoria);

    const result = await createCategory({ name: "Gaming" });

    expect(result).toEqual(nuevaCategoria);
    expect(Category.create).toHaveBeenCalledWith({ name: "Gaming" });
  });
});
