import React, { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const UploadFile = () => {
  // Define state variables
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");
  const [filedek, setFileDek] = useState("");
  const { userData, isLoading } = useUser();

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Function to store DEK in Firestore
  const storeDEKInFirebase = async (filename, DEK, email) => {
    const docRef = doc(db, "users", email);
    await setDoc(
      docRef,
      {
        [filename]: DEK,
      },
      { merge: true }
    );
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setStatus("Select a file to upload");
      return;
    }

    const fileName = selectedFile.name;
    const email = userData.email;

    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", selectedFile, fileName);

    try {
      const response = await axios.post(`/api/upload?user=${email}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.status === "success") {
        setFileDek(`Your DEK is ${response.data.dek}.`);
        setStatus(`Uploading DEK to firestore now...`);
        // Store DEK in Firestore
        await storeDEKInFirebase(
          `${response.data.uuid}-${fileName}`,
          response.data.dek,
          email
        );
        setStatus("DEK uploaded to Firestore successfully.");
      } else {
        throw new Error(response.data.status);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setStatus(error.message);
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
          <div>{filedek}</div>
        </div>
      ) : (
        <div>You must be logged in to upload a file.</div>
      )}
    </div>
  );
};

export default UploadFile;
