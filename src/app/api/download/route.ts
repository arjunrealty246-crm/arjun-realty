import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

export const runtime = "nodejs";

function cloudinaryRawDownload(publicId: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { public_id: publicId, timestamp, type: "upload" },
      process.env.CLOUDINARY_API_SECRET!
    );

    const params = new URLSearchParams();
    params.append("public_id", publicId);
    params.append("timestamp", String(timestamp));
    params.append("api_key", process.env.CLOUDINARY_API_KEY!);
    params.append("type", "upload");
    params.append("signature", signature);

    const body = params.toString();

    const req = https.request(
      {
        hostname: "api.cloudinary.com",
        path: "/v1_1/" + process.env.CLOUDINARY_CLOUD_NAME + "/raw/download",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        if (res.statusCode !== 200) {
          let data = "";
          res.on("data", (c) => (data += c));
          res.on("end", () =>
            reject(new Error("Cloudinary API " + res.statusCode + ": " + data.slice(0, 200)))
          );
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
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

  // Accept raw OR image-upload asset URLs; image-upload PDFs are still private on the
  // free plan, so both are proxied. Strips the optional version segment.
  const match = url.match(/\/(?:raw|image)\/upload\/(?:v\d+\/)?(.+?)(?:\?|$)/);
  if (!match) {
    return NextResponse.json({ error: "Invalid Cloudinary upload URL format" }, { status: 400 });
  }

  const publicId = match[1];

  try {
    const fileBuffer = await cloudinaryRawDownload(publicId);
    const filename = publicId.split("/").pop() || "download.pdf";

    return new NextResponse(new Uint8Array(fileBuffer), {
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
