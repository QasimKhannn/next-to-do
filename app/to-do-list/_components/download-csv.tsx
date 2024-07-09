"use client";
import React from "react";
import csvDownload from "json-to-csv-export";

interface CsvProps extends React.PropsWithChildren {
  data: any[];
  filename: string;
  delimiter: string;
  headers: string[];
}

const CsvDownloadButton = ({
  data,
  filename,
  delimiter,
  headers,
  children,
  ...others
}: CsvProps) => {
  const transformData = (data: any[]) => {
    return data.map((item) => {
      const transformedItem: { [key: string]: any } = {};

      headers.forEach((header) => {
        const value = item[header];

        // Check if value is an array
        if (Array.isArray(value)) {
          // Join array elements without delimiter
          transformedItem[header] = value.join(", ");
        } else if (typeof value === "object" && value !== null) {
          // Handle objects by converting to JSON string
          transformedItem[header] = JSON.stringify(value);
        } else {
          // Otherwise, assign the value as is
          transformedItem[header] = value !== undefined ? value : "";
        }
      });

      return transformedItem;
    });
  };

  const downloadCsv = () => {
    try {
      const transformedData = transformData(data);
      csvDownload({ data: transformedData, filename, delimiter, headers });
    } catch (error) {
      console.error("Failed to download CSV:", error);
    }
  };

  return (
    <button onClick={downloadCsv} {...others}>
      {children || "Download Data"}
    </button>
  );
};

export default CsvDownloadButton;
