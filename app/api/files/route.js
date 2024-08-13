import { pinata } from "@/app/utils/config";
import { NextRequest, NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");
import { PinataSDK } from "pinata";

let globalGroupId = null;

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const pinata = new PinataSDK({
      pinataJwt: process.env.PINATA_JWT,
      pinataGateway: process.env.NEXT_PUBLIC_GATEWAY_URL,
    });

    await pinata.testAuthentication();

    let groupId = globalGroupId;
    if (typeof window !== "undefined" && !globalGroupId) {
      groupId = localStorage.getItem("groupId");
      globalGroupId = groupId; // Set it globally if found
    }

    // console.log("Retrieved groupId:", groupId);

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

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const title = data.get("title");
    const name = data.get("name");
    const dateOfBirth = data.get("dateOfBirth");
    const medicalCondition = data.get("medicalCondition");
    const medications = data.get("medications");
    const groupName = data.get("groupName"); // Get groupName from the request

    const existingGroups = await pinata.groups.list(); // List all groups
    const existingGroup = existingGroups.find(
      (group) => group.name === groupName
    );

    let groupId;
    if (existingGroup) {
      groupId = existingGroup.id; // Use existing group ID
      // console.log(existingGroup, "group info");
    } else {
      const newGroup = await pinata.groups.create({ name: groupName });
      // console.log(newGroup, "group info");

      groupId = newGroup.id; // Use new group ID
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("groupId", groupId);
    }
    globalGroupId = groupId;

    const uploadData = await pinata.upload
      .file(file)
      .group(groupId) // Use the correct group ID
      .addMetadata({
        name: title, // optional
        keyValues: {
          title: title,
          name: name,
          dateOfBirth: dateOfBirth,
          medicalCondition: medicalCondition,
          medications: medications,
        },
      });

    return NextResponse.json(
      {
        ...uploadData,
        title,
        name,
        dateOfBirth,
        medicalCondition,
        medications,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
