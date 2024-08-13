// Import required packages
import { PinataSDK } from "pinata";
import { NextResponse } from "next/server";
import { getSharedValue } from "../sharedState";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
      pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
    });

    await pinata.testAuthentication();

    // Retrieve the stored groupId
    const groupId = getSharedValue();

    console.log("Retrieved groupId:", groupId);

    if (!groupId) {
      return NextResponse.json(
        { error: "Group ID not found" },
        { status: 404 }
      );
    }

    const group = await pinata.listFiles().group(groupId);

    // console.log(group, "files in group");

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error fetching data from Pinata" },
      { status: 500 }
    );
  }
}
