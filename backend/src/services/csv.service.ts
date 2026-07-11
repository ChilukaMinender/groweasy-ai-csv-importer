import { parse } from "csv-parse";

export const parseCSV = (buffer: Buffer): Promise<Record<string, string>[]> => {
  return new Promise((resolve, reject) => {
    const records: Record<string, string>[] = [];

    parse(buffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
      .on("data", (row) => {
        records.push(row);
      })
      .on("end", () => {
        resolve(records);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};