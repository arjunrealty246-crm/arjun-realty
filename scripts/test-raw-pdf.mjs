import { v2 as cloudinary } from "cloudinary";
import https from "https";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testRawPdfUpload() {
  const timestamp = Math.round(Date.now() / 1000);
  const publicId = "uploads/test-raw-pdf-" + timestamp + ".pdf";
  const folder = "arjun-realty";

  const paramsToSign = { folder, public_id: publicId, timestamp };
  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);

  // Create a small valid PDF
  const pdfBuffer = Buffer.from("%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\nxref\n0 4\ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n0\n%%EOF");

  const boundary = "----RawBoundary" + Math.random().toString(36).slice(2);
  const parts = [
    Buffer.from("--" + boundary + "\r\nContent-Disposition: form-data; name=\"file\"; filename=\"test.pdf\"\r\nContent-Type: application/pdf\r\n\r\n", "utf8"),
    pdfBuffer,
    Buffer.from("\r\n--" + boundary + "\r\nContent-Disposition: form-data; name=\"api_key\"\r\n\r\n" + process.env.CLOUDINARY_API_KEY, "utf8"),
    Buffer.from("\r\n--" + boundary + "\r\nContent-Disposition: form-data; name=\"timestamp\"\r\n\r\n" + timestamp, "utf8"),
    Buffer.from("\r\n--" + boundary + "\r\nContent-Disposition: form-data; name=\"signature\"\r\n\r\n" + signature, "utf8"),
    Buffer.from("\r\n--" + boundary + "\r\nContent-Disposition: form-data; name=\"folder\"\r\n\r\n" + folder, "utf8"),
    Buffer.from("\r\n--" + boundary + "\r\nContent-Disposition: form-data; name=\"public_id\"\r\n\r\n" + publicId, "utf8"),
    Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
  ];
  const body = Buffer.concat(parts);

  const result = await new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.cloudinary.com",
      path: "/v1_1/" + process.env.CLOUDINARY_CLOUD_NAME + "/raw/upload",
      method: "POST",
      headers: { "Content-Type": "multipart/form-data; boundary=" + boundary, "Content-Length": body.length },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { resolve({ error: data }); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });

  if (result.secure_url) {
    console.log("RAW PDF upload: SUCCESS");
    console.log("  URL:", result.secure_url);
    console.log("  Public ID:", result.public_id);
    console.log("  Bytes:", result.bytes);
    console.log("  Resource Type:", result.resource_type);
    await cloudinary.uploader.destroy(result.public_id, { resource_type: "raw" });
    console.log("  Cleaned up");
    return true;
  } else {
    console.log("RAW PDF upload FAILED:", JSON.stringify(result));
    return false;
  }
}

const ok = await testRawPdfUpload();
console.log(ok ? "\nPDF direct upload to Cloudinary raw endpoint: WORKS" : "\nPDF upload: FAILED");
process.exit(ok ? 0 : 1);
