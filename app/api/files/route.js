import { pinata } from "@/app/utils/config";
import { NextRequest, NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  try {
    const uuid = uuidv4();
    const keyData = await pinata.keys.create({
      keyName: uuid.toString(),
      permissions: {
        endpoints: {
          pinning: {
            pinFileToIPFS: true,
          },
        },
      },
      maxUses: 1,
    });
    return NextResponse.json(keyData, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { text: "Error creating API Key:" },
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

    // console.log("Title:", title);
    // console.log("Name:", name);
    // console.log("Date of Birth:", dateOfBirth);
    // console.log("Medical Condition:", medicalCondition);
    // console.log("Medications:", medications);

    const uploadData = await pinata.upload.file(file).addMetadata({
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
