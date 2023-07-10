import { useState } from "react";
import AppLoading from "@/components/app-loading";
import AppService from "@/config/services/app-service";

export default function ClientExportButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading((prevState) => !prevState);
    try {
      const response = await AppService.exportClientsToCsv();

      const blob = new Blob([response.data], { type: "application/octet-stream" });

      // Create a temporary anchor element to download the file
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "clients.csv";
      link.click();

      // Clean up resources
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error occurred while exporting clients:", error);
    }

    setLoading((prevState) => !prevState);
  };

  return (
    <button onClick={handleDownload} disabled={loading} className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
      {loading ? <AppLoading color="white" height={20} width={20} /> : <span>Export</span>}
    </button>
  );
}
