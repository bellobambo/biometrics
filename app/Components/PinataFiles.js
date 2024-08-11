"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function PinataFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/all");
        const data = await response.json();
        setFiles(data.rows);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        alert("Trouble fetching data");
      }
    };

    fetchData();
  }, []);

  const downloadPDF = async (file) => {
    const element = document.getElementById(`file-${file.id}`);
    const button = element.querySelector("button");

    // Hide the download button
    button.style.visibility = "hidden";

    // Override styles if necessary
    element.style.color = "#000"; // Example of overriding text color to black

    // Capture the screenshot with image loading support
    const canvas = await html2canvas(element, {
      useCORS: true, // Ensure CORS is enabled
      allowTaint: true, // Allow cross-origin images
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    // Add image data to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    const patientName = file.metadata.keyvalues.name || "Medical_Report";
    pdf.save(`${patientName}_Medical_Report.pdf`);

    // Reset styles and show the button again
    element.style.color = ""; // Reset to original or default color
    button.style.visibility = "visible"; // Show the download button again
  };

  return (
    <div>
      <div className="flex justify-between m-3 items-center">
        <div className="my-3">
          <Link
            className="bg-black text-white hover:bg-red-400 p-3 rounded"
            href="/"
          >
            Back
          </Link>
        </div>
        <div>
          <Navbar />
        </div>
      </div>
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl">
          <h2 className="text-2xl text-black font-semibold mb-6 text-center">
            Medical Report History
          </h2>
          {loading ? (
            <p className="text-center text-black">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {files.map((file) => (
                <div
                  key={file.id}
                  id={`file-${file.id}`}
                  className="bg-red-200 rounded p-4"
                >
                  <div className="bg-red-150 p-4 rounded-lg">
                    <p className="text-black">
                      <strong>Date Created:</strong>{" "}
                      {new Date(file.date_pinned).toLocaleString()}
                    </p>
                    {file.metadata.keyvalues && (
                      <div className="mt-2">
                        <p className="text-black">
                          <strong>Patient Details:</strong>
                        </p>
                        <ul className="text-black bg-white p-2 rounded-lg shadow-inner">
                          {Object.entries(file.metadata.keyvalues).map(
                            ([key, value]) => {
                              let displayKey;
                              switch (key) {
                                case "name":
                                  displayKey = "Name";
                                  break;
                                case "title":
                                  displayKey = "Title";
                                  break;
                                case "dateOfBirth":
                                  displayKey = "Date of Birth";
                                  break;
                                case "medications":
                                  displayKey = "Medication";
                                  break;
                                case "medicalCondition":
                                  displayKey = "Medical Condition";
                                  break;
                                default:
                                  displayKey = key;
                              }
                              return (
                                <li key={key}>
                                  <strong>{displayKey}:</strong> {value}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    )}
                    <img
                      src={`https://aqua-junior-bobolink-189.mypinata.cloud/ipfs/${file.ipfs_pin_hash}`}
                      width={500}
                      height={500}
                      crossOrigin="anonymous"
                      alt="Image from IPFS"
                      className="mt-4 w-full rounded-lg shadow-lg"
                    />
                    <button
                      onClick={() => downloadPDF(file)}
                      className="mt-4 bg-black text-white py-2 px-4 rounded cursor-pointer hover:bg-red-400"
                    >
                      Download Medical Report
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
