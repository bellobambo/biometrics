"use client";

import { useActiveAccount } from "thirdweb/react";
import { useState, useEffect, useRef } from "react";

const IPFS = () => {
  const activeAccount = useActiveAccount();
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [medications, setMedications] = useState("");
  const inputFile = useRef(null);
  const [groupName, setGroupName] = useState("");

  useEffect(() => {
    if (activeAccount?.address) {
      localStorage.setItem("walletAddress", activeAccount.address);
      setGroupName(activeAccount.address);
    }
  }, [activeAccount?.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("name", name);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("medicalCondition", medicalCondition);
    formData.append("medications", medications);
    formData.append("groupName", groupName); // Send group name as part of the form data

    try {
      const response = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const uploadData = await response.json();
      console.log("Uploaded data:", uploadData);
      setCid(uploadData.IpfsHash);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl text-black font-semibold mb-6 text-center">
          Create A Medical Report
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="text-left text-black mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            placeholder="Dentist Appointment"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <label htmlFor="name" className="text-left text-black mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Mr Gbenga"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <label htmlFor="dateOfBirth" className="text-left text-black mb-2">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <label
            htmlFor="medicalCondition"
            className="text-left text-black mb-2"
          >
            Medical Condition:
          </label>
          <input
            type="text"
            id="medicalCondition"
            placeholder="Toothache"
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <label htmlFor="medications" className="text-left text-black mb-2">
            Medications:
          </label>
          <input
            type="text"
            id="medications"
            placeholder="Pepsodent Toothpaste"
            value={medications}
            onChange={(e) => setMedications(e.target.value)}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <label htmlFor="file" className="text-left text-black mb-2">
            Upload File:
          </label>
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 mb-4 border border-black rounded-lg focus:outline-none"
          />
          <input type="hidden" value={groupName} />

          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-2 text-white font-semibold rounded-lg ${
              uploading
                ? "bg-black cursor-not-allowed"
                : "bg-black hover:bg-gray-700"
            }`}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>
        {cid && (
          <div className="mt-8 bg-red-50 p-4 rounded-lg">
            <p className="text-black">
              <strong>Title:</strong> {title}
            </p>
            <p className="text-black">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-black">
              <strong>Date of Birth:</strong> {dateOfBirth}
            </p>
            <p className="text-black">
              <strong>Medical Condition:</strong> {medicalCondition}
            </p>
            <p className="text-black">
              <strong>Medications:</strong> {medications}
            </p>
            {cid && (
              <img
                src={`https://aqua-junior-bobolink-189.mypinata.cloud/ipfs/${cid}`}
                crossOrigin="anonymous"
                alt="Image from IPFS"
                className="mt-4 w-full rounded-lg shadow-lg"
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default IPFS;
