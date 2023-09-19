import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";

const ViewFiles = () => {
  // Define state variables
  const { userData, isLoading } = useUser();
  const [filesData, setFilesData] = useState([]);

  // Function to trigger file download
  const triggerDownload = async (fileKey) => {
    try {
      const response = await axios.get(`/api/download?key=${fileKey}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileKey.split("/")[1]);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to fetch files data
  useEffect(() => {
    if (!userData) {
      return;
    }
    axios
      .get(`api/files?user=${userData.email}`)
      .then((response) => {
        setFilesData(response.data.files);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [userData]);

  return (
    <div>
      <h2>View Files</h2>
      {isLoading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Date</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filesData.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{new Date(file.LastModified).toLocaleString()}</td>
                  <td>{file.Size} bytes</td>
                  <td>
                    <button onClick={() => triggerDownload(file.Key)}>
                      Download
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>You must be logged in to upload a file.</div>
      )}
    </div>
  );
};

export default ViewFiles;
