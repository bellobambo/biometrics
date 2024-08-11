// Import required packages
const pinataSDK = require("@pinata/sdk");
import { NextResponse } from "next/server";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT });
export const dynamic = "force-dynamic";

// Define the GET function to handle GET requests
export async function GET() {
  try {
    // Authenticate with Pinata
    await pinata.testAuthentication();

    // Fetch all pinned files
    const response = await pinata.pinList({
      status: "pinned", // Fetch all items, regardless of their pin status
      pageLimit: 1000, // Adjust this as needed
      pageOffset: 0, // Starting point (useful for pagination)
    });

    // Return the response data as JSON
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching data from Pinata" },
      { status: 500 }
    );
  }
}
