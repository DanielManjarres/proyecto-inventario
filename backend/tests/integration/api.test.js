/**
 * @jest-environment node
 */

import request from "supertest";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------
// 1. Cargar servidor
// ------------------------------
const serverPath = path.resolve(__dirname, "../../../server.js");
const app = (await import(serverPath)).default;

// ------------------------------
// 2. Cargar Sequelize
// ------------------------------
const dbPath = path.resolve(__dirname, "../../src/config/database.js");
const { sequelize } = await import(dbPath);

// ------------------------------
// 3. Instancia de Supertest
// ------------------------------
const api = request(app);

// ------------------------------
// 4. Preparación antes de todos los tests
// ------------------------------
beforeAll(async () => {
  process.env.NODE_ENV = "test";

  // Eliminar TODAS las tablas antes de crear nuevas
  await sequelize.drop();
  await sequelize.sync({ force: true });

  // Crear datos iniciales
  await sequelize.models.Category.create({ name: "General" });
});

// ------------------------------
// 5. Limpiar después de todos los tests
// ------------------------------
afterAll(async () => {
  await sequelize.close();
});

// ------------------------------
// 6. TESTS
// ------------------------------

describe("API - Integration Tests", () => {
  test("GET /api/categories responde 200 y lista categorías", async () => {
    const res = await api.get("/api/categories");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/categories crea una categoría", async () => {
    const res = await api
      .post("/api/categories")
      .send({ name: "NuevaCategoria" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("name", "NuevaCategoria");
  });

  test("GET /api/categories después de crear debe tener al menos 2 categorías", async () => {
    const res = await api.get("/api/categories");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });
});
