import React, { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const UploadFile = () => {
  // Define state variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const { userData, isLoading } = useUser();

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      setStatus("Uploading...");
      const formData = new FormData();
      formData.append("file", selectedFile, selectedFile.name);

      // Check if userData is not null
      if (userData) {
        const response = await axios.post(
          `/api/upload?user=${userData.email}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          setStatus("File uploaded successfully.");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus("Error during upload. Please try again.");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <div>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
          <div>Status: {status}</div>
        </div>
      ) : (
        <div>You must be logged in to upload a file.</div>
      )}
    </div>
  );
};

export default UploadFile;
