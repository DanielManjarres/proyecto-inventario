import app from "./src/app.js";
import dotenv from "dotenv";
import sequelize from "./src/config/database.js";
dotenv.config();

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);
    
    await sequelize.authenticate();
    console.log("Conexión a DB exitosa.");

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error conectando a la DB:", error);
  }
}

start();
