import { pinata } from "@/app/utils/config";
import { NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request) {
  return NextResponse.json(
    { message: "Welcome to the Pinata upload API!" },
    { status: 200 }
  );
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const uploadData = await pinata.upload.file(file);
    return NextResponse.json(uploadData, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
