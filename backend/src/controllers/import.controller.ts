import { Request, Response } from "express";
import { extractCRM } from "../services/gemini.service";

export const importCSV = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("========== IMPORT REQUEST ==========");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    console.log("===================================");

    if (!req.body) {
      res.status(400).json({
        success: false,
        message: "Request body is missing.",
      });
      return;
    }

    const { records } = req.body;

    if (!records || !Array.isArray(records)) {
      res.status(400).json({
        success: false,
        message: "Records array is required.",
      });
      return;
    }

    const crmRecords = await extractCRM(records.slice(0, 5));

    res.json({
      success: true,
      imported: crmRecords.length,
      skipped: records.length - crmRecords.length,
      data: crmRecords,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "AI Import Failed",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};