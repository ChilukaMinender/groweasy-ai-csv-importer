import { Request, Response } from "express";
import { parseCSV } from "../services/csv.service";

export const uploadCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "CSV file is required.",
      });
      return;
    }

    const preview = await parseCSV(req.file.buffer);

    res.json({
      success: true,
      totalRows: preview.length,
      preview: preview.slice(0, 20),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to parse CSV.",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};