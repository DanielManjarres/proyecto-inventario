import 'dotenv/config';
import app from "./backend/src/app.js";           
import { sequelize } from "./backend/src/models/index.js"; 

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    await sequelize.authenticate();
    console.log("DB conectada correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Error conectando a la DB:", error);
  }
}

start();

// SOLO PARA EL PRIMER DEPLOY EN RAILWAY
if (process.env.RAILWAY_ENVIRONMENT) {
  console.log("Ejecutando sincronización automática en Railway...");
  sequelize.sync({ force: true }).then(async () => {
    console.log("Tablas creadas en Railway");
    await sequelize.models.Category.findOrCreate({
      where: { name: "General" }
    });
    console.log("Categoría inicial creada");
  }).catch(err => {
    console.error("Error al crear tablas en Railway:", err.message);
  });
}
