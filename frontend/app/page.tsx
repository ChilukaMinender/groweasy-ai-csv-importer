"use client";

import { useState } from "react";
import UploadBox from "@/components/upload/UploadBox";
import MappingTable from "@/components/table/MappingTable";
import SummaryCards from "@/components/table/SummaryCards";
import api from "@/services/api";

interface CSVRow {
  [key: string]: string;
}

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<CSVRow[]>([]);
  const [crmData, setCrmData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  const [stats, setStats] = useState({
    imported: 0,
    skipped: 0,
  });

  const uploadFile = async (file: File) => {
    setSelectedFile(file);
    setPreview([]);
    setCrmData([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPreview(response.data.preview);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const confirmImport = async () => {
    try {
      setImporting(true);

      const response = await api.post("/import", {
        records: preview,
      });

      setCrmData(response.data.data);

      setStats({
        imported: response.data.imported,
        skipped: response.data.skipped,
      });
    } catch (error) {
      console.error(error);
      alert("AI Import Failed");
    } finally {
      setImporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center mb-8">
          GrowEasy AI CSV Importer
        </h1>

        <UploadBox onFileSelect={uploadFile} />

        {selectedFile && (
          <div className="mt-6 bg-gray-50 border rounded-lg p-5">
            <h2 className="font-bold mb-2">
              Selected File
            </h2>

            <p>Name : {selectedFile.name}</p>

            <p>
              Size :
              {" "}
              {(selectedFile.size / 1024).toFixed(2)}
              {" "}KB
            </p>
          </div>
        )}

        {loading && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
            <h2 className="text-blue-700 font-bold">
              Parsing CSV...
            </h2>
          </div>
        )}

        {preview.length > 0 && (
          <>
            <div className="mt-8">

              <h2 className="text-2xl font-bold mb-4">
                CSV Preview
              </h2>

              <div className="overflow-auto border rounded-lg max-h-[450px]">

                <table className="min-w-full">

                  <thead className="bg-gray-200 sticky top-0">

                    <tr>

                      {Object.keys(preview[0]).map((key) => (

                        <th
                          key={key}
                          className="border p-3 text-left"
                        >
                          {key}
                        </th>

                      ))}

                    </tr>

                  </thead>

                  <tbody>

                    {preview.map((row, index) => (

                      <tr key={index}>

                        {Object.values(row).map((value, i) => (

                          <td
                            key={i}
                            className="border p-3"
                          >
                            {value}
                          </td>

                        ))}

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

            <MappingTable columns={Object.keys(preview[0])} />

            <div className="mt-8 flex justify-end">

              <button
                onClick={confirmImport}
                disabled={importing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                {importing ? "Importing..." : "Confirm Import"}
              </button>

            </div>

          </>
        )}

        {importing && (

          <div className="mt-8 bg-blue-100 border border-blue-300 rounded-lg p-6">

            <h2 className="text-2xl font-bold text-blue-700">
              AI is extracting CRM fields...
            </h2>

            <p className="mt-2">
              Please wait...
            </p>

          </div>

        )}

        {crmData.length > 0 && (

          <div className="mt-10">

            <SummaryCards
              imported={stats.imported}
              skipped={stats.skipped}
            />

            <h2 className="text-3xl font-bold mt-8 mb-4">
              CRM Records
            </h2>

            <div className="overflow-auto border rounded-lg max-h-[600px]">

              <table className="min-w-full">

                <thead className="bg-green-200 sticky top-0">

                  <tr>

                    {Object.keys(crmData[0]).map((key) => (

                      <th
                        key={key}
                        className="border p-3 text-left"
                      >
                        {key}
                      </th>

                    ))}

                  </tr>

                </thead>

                <tbody>

                  {crmData.map((row, index) => (

                    <tr key={index}>

                      {Object.values(row).map((value: any, i) => (

                        <td
                          key={i}
                          className="border p-3"
                        >
                          {String(value)}
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            <div className="mt-8 bg-green-100 border border-green-300 rounded-lg p-6">

              <h2 className="text-2xl font-bold text-green-700">
                🎉 Import Completed Successfully
              </h2>

              <p className="mt-2">
                Imported Records : {stats.imported}
              </p>

              <p>
                Skipped Records : {stats.skipped}
              </p>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}