"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X, FileText, CheckCircle, Loader2 } from "lucide-react";
import type { Project } from "@/data/projects";
import siteConfig from "@/config/site";
import { getBuilderById } from "@/data/builders";
import { getDownloadUrl } from "@/lib/download-url";

function generateBrochureHTML(project: Project): string {
  const builder = getBuilderById(project.builder);
  const builderName = builder?.name || "a reputed builder";
  const amenitiesHTML = project.amenities
    .map((a) => `<li style="padding:6px 0;border-bottom:1px solid #f3f4f6;font-size:14px;">${a}</li>`)
    .join("");

  const highlightsHTML = project.highlights
    .map((h) => `<li style="padding:4px 0;font-size:14px;color:#4b5563;">&#10003; ${h}</li>`)
    .join("");

  const locationHTML = project.locationAdvantages.length
    ? project.locationAdvantages
        .map((l) => `<li style="padding:4px 0;font-size:13px;color:#6b7280;">&#9679; ${l}</li>`)
        .join("")
    : "<li style='padding:4px 0;font-size:13px;color:#9ca3af;'>Contact us for location details</li>";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${project.name} — ${siteConfig.shortName}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Inter', sans-serif; color: #1a1a2e; background: #fff; }
  @media print {
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .no-print { display: none !important; }
    @page { margin: 0; size: A4; }
  }
  .cover { height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: linear-gradient(135deg, #09090f 0%, #1a1a2e 50%, #0f0f1a 100%); color: white; text-align: center; position: relative; overflow: hidden; page-break-after: always; }
  .cover::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 40%, rgba(249,115,22,0.08), transparent 50%); }
  .cover h1 { font-size: 48px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 12px; }
  .cover .subtitle { font-size: 18px; color: #F97316; font-weight: 500; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.15em; }
  .cover .location { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 40px; }
  .cover .badge { display: inline-block; padding: 8px 24px; border: 1px solid rgba(249,115,22,0.3); border-radius: 999px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.6); }
  .cover .logo { position: absolute; bottom: 40px; font-size: 14px; color: rgba(255,255,255,0.3); letter-spacing: 0.15em; text-transform: uppercase; }
  .section { padding: 60px 80px; page-break-inside: avoid; }
  .section-title { font-size: 24px; font-weight: 700; color: #09090f; margin-bottom: 8px; letter-spacing: -0.02em; }
  .section-line { width: 60px; height: 3px; background: #F97316; margin-bottom: 30px; border-radius: 2px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
  .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; }
  .card h4 { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #F97316; margin-bottom: 8px; font-weight: 600; }
  .card p { font-size: 22px; font-weight: 700; color: #09090f; }
  .amenities-list { list-style: none; columns: 2; column-gap: 30px; }
  .highlights-list { list-style: none; padding: 0; }
  .location-list { list-style: none; padding: 0; }
  .footer-band { background: #09090f; color: white; padding: 40px 80px; display: flex; justify-content: space-between; align-items: center; }
  .footer-band .brand { font-size: 20px; font-weight: 700; }
  .footer-band .brand span { color: #F97316; }
  .footer-band .contact { text-align: right; font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.8; }
  .print-btn { position: fixed; bottom: 30px; right: 30px; z-index: 999; padding: 16px 32px; background: #F97316; color: white; border: none; border-radius: 999px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 8px 30px rgba(249,115,22,0.3); transition: transform 0.2s; }
  .print-btn:hover { transform: scale(1.05); }
</style>
</head>
<body>
<button class="print-btn no-print" onclick="window.print()">Save as PDF</button>

<div class="cover">
  <div class="subtitle">Arjun Realty</div>
  <h1>${project.name}</h1>
  <div class="location">${project.location}</div>
  <div class="badge">${project.badge}</div>
  <div class="logo">${siteConfig.url.replace("https://", "")}</div>
</div>

<div class="section">
  <div class="section-title">Project Overview</div>
  <div class="section-line"></div>
  <p style="font-size:15px;color:#4b5563;line-height:1.8;margin-bottom:30px;">${project.name} is a ${project.projectType} located at ${project.location}. ${project.approval}. ${project.description || `A premium development by ${builderName} offering world-class infrastructure and modern amenities.`}</p>
  <div class="grid-3">
    <div class="card"><h4>Approval</h4><p style="font-size:16px;">${project.approval}</p></div>
    <div class="card"><h4>Plot Sizes</h4><p style="font-size:16px;">${project.plotSizes}</p></div>
    <div class="card"><h4>Price</h4><p style="font-size:16px;">${project.startingPrice}</p></div>
    ${project.projectArea ? `<div class="card"><h4>Project Area</h4><p style="font-size:16px;">${project.projectArea}</p></div>` : ""}
  </div>
</div>

<div class="section" style="background:#f9fafb;">
  <div class="section-title">Highlights</div>
  <div class="section-line"></div>
  <ul class="highlights-list">${highlightsHTML}</ul>
</div>

<div class="section">
  <div class="grid-2">
    <div>
      <div class="section-title">Amenities</div>
      <div class="section-line"></div>
      <ul class="amenities-list">${amenitiesHTML}</ul>
    </div>
    <div>
      <div class="section-title">Location Advantages</div>
      <div class="section-line"></div>
      <ul class="location-list">${locationHTML}</ul>
    </div>
  </div>
</div>

<div class="footer-band">
  <div class="brand">Arjun<span>Realty</span></div>
  <div class="contact">
    Premium Real Estate Advisory<br>
    ${siteConfig.contact.phone}<br>
    ${siteConfig.url.replace("https://", "")}
  </div>
</div>

</body>
</html>`;
}

interface BrochureDownloadProps {
  project: Project;
  variant?: "button" | "card";
  label?: string;
}

export default function BrochureDownload({ project, variant = "button", label = "Download Brochure" }: BrochureDownloadProps) {
  const [state, setState] = useState<"idle" | "generating" | "done">("idle");
  const [showModal, setShowModal] = useState(false);

  const hasPDF = project.brochureUrl && (project.brochureUrl.endsWith(".pdf") || project.brochureUrl.includes("raw/upload"));

  const handleDownload = () => {
    setState("generating");

    if (hasPDF) {
      const a = document.createElement("a");
      a.href = getDownloadUrl(project.brochureUrl);
      a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}-brochure.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setState("done");
      setTimeout(() => setState("idle"), 3000);
      return;
    }

    setTimeout(() => {
      const html = generateBrochureHTML(project);
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${project.name.replace(/\s+/g, "-").toLowerCase()}-brochure.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setState("done");
      setTimeout(() => setState("idle"), 3000);
    }, 800);
  };

  const handleViewInBrowser = () => {
    const html = generateBrochureHTML(project);
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  if (variant === "card") {
    return (
      <>
        <motion.button
          onClick={handleDownload}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 glass-card rounded-xl p-4 text-left group cursor-pointer"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300">
            {state === "generating" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : state === "done" ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <FileText className="h-5 w-5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">Project Brochure</p>
            <p className="text-xs text-white/30 mt-0.5">
              {state === "generating" ? "Generating..." : state === "done" ? "Downloaded!" : "Download PDF Brochure"}
            </p>
          </div>
          <Download className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors shrink-0" />
        </motion.button>

        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong rounded-3xl p-8 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-white/30 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Download Brochure</h3>
                <p className="text-sm text-white/40 mb-6">Get the complete project brochure for {project.name}</p>
                <div className="flex gap-3">
                  <button onClick={handleDownload} className="btn-premium flex-1 bg-gradient-to-r from-primary to-primary-dark py-3 rounded-full text-sm font-semibold text-white">
                    Download HTML
                  </button>
                  <button onClick={handleViewInBrowser} className="btn-glass flex-1 py-3 rounded-full text-sm font-semibold text-white/70">
                    View in Browser
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <motion.button
        onClick={handleDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-flex items-center gap-2.5 btn-glass px-6 py-3 rounded-full text-sm font-semibold text-white/70"
      >
        {state === "generating" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : state === "done" ? (
          <CheckCircle className="h-4 w-4 text-green-400" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {state === "generating" ? "Generating..." : state === "done" ? "Downloaded!" : label}
      </motion.button>
    </>
  );
}
