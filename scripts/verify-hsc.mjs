const BASE = "http://localhost:3001";

async function test() {
  // Test 1: Page loads
  console.log("=== 1. PAGE LOAD ===");
  const pageRes = await fetch(BASE + "/projects/jb-hillside-county");
  console.log("Status:", pageRes.status);
  const html = await pageRes.text();
  console.log("HTML length:", html.length);

  // Test 2: Testimonials visible
  console.log("\n=== 2. TESTIMONIALS ===");
  const names = ["Venugopal Reddy", "Sandhya", "Jeevana", "Krishna", "Shiva", "Uddesh"];
  for (const name of names) {
    console.log(name + ":", html.includes(name) ? "FOUND" : "MISSING");
  }
  console.log("Has 'Testimonials' section label:", html.includes("Testimonials") || html.includes("testimonial") || html.includes("What People Say") || html.includes("Customer"));

  // Test 3: PDF Download links
  console.log("\n=== 3. PDF DOWNLOAD LINKS ===");
  console.log("Has /api/download proxy links:", html.includes("/api/download"));
  console.log("Has View Brochure:", html.includes("View Brochure"));
  console.log("Has Download Brochure:", html.includes("Download Brochure"));

  // Test 4: Check download proxy route
  console.log("\n=== 4. DOWNLOAD PROXY ===");
  const brochureUrl = "https://res.cloudinary.com/p4wbf1mp/raw/upload/v1787051830/arjun-realty/uploads/projects/1787052603-HillCountyLPNumber.pdf";
  const proxyUrl = BASE + "/api/download?url=" + encodeURIComponent(brochureUrl);
  try {
    const proxyRes = await fetch(proxyUrl, { redirect: "manual" });
    console.log("Proxy status:", proxyRes.status);
    console.log("Proxy location:", proxyRes.headers.get("location") || "none");
    const isSigned = (proxyRes.headers.get("location") || "").includes("signature=");
    console.log("Redirects to signed URL:", isSigned ? "YES" : "NO");

    if (isSigned) {
      const signedUrl = proxyRes.headers.get("location");
      const pdfRes = await fetch(signedUrl);
      console.log("Signed URL fetch status:", pdfRes.status);
      console.log("Content-Type:", pdfRes.headers.get("content-type"));
      const pdfBuf = Buffer.from(await pdfRes.arrayBuffer());
      console.log("PDF size:", (pdfRes.headers.get("content-length") || pdfBuf.length) + " bytes");
      console.log("Starts with %PDF:", pdfBuf.slice(0, 5).toString() === "%PDF-");
    }
  } catch (e) {
    console.log("Proxy error:", e.message);
  }

  // Test 5: Layout PDF proxy
  console.log("\n=== 5. LAYOUT PDF PROXY ===");
  const layoutUrl = "https://res.cloudinary.com/p4wbf1mp/raw/upload/v1787051442/arjun-realty/uploads/projects/1787052214-HillSideCountyLayout_28_10_2022.pdf";
  const layoutProxy = BASE + "/api/download?url=" + encodeURIComponent(layoutUrl);
  try {
    const lr = await fetch(layoutProxy, { redirect: "manual" });
    console.log("Layout proxy status:", lr.status);
    const signedLoc = lr.headers.get("location") || "";
    console.log("Redirects to signed URL:", signedLoc.includes("signature="));
    if (signedLoc.includes("signature=")) {
      const fileRes = await fetch(signedLoc);
      console.log("File fetch status:", fileRes.status);
      console.log("Content-Type:", fileRes.headers.get("content-type"));
      const buf = Buffer.from(await fileRes.arrayBuffer());
      console.log("File size:", buf.length, "bytes");
      console.log("Starts with %PDF:", buf.slice(0, 5).toString() === "%PDF-");
    }
  } catch (e) {
    console.log("Error:", e.message);
  }

  // Test 6: Master Plan proxy
  console.log("\n=== 6. MASTER PLAN PROXY ===");
  const mpUrl = "https://res.cloudinary.com/p4wbf1mp/raw/upload/v1787051449/arjun-realty/uploads/projects/1787052221-052008_SMD_LT_U6_HMDA_29012022.pdf";
  const mpProxy = BASE + "/api/download?url=" + encodeURIComponent(mpUrl);
  try {
    const mr = await fetch(mpProxy, { redirect: "manual" });
    console.log("MP proxy status:", mr.status);
    const signedLoc = mr.headers.get("location") || "";
    console.log("Redirects to signed URL:", signedLoc.includes("signature="));
    if (signedLoc.includes("signature=")) {
      const fileRes = await fetch(signedLoc);
      console.log("File fetch status:", fileRes.status);
      console.log("Content-Type:", fileRes.headers.get("content-type"));
      const buf = Buffer.from(await fileRes.arrayBuffer());
      console.log("File size:", buf.length, "bytes");
      console.log("Starts with %PDF:", buf.slice(0, 5).toString() === "%PDF-");
    }
  } catch (e) {
    console.log("Error:", e.message);
  }

  // Test 7: JB Harmony Woods unchanged
  console.log("\n=== 7. JB HARMONY WOODS UNCHANGED ===");
  const jbhRes = await fetch(BASE + "/api/projects");
  const projects = await jbhRes.json();
  const jbh = projects.find(p => p.slug === "jb-harmony-woods");
  console.log("JBH image local:", jbh.image.startsWith("/"));
  console.log("JBH heroVideo local:", jbh.heroVideo.startsWith("/"));
  console.log("JBH brochure local:", jbh.brochureUrl.startsWith("/"));
  const hsc = projects.find(p => p.slug === "jb-hillside-county");
  console.log("HSC brochureUrl:", hsc.brochureUrl.includes("HillCountyLPNumber") ? "CORRECT" : "WRONG");
}

test().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
