import { Router } from "express";
import multer from "multer";
import { uploadCSV } from "../controllers/upload.controller";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
});

router.post("/upload", upload.single("file"), uploadCSV);

export default router;