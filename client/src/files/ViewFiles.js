import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";

const FileListView = () => {
  const { userData, isLoading } = useUser();
  const [filesData, setFilesData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user data is available
    if (!userData) {
      return;
    }

    const apiUrl = `http://127.0.0.1:4000/files?user=${userData.uid}`;

    // Fetch files data from the server
    axios
      .get(apiUrl)
      .then((response) => {
        const files = response.data.files;
        setFilesData(files);
      })
      .catch((err) => {
        setError(err);
      });
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return (
      <div>
        You are not logged in. Please log in to view your uploaded data.
      </div>
    );
  }

  if (error) {
    return (
      <div>
        An error occurred while fetching the data. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h2>View Files</h2>
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
          {filesData.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>{new Date(file.LastModified).toLocaleString()}</td>
              <td>{file.Size} bytes</td>
              <td>
                <a
                  href={`http://127.0.0.1:4000/download?key=${file.Key}`}
                  download={file.name}>
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileListView;
