import { Router } from "express";
import categoryRoutes from "./category.routes.js";
import productRoutes from "./product.routes.js";

const router = Router();

router.get("/status", (req, res) => res.json({ message: "API Inventario OK" }));

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);

export default router;