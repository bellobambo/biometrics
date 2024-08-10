import { pinata } from "@/app/utils/config";
import { NextRequest, NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export const config = {
  api: {
    bodyParser: false,
  },
};

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
    const amount = data.get("amount");

    console.log("Title:", title);
    console.log("Amount:", amount);

    const uploadData = await pinata.upload.file(file, {
      pinataMetadata: {
        name: title, // optional
        keyvalues: {
          title: title,
          amount: amount,
        },
      },
    });

    return NextResponse.json({ ...uploadData, title, amount }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
