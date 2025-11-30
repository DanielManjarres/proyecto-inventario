const app = require('./src/app');
const sequelize = require('./src/config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos exitosa.");

    await sequelize.sync(); 
    console.log("Tablas sincronizadas.");

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
