export interface CSVRow {
  [key: string]: string;
}

export interface UploadResponse {
  success: boolean;
  totalRows: number;
  preview: CSVRow[];
}