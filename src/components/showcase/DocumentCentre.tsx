"use client";

import {
  FileText,
  Download,
  ExternalLink,
  Map as MapIcon,
  LayoutDashboard,
  FolderOpen,
} from "lucide-react";
import ScrollReveal from "../ScrollReveal";
import SectionLabel from "../SectionLabel";
import BrochureDownload from "../BrochureDownload";
import { getDownloadUrl } from "@/lib/download-url";
import type { Project, ProjectDocument } from "@/data/projects";

interface DocItem {
  name: string;
  url?: string;
  description?: string;
  icon: React.ReactNode;
  kind: "image" | "pdf" | "link";
  alwaysShow?: boolean;
  custom?: React.ReactNode;
}

function ViewDownload({ url, kind }: { url: string; kind: "image" | "pdf" | "link" }) {
  const ext = url.toLowerCase().split("?")[0].slice(url.lastIndexOf("."));
  const isImage = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(ext);
  const isPdf = ext === ".pdf";
  const isExternal = /^https?:\/\//i.test(url);
  const downloadUrl = getDownloadUrl(url);

  if (isExternal) {
    return (
      <div className="flex items-center gap-2">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
        >
          <ExternalLink className="h-3 w-3" /> {isImage ? "View Image" : isPdf ? "Open PDF" : "Open"}
        </a>
        <a
          href={downloadUrl}
          download
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-semibold text-white/60 hover:border-primary/20 hover:text-primary transition-colors duration-300"
        >
          <Download className="h-3 w-3" /> Download
        </a>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={url}
        download
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/[0.08] border border-primary/15 text-[11px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
      >
        <Download className="h-3 w-3" /> Download
      </a>
    </div>
  );
}

export default function DocumentCentre({ project }: { project: Project }) {
  const docs: ProjectDocument[] = (project.documents || []).filter((d) => d.url);

  const items: DocItem[] = [];

  if (project.layoutPdfUrl) {
    items.push({
      name: "Layout Plan",
      url: project.layoutPdfUrl,
      description: "Detailed plot layout in PDF format.",
      icon: <LayoutDashboard className="h-5 w-5" />,
      kind: "pdf",
    });
  }

  if (project.masterPlanUrl) {
    items.push({
      name: "Master Plan",
      url: project.masterPlanUrl,
      description: "Master plan image of the project.",
      icon: <MapIcon className="h-5 w-5" />,
      kind: "image",
    });
  }

  if (project.locationMapUrl) {
    items.push({
      name: "Location Map",
      url: project.locationMapUrl,
      description: "Map showing the project location.",
      icon: <MapIcon className="h-5 w-5" />,
      kind: "image",
    });
  }

  const hasRealDocs = items.length > 0 || docs.length > 0;

  const hasUploadedBrochure = Boolean(project.brochureUrl && /\.pdf$/i.test(project.brochureUrl));

  return (
    <section className="pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <ScrollReveal>
          <SectionLabel>Brochure &amp; Documents</SectionLabel>
          <h2 className="mt-5 text-2xl font-bold tracking-tight mb-2">
            Documents &amp; <span className="text-gradient">Downloads</span>
          </h2>
          <p className="text-sm text-white/30 mb-8 max-w-xl">
            {hasRealDocs
              ? "View or download project documents anytime."
              : "Download the project brochure or request specific documents via WhatsApp."}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ScrollReveal>
            <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white truncate">Project Brochure</h3>
                  <p className="text-xs text-white/30 mt-0.5">
                    {hasUploadedBrochure ? "Official PDF · always available" : "Auto-generated · always available"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed mb-5 flex-1">
                Complete overview with highlights, amenities, plot sizes and location advantages.
              </p>
              <div className="space-y-2">
                {hasUploadedBrochure ? (
                  <>
                    <a
                      href={getDownloadUrl(project.brochureUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary/[0.08] border border-primary/15 text-[12px] font-semibold text-primary hover:bg-primary/[0.15] transition-colors duration-300"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View Brochure
                    </a>
                    <a
                      href={getDownloadUrl(project.brochureUrl)}
                      download
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[12px] font-semibold text-white/60 hover:border-primary/20 hover:text-primary transition-colors duration-300"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Brochure
                    </a>
                  </>
                ) : (
                  <BrochureDownload project={project} variant="card" />
                )}
              </div>
            </div>
          </ScrollReveal>

          {docs.map((d, i) => (
            <ScrollReveal key={d.name} delay={0.05 * (i + 1)}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FolderOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{d.name}</h3>
                    {d.description && (
                      <p className="text-xs text-white/30 mt-0.5 truncate">{d.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex-1" />
                <div className="flex justify-end">
                  <ViewDownload url={d.url} kind={d.type === "pdf" ? "pdf" : "link"} />
                </div>
              </div>
            </ScrollReveal>
          ))}

          {items.map((item, i) => (
            <ScrollReveal key={item.name} delay={0.05 * (i + 1)}>
              <div className="glass-card rounded-2xl p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-white truncate">{item.name}</h3>
                    {item.description && (
                      <p className="text-xs text-white/30 mt-0.5 truncate">{item.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex-1" />
                {item.url ? (
                  <div className="flex justify-end">
                    <ViewDownload url={item.url} kind={item.kind} />
                  </div>
                ) : null}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
