interface ExportDataProps {
  onExport: (format: "csv" | "json") => void;
}

export default function ExportData({ onExport }: ExportDataProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Export:</span>
      <button
        onClick={() => onExport("csv")}
        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        CSV
      </button>
      <button
        onClick={() => onExport("json")}
        className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        JSON
      </button>
    </div>
  );
}
