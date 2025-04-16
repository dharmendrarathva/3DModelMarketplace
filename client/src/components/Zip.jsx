import React, { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";

const Zip = () => {
  const [zipFiles, setZipFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch ZIP files from the backend
  const fetchZipFiles = async () => {
    try {
      const response = await Axios({
        url: "/api/files", // Ensure this matches your backend route
        method: "get",
      });

      if (response.data) {
        setZipFiles(response.data);
      }
    } catch (error) {
      console.error("Error fetching ZIP files:", error);
    }
  };

  useEffect(() => {
    fetchZipFiles();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a ZIP file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setUploading(true);

    try {
      const response = await Axios.post("/api/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        alert("File uploaded successfully!");
        setSelectedFile(null);
        fetchZipFiles(); // Refresh file list
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload a ZIP File</h2>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      <h2>Available ZIP Files</h2>
      <ul>
        {zipFiles.length > 0 ? (
          zipFiles.map((file, index) => (
            <li key={index}>
              <a href={file.fileUrl} download>
                {file.filename}
              </a>
            </li>
          ))
        ) : (
          <p>No ZIP files available.</p>
        )}
      </ul>
    </div>
  );
};

export default Zip;
