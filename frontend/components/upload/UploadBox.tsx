"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface UploadBoxProps {
  onFileSelect: (file: File) => void;
}

export default function UploadBox({
  onFileSelect,
}: UploadBoxProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "text/csv": [".csv"],
      },
      multiple: false,
      onDrop,
    });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded-xl p-12 text-center cursor-pointer hover:border-blue-600 transition"
    >
      <input {...getInputProps()} />

      {isDragActive ? (
        <p className="text-lg font-semibold">
          Drop your CSV here...
        </p>
      ) : (
        <>
          <h2 className="text-2xl font-bold">
            Upload CSV
          </h2>

          <p className="mt-4 text-gray-500">
            Drag & Drop or Click to Select CSV File
          </p>
        </>
      )}
    </div>
  );
}