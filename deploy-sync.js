import { sequelize } from "./backend/src/models/index.js";

async function deploy() {
  try {
    await sequelize.authenticate();
    console.log("Conexión OK con Railway");

    await sequelize.sync({ force: false, alter: true });
    console.log("Tablas sincronizadas correctamente en Railway");

    const [cat] = await sequelize.models.Category.findOrCreate({
      where: { name: "Sin categoría" },
      defaults: { name: "Sin categoría" }
    });
    console.log("Categoría por defecto creada:", cat.name);

    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

deploy();