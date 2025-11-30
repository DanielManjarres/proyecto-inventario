import { sequelize } from "./backend/src/models/index.js";

async function deploy() {
  try {
    await sequelize.authenticate();
    console.log("Conexión OK con Railway");

    
    await sequelize.sync({ force: false, alter: { drop: false } });
    console.log("Tablas sincronizadas correctamente");

    
    await sequelize.models.Category.findOrCreate({
      where: { name: "General" },
      defaults: { name: "General" }
    });

    console.log("¡Listo! Todo sincronizado en Railway");
    process.exit(0);
  } catch (error) {
    console.error("Error en sincronización:", error.message);

    
    console.log("Intentando con force: true (solo esta vez)...");
    try {
      await sequelize.sync({ force: true });
      console.log("Tablas recreadas con force: true");
      await sequelize.models.Category.create({ name: "General" });
      console.log("Categoría inicial creada");
      process.exit(0);
    } catch (e) {
      console.error("Falló todo:", e.message);
      process.exit(1);
    }
  }
}

deploy();