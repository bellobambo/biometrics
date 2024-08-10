"use client";

import { useState, useEffect } from "react";

export default function PinataFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/all");
        const data = await response.json();
        setFiles(data);
        console.log(data, "data");
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        alert("Trouble fetching data");
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-full min-h-screen m-auto flex flex-col justify-center items-center">
            <h1>Files from Pinata</h1>
            <ul>
              {/* {files.map((file) => (
                <li key={file.ipfs_pin_hash}>
                  <p>Title: {file.metadata.name}</p>
                  <p>CID: {file.ipfs_pin_hash}</p>
                  <p>Size: {file.size} bytes</p>
                  <p>
                    Created at: {new Date(file.date_pinned).toLocaleString()}
                  </p>
                  {file.metadata.keyvalues && (
                    <div>
                      <p>Custom Metadata:</p>
                      <pre>
                        {JSON.stringify(file.metadata.keyvalues, null, 2)}
                      </pre>
                    </div>
                  )}
                </li>
              ))} */}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
