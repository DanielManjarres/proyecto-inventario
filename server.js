import 'dotenv/config';
import app from "./backend/src/app.js";           
import sequelize from "./backend/src/config/database.js"; 

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
