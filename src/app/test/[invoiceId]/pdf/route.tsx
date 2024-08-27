import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: { invoiceId: string } }
) {
  const publicDirectoryPath = path.join(process.cwd(), "public");
  const stream = fs.createReadStream(
    `${publicDirectoryPath}/uploads/${params.invoiceId}`
  );
  const headers = new Headers();
  headers.append("Content-Type", "application/pdf");
  headers.append("Content-Disposition", `inline; filename=${params.invoiceId}`);
  return new NextResponse(stream as unknown as ReadableStream, {
    headers: headers,
  });
}
