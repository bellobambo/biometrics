"use client";

import { useState, useRef } from "react";
import { pinata } from "../utils/config";

export default function IPFS() {
  const [file, setFile] = useState();
  const [cid, setCid] = useState("");
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const inputFile = useRef(null);

  const uploadFile = async () => {
    try {
      setUploading(true);
      const data = new FormData();
      data.set("file", file);
      data.set("title", title);
      data.set("amount", amount);
      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });
      const uploadData = await uploadRequest.json();
      setCid(uploadData.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  const handleChangeFile = (e) => {
    setFile(e.target.files[0]);
  };

  const fetchfile = async () => {
    try {
      setUploading(true);
      const keyRequest = await fetch("/api/key", {
        method: "GET",
      });
      const keyData = await keyRequest.json();
      const upload = await pinata.upload.file(file).key(keyData.JWT);
      setCid(upload.IpfsHash);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert("Trouble uploading file");
    }
  };

  return (
    <main>
      <div className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
        <div className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={handleChangeFile}
          />
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button disabled={uploading} onClick={uploadFile}>
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {cid && (
            <div>
              <p>Title: {title}</p>
              <p>Amount: {amount}</p>
              <img
                src={`https://aqua-junior-bobolink-189.mypinata.cloud/ipfs/${cid}`}
                crossOrigin="anonymous"
                alt="Image from IPFS"
              />
            </div>
          )}
        </div>
        <button disabled={uploading} onClick={fetchfile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </main>
  );
}
