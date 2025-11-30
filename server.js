import app from "./src/app.js";
import "dotenv/config"; 

const PORT = process.env.PORT || 3000;

console.log("DATABASE_URL:", process.env.MYSQL_URL || process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
