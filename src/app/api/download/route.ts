import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

export const runtime = "nodejs";

function cloudinaryGet(path: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!
    );
    const sep = path.includes("?") ? "&" : "?";
    const fullUrl = "https://api.cloudinary.com/v1_1/" + process.env.CLOUDINARY_CLOUD_NAME + path + sep + "timestamp=" + timestamp + "&api_key=" + process.env.CLOUDINARY_API_KEY + "&signature=" + signature;

    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        let body = "";
        res.on("data", (c) => (body += c));
        res.on("end", () => reject(new Error("Cloudinary API " + res.statusCode + ": " + body.slice(0, 200))));
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!parsed.hostname.endsWith("cloudinary.com")) {
    return NextResponse.json({ error: "URL must be from Cloudinary" }, { status: 400 });
  }

  const match = url.match(/\/raw\/upload\/(?:v\d+\/)?(.+?)(?:\?|$)/);
  if (!match) {
    return NextResponse.json({ error: "Invalid Cloudinary raw URL format" }, { status: 400 });
  }

  const publicId = match[1];

  try {
    const fileBuffer = await cloudinaryGet("/raw/download/" + publicId);
    const filename = publicId.split("/").pop() || "download.pdf";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="' + filename + '"',
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Download failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
