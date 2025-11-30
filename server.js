import app from "./src/app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
  console.log("DB URL desde Railway:", process.env.DATABASE_URL);
  console.log("VARIABLE FINAL:", process.env.DATABASE_URL);

});
