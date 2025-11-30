import { Router } from "express";
import sequelize from "../config/database.js";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ message: "API Inventario funcionando" });
});

router.get("/db-test", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.json({ status: "ok", message: "DB conectada" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

export default router;
