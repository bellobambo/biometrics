import { useState, useRef } from "react";

export default function IPFS() {
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [medications, setMedications] = useState("");
  const inputFile = useRef(null);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }
    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);
      data.append("title", title);
      data.append("name", name);
      data.append("dateOfBirth", dateOfBirth);
      data.append("medicalCondition", medicalCondition);
      data.append("medications", medications);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (!uploadRequest.ok) {
        throw new Error("Failed to upload file");
      }

      const uploadData = await uploadRequest.json();
      setCid(uploadData.IpfsHash);

      // Clear input fields and file input
      setTitle("");
      setName("");
      setDateOfBirth("");
      setMedicalCondition("");
      setMedications("");
      setFile(null);
      if (inputFile.current) {
        inputFile.current.value = ""; // Clear file input
      }
    } catch (error) {
      console.error(error);
      alert("Trouble uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl text-purple-700 font-semibold mb-6 text-center">
          Create A Medical Report
        </h2>
        <label htmlFor="title" className="text-left text-purple-700 mb-2">
          Title:
        </label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label htmlFor="name" className="text-left text-purple-700 mb-2">
          Name:
        </label>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label htmlFor="dateOfBirth" className="text-left text-purple-700 mb-2">
          Date of Birth:
        </label>
        <input
          type="date"
          placeholder="Enter date of birth"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label
          htmlFor="medicalCondition"
          className="text-left text-purple-700 mb-2"
        >
          Medical Condition:
        </label>
        <input
          type="text"
          placeholder="Enter medical condition"
          value={medicalCondition}
          onChange={(e) => setMedicalCondition(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label htmlFor="medications" className="text-left text-purple-700 mb-2">
          Medications:
        </label>
        <input
          type="text"
          placeholder="Enter medications"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <label htmlFor="file" className="text-left text-purple-700 mb-2">
          Upload File:
        </label>
        <input
          type="file"
          id="file"
          ref={inputFile}
          onChange={handleChangeFile}
          className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          disabled={uploading}
          onClick={uploadFile}
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            uploading
              ? "bg-purple-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {cid && (
          <div className="mt-8 bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-700">
              <strong>Title:</strong> {title}
            </p>
            <p className="text-purple-700">
              <strong>Name:</strong> {name}
            </p>
            <p className="text-purple-700">
              <strong>Date of Birth:</strong> {dateOfBirth}
            </p>
            <p className="text-purple-700">
              <strong>Medical Condition:</strong> {medicalCondition}
            </p>
            <p className="text-purple-700">
              <strong>Medications:</strong> {medications}
            </p>
            <img
              src={`https://aqua-junior-bobolink-189.mypinata.cloud/ipfs/${cid}`}
              crossOrigin="anonymous"
              alt="Image from IPFS"
              className="mt-4 w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </main>
  );
}
