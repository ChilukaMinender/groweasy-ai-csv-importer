import { Router } from "express";
import { importCSV } from "../controllers/import.controller";

const router = Router();

router.post("/import", importCSV);

export default router;