"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { uploadWithProgress } from "@/lib/client-upload";
import { compressLargeVideo, VideoCompressError } from "@/lib/video-compress";

interface ProjectFormData {
  name: string;
  slug: string;
  builder: string;
  marketingPartner: string;
  projectType: string;
  approval: string;
  location: string;
  mapsUrl: string;
  price: string;
  startingPrice: string;
  status: string;
  badge: string;
  isUpcoming: boolean;
  totalAcres: string;
  totalPlots: string;
  plotSizes: string;
  clubhouseDetails: string;
  heroVideo: string;
  videoUrl: string;
  droneVideoUrl: string;
  brochureUrl: string;
  layoutPdfUrl: string;
  layoutUrl: string;
  masterPlanUrl: string;
  locationMapUrl: string;
  image: string;
  bankLoanAvailable: boolean;
  siteVisitBooking: boolean;
  whatsappCta: string;
  projectArea: string;
  amenities: string[];
  highlights: string[];
  locationAdvantages: string[];
  whyInvest: string[];
  investmentHighlights: string[];
  connectivity: string[];
  nearbyLandmarks: string[];
  usps: string[];
  faqs: { q: string; a: string }[];
  testimonials: { name: string; text: string }[];
  gallery: { src: string; title: string; category: string; type: string }[];
  developmentUpdates: { date: string; title: string; description: string; images: string[] }[];
  documents: { name: string; url: string; type: string; description: string }[];
  updates: { title: string; description: string; status: string }[];
}

const emptyForm: ProjectFormData = {
  name: "", slug: "", builder: "", marketingPartner: "", projectType: "",
  approval: "", location: "", mapsUrl: "", price: "", startingPrice: "",
  status: "Live", badge: "Live", isUpcoming: false, totalAcres: "", totalPlots: "",
  plotSizes: "", clubhouseDetails: "", heroVideo: "", videoUrl: "", droneVideoUrl: "", brochureUrl: "", layoutPdfUrl: "",
  layoutUrl: "", masterPlanUrl: "", locationMapUrl: "", image: "",
  bankLoanAvailable: true, siteVisitBooking: true, whatsappCta: "", projectArea: "",
  amenities: [], highlights: [], locationAdvantages: [], whyInvest: [],
  investmentHighlights: [], connectivity: [], nearbyLandmarks: [], usps: [],
  faqs: [], testimonials: [], gallery: [], developmentUpdates: [], documents: [], updates: [],
};

export default function ProjectForm({ projectId }: { projectId?: string | null }) {
  const router = useRouter();
  const isEdit = !!projectId;
  const [form, setForm] = useState<ProjectFormData>(emptyForm);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newAmenity, setNewAmenity] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newAdvantage, setNewAdvantage] = useState("");
  const [newWhyInvest, setNewWhyInvest] = useState("");
  const [newFaqQ, setNewFaqQ] = useState("");
  const [newFaqA, setNewFaqA] = useState("");
  const [newTestName, setNewTestName] = useState("");
  const [newTestText, setNewTestText] = useState("");
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [videoUploadStatus, setVideoUploadStatus] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const lastUploadErrorRef = useRef<string>("");

  useEffect(() => {
    if (!projectId) { setLoading(false); return; }
    fetch(`/api/projects/${projectId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data._id) {
          const { _id, createdAt, updatedAt, __v, sortOrder, ...rest } = data;
          setForm({ ...emptyForm, ...rest });
        }
        setLoading(false);
      })
      .catch(() => { setError("Failed to load project"); setLoading(false); });
  }, [projectId]);

  const update = (field: string, value: unknown) => setForm((f) => ({ ...f, [field]: value }));

  const addItem = (field: "amenities" | "highlights" | "locationAdvantages" | "whyInvest" | "investmentHighlights" | "connectivity" | "nearbyLandmarks" | "usps", value: string) => {
    if (!value.trim()) return;
    setForm((f) => ({ ...f, [field]: [...f[field], value.trim()] }));
  };

  const removeItem = (field: "amenities" | "highlights" | "locationAdvantages" | "whyInvest" | "investmentHighlights" | "connectivity" | "nearbyLandmarks" | "usps", index: number) => {
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));
  };

  const addFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) return;
    setForm((f) => ({ ...f, faqs: [...f.faqs, { q: newFaqQ.trim(), a: newFaqA.trim() }] }));
    setNewFaqQ(""); setNewFaqA("");
  };

  const addTestimonial = () => {
    if (!newTestName.trim() || !newTestText.trim()) return;
    setForm((f) => ({ ...f, testimonials: [...f.testimonials, { name: newTestName.trim(), text: newTestText.trim() }] }));
    setNewTestName(""); setNewTestText("");
  };

  const updateArrayItem = (field: "gallery" | "developmentUpdates" | "documents" | "updates", index: number, patch: Record<string, unknown>) => {
    setForm((f) => ({ ...f, [field]: f[field].map((item, i) => (i === index ? { ...item, ...patch } : item)) }));
  };

  const removeArrayItem = (field: "gallery" | "developmentUpdates" | "documents" | "updates", index: number) => {
    setForm((f) => ({ ...f, [field]: f[field].filter((_, i) => i !== index) }));
  };

  const handleFileUpload = async (file: File, folder: string, fieldName?: string) => {
    if (fieldName) setUploadingField(fieldName);
    setUploadError("");
    setUploadProgress(0);
    setUploadStatus("");
    try {
      const url = await uploadWithProgress(
        file,
        folder,
        (ratio) => setUploadProgress(Math.round(ratio * 100)),
        (status) => setUploadStatus(status)
      );
      setUploadProgress(null);
      setUploadStatus("");
      if (url && fieldName) {
        setUploadSuccess(`${fieldName} uploaded successfully.`);
      }
      return url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed";
      lastUploadErrorRef.current = msg;
      setUploadError(msg);
      setUploadProgress(null);
      setUploadStatus("");
      return "";
    } finally {
      if (fieldName) setUploadingField(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.currentTarget.value = "";
    const url = await handleFileUpload(file, "uploads/projects", "image");
    if (!url) {
      alert(`Upload failed: ${lastUploadErrorRef.current || "Unknown error"}`);
      return;
    }
    update("image", url);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.currentTarget.value = "";
    const HUNDRED_MB = 100 * 1024 * 1024;
    const isLarge = file.size >= HUNDRED_MB;

    let fileToUpload = file;
    setUploadingField("heroVideo");
    setUploadProgress(null);
    setUploadError("");
    try {
      if (isLarge) {
        setVideoUploadStatus(`Video is larger than 100 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB). Compressing...`);
        fileToUpload = await compressLargeVideo(file);
        setVideoUploadStatus("Compression complete. Uploading...");
      }
    } catch (err) {
      const msg = err instanceof VideoCompressError ? err.message : err instanceof Error ? err.message : "Video compression failed";
      lastUploadErrorRef.current = msg;
      setUploadingField(null);
      setVideoUploadStatus(null);
      alert(`Video upload failed: ${msg}`);
      return;
    }

    const url = await handleFileUpload(fileToUpload, "uploads/projects", "heroVideo");
    setVideoUploadStatus(url ? "Upload complete." : null);
    if (url) {
      update("heroVideo", url);
      setTimeout(() => setVideoUploadStatus(null), 3000);
    } else {
      alert(`Upload failed: ${lastUploadErrorRef.current || "Unknown error"}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError("");

    if (!form.name || !form.slug) {
      setError("Name and Slug are required"); setSaving(false); return;
    }

    try {
      const payload = {
        ...form,
        image: (form.image || "").trim(),
        heroVideo: (form.heroVideo || "").trim(),
        videoUrl: (form.videoUrl || "").trim(),
        droneVideoUrl: (form.droneVideoUrl || "").trim(),
        brochureUrl: (form.brochureUrl || "").trim(),
        layoutPdfUrl: (form.layoutPdfUrl || "").trim(),
        layoutUrl: (form.layoutUrl || "").trim(),
        masterPlanUrl: (form.masterPlanUrl || "").trim(),
        locationMapUrl: (form.locationMapUrl || "").trim(),
        gallery: form.gallery.map((g) => ({ ...g, src: (g.src || "").trim(), type: (g.type || "").trim() })),
        developmentUpdates: form.developmentUpdates.map((d) => ({ ...d, images: (d.images || []).map((img) => img.trim()).filter(Boolean) })),
        documents: form.documents.map((d) => ({ ...d, url: (d.url || "").trim() })),
      };
      const url = isEdit ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        router.push("/admin/projects");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Failed to save project");
    }
    setSaving(false);
  };

  const generateSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const renderArrayField = (label: string, field: "amenities" | "highlights" | "locationAdvantages" | "whyInvest" | "investmentHighlights" | "connectivity" | "nearbyLandmarks" | "usps", inputVal: string, setInput: (v: string) => void, placeholder: string) => (
    <div>
      <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">{label}</label>
      <div className="flex gap-2 mb-2">
        <input type="text" value={inputVal} onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
          placeholder={placeholder} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(field, inputVal); } }} />
        <button type="button" onClick={() => addItem(field, inputVal)}
          className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all">
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {form[field].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-white/50">
            {item}
            <button type="button" onClick={() => removeItem(field, i)} className="text-white/20 hover:text-red-400 transition-colors">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );

  const renderFileField = (label: string, field: "brochureUrl" | "layoutPdfUrl" | "layoutUrl" | "masterPlanUrl" | "locationMapUrl", accept: string, folder: string, placeholder: string, pdfOnly?: boolean) => (
    <div>
      <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">{label}</label>
      <div className="flex gap-2">
        <input type="text" value={form[field]} onChange={(e) => update(field, e.target.value)}
          className="flex-1 min-w-0 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
          placeholder={placeholder} />
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all shrink-0">
          {uploadingField === field ? (
            <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )} Upload
          <input type="file" accept={accept} className="hidden" disabled={uploadingField === field}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              if (pdfOnly && !/\.pdf$/i.test(file.name) && file.type !== "application/pdf") {
                setUploadError("Please select a PDF brochure.");
                e.currentTarget.value = "";
                return;
              }
              e.currentTarget.value = "";
              const url = await handleFileUpload(file, folder, field);
              if (url) {
                update(field, url);
              }
            }} />
        </label>
      </div>
    </div>
  );

  const renderFileRow = (label: string, value: string, onChange: (v: string) => void, accept: string, folder: string, placeholder: string, fieldName?: string) => (
    <div>
      <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">{label}</label>
      <div className="flex gap-2">
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
          className="flex-1 min-w-0 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
          placeholder={placeholder} />
        <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all shrink-0">
          {fieldName && uploadingField === fieldName ? (
            <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          ) : (
            <Upload className="h-3.5 w-3.5" />
          )} Upload
          <input type="file" accept={accept} className="hidden" disabled={fieldName ? uploadingField === fieldName : false}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              e.currentTarget.value = "";
              const url = await handleFileUpload(file, folder, fieldName);
              if (url) onChange(url);
            }} />
        </label>
      </div>
    </div>
  );

  return (
    <div>
      <input type="file" ref={imageInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" tabIndex={-1} />
      <input type="file" ref={videoInputRef} accept="video/*" onChange={handleVideoUpload} className="hidden" tabIndex={-1} />
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/projects" className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.07] transition-all">
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{isEdit ? "Edit Project" : "New Project"}</h1>
          <p className="text-sm text-white/30 mt-1">{isEdit ? `Editing ${form.name}` : "Create a new real estate project"}</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
      )}

      {uploadError && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-sm text-amber-400 flex items-center justify-between">
          <span>Upload error: {uploadError}</span>
          <button type="button" onClick={() => setUploadError("")} className="text-amber-400/60 hover:text-amber-400 ml-3">Dismiss</button>
        </div>
      )}

      {uploadSuccess && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 flex items-center justify-between">
          <span>{uploadSuccess}</span>
          <button type="button" onClick={() => setUploadSuccess(null)} className="text-emerald-400/60 hover:text-emerald-400 ml-3">Dismiss</button>
        </div>
      )}

      {uploadProgress !== null && (
        <div className="mb-6 px-5 py-3.5 rounded-xl bg-primary/[0.06] border border-primary/20">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs font-semibold text-white">
              {uploadStatus
                ? uploadStatus
                : uploadProgress > 0
                  ? `Uploading${uploadingField ? ` — ${uploadingField}` : ""}… ${uploadProgress}%`
                  : "Preparing file (compressing images, verifying size)…"}
            </span>
            <span className="text-[11px] text-white/35 font-mono">{uploadProgress}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark transition-[width] duration-200"
              style={{ width: `${Math.max(uploadProgress, 2)}%` }}
            />
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project Name *</label>
              <input type="text" required value={form.name} onChange={(e) => { const v = e.target.value; update("name", v); if (!isEdit) update("slug", generateSlug(v)); }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="JB Harmony Woods" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Slug *</label>
              <input type="text" required value={form.slug} onChange={(e) => update("slug", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                placeholder="jb-harmony-woods" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Builder ID</label>
              <input type="text" value={form.builder} onChange={(e) => update("builder", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="jb-infra" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Marketing Partner</label>
              <input type="text" value={form.marketingPartner} onChange={(e) => update("marketingPartner", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="JB Infra Group" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project Type</label>
              <input type="text" value={form.projectType} onChange={(e) => update("projectType", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="Premium Villa Plotting & Boutique Villas" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Approval</label>
              <select value={form.approval} onChange={(e) => update("approval", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                <option value="" className="bg-charcoal-dark">Select Approval Status</option>
                <option value="FCDA Approved" className="bg-charcoal-dark">FCDA Approved</option>
                <option value="HMDA Approved · RERA Registered" className="bg-charcoal-dark">HMDA Approved · RERA Registered</option>
                <option value="HMDA Approved · TSRERA Registered" className="bg-charcoal-dark">HMDA Approved · TSRERA Registered</option>
                <option value="DTCP Approved" className="bg-charcoal-dark">DTCP Approved</option>
                <option value="DTCP Approved · RERA Registered" className="bg-charcoal-dark">DTCP Approved · RERA Registered</option>
                <option value="HMDA Approval Under Process" className="bg-charcoal-dark">HMDA Approval Under Process</option>
                <option value="DTCP (Under Approval)" className="bg-charcoal-dark">DTCP (Under Approval)</option>
                <option value="DTCP & RERA Under Process" className="bg-charcoal-dark">DTCP &amp; RERA Under Process</option>
                <option value="Approval Process Underway" className="bg-charcoal-dark">Approval Process Underway</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                <option value="Live" className="bg-charcoal-dark">Live</option>
                <option value="Pre-Launch" className="bg-charcoal-dark">Pre-Launch</option>
                <option value="Upcoming" className="bg-charcoal-dark">Upcoming</option>
                <option value="Coming Soon" className="bg-charcoal-dark">Coming Soon</option>
                <option value="Sold Out" className="bg-charcoal-dark">Sold Out</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Badge</label>
              <input type="text" value={form.badge} onChange={(e) => update("badge", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="Bookings Open" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Location</label>
              <input type="text" value={form.location} onChange={(e) => update("location", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="Thummaloor, Future City Growth Corridor, Hyderabad" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Maps URL</label>
              <input type="text" value={form.mapsUrl} onChange={(e) => update("mapsUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                placeholder="https://maps.google.com/..." />
            </div>
          </div>
        </div>

        {/* Pricing & Size */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Pricing &amp; Size</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Price</label>
              <input type="text" value={form.price} onChange={(e) => update("price", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="₹25,000/Sq. Yd" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Starting Price</label>
              <input type="text" value={form.startingPrice} onChange={(e) => update("startingPrice", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="Contact for Price" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project Area</label>
              <input type="text" value={form.projectArea} onChange={(e) => update("projectArea", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="53 Acres" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Total Acres</label>
              <input type="text" value={form.totalAcres} onChange={(e) => update("totalAcres", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="53" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Total Plots</label>
              <input type="text" value={form.totalPlots} onChange={(e) => update("totalPlots", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="574" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Plot Sizes</label>
              <input type="text" value={form.plotSizes} onChange={(e) => update("plotSizes", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="200 - 600 Sq. Yards" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Clubhouse Details</label>
              <input type="text" value={form.clubhouseDetails} onChange={(e) => update("clubhouseDetails", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="30,000 Sq. Ft. Grand Clubhouse" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">WhatsApp CTA</label>
              <input type="text" value={form.whatsappCta} onChange={(e) => update("whatsappCta", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" placeholder="Get Harmony Woods Details" />
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.bankLoanAvailable} onChange={(e) => update("bankLoanAvailable", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.04] text-primary focus:ring-primary/30" />
              <span className="text-sm text-white/50">Bank Loan Available</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.siteVisitBooking} onChange={(e) => update("siteVisitBooking", e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-white/[0.04] text-primary focus:ring-primary/30" />
              <span className="text-sm text-white/50">Site Visit Booking</span>
            </label>
          </div>
        </div>

        {/* Hero Image */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Hero Image</h2>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              disabled={uploadingField === "image"}
              className="h-24 w-36 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-primary/30 transition-all group shrink-0"
              title="Click to upload a new hero image"
            >
              <Upload className="h-6 w-6 text-white/15 group-hover:text-primary/50 transition-colors" />
              {form.image ? (
                <img src={form.image} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(e) => e.currentTarget.remove()} />
              ) : null}
              {uploadingField === "image" && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <span className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-[10px] font-semibold text-white font-mono">{uploadProgress ?? 0}%</span>
                </div>
              )}
            </button>
            <div className="flex-1">
              <input type="text" value={form.image} onChange={(e) => update("image", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs mb-2"
                placeholder="https://res.cloudinary.com/.../image/upload/... or /images/projects/hero.svg" />
              <button
                type="button"
                onClick={() => imageInputRef.current?.click()}
                disabled={uploadingField === "image"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all disabled:opacity-60"
              >
                {uploadingField === "image" ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Uploading… {uploadProgress ?? 0}%
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" /> Upload Image
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Hero Video */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Hero Drone Video</h2>
          <p className="text-xs text-white/30 mb-4">
            Upload a drone walkthrough video to display as the hero background. If unavailable, the hero image is shown instead.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => videoInputRef.current?.click()}
              disabled={uploadingField === "heroVideo"}
              className="h-24 w-36 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden relative cursor-pointer hover:border-primary/30 transition-all group shrink-0"
              title="Click to upload a new hero drone video"
            >
              <Upload className="h-6 w-6 text-white/15 group-hover:text-primary/50 transition-colors" />
              {form.heroVideo ? (
                <video src={form.heroVideo} className="absolute inset-0 h-full w-full object-cover" muted onError={(e) => e.currentTarget.remove()} />
              ) : null}
              {uploadingField === "heroVideo" && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <span className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  <span className="text-[10px] font-semibold text-white font-mono">{uploadProgress ?? 0}%</span>
                </div>
              )}
            </button>
            <div className="flex-1">
              <input type="text" value={form.heroVideo} onChange={(e) => update("heroVideo", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs mb-2"
                placeholder="https://res.cloudinary.com/.../video/upload/... or /videos/projects/.../drone.mp4" />
              <button
                type="button"
                onClick={() => videoInputRef.current?.click()}
                disabled={uploadingField === "heroVideo"}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all disabled:opacity-60"
              >
                {uploadingField === "heroVideo" ? (
                  <>
                    <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    {videoUploadStatus && videoUploadStatus.startsWith("Video is larger") ? "Compressing…" : uploadProgress !== null ? `Uploading… ${uploadProgress}%` : "Processing…"}
                  </>
                ) : (
                  <>
                    <Upload className="h-3.5 w-3.5" /> Upload Video
                  </>
                )}
              </button>
              <p className="text-[11px] text-primary/70 mt-1.5 min-h-[1em]">
                {videoUploadStatus || (uploadingField === "heroVideo" && uploadProgress === null ? "Processing video…" : "")}
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Drone Video Embed URL (YouTube / Vimeo) — for large videos</label>
              <input type="text" value={form.droneVideoUrl} onChange={(e) => update("droneVideoUrl", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                placeholder="https://www.youtube.com/embed/VIDEO_ID  or  https://player.vimeo.com/video/VIDEO_ID" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project Video URL</label>
              <input type="text" value={form.videoUrl} onChange={(e) => update("videoUrl", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                placeholder="https://www.youtube.com/embed/VIDEO_ID" />
            </div>
          </div>
          <p className="mt-3 text-[11px] text-white/25">
            Videos over 100 MB are automatically compressed in your browser and uploaded as MP4. Videos under 100 MB upload as-is. Large images (brochure scans, aerial photos) are auto-compressed to WebP on upload.
          </p>
        </div>

        {/* Documents */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Documents &amp; Media URLs</h2>
          <p className="text-xs text-white/30 mb-4">Upload files or paste existing URLs. Layout &amp; Master Plan power the site's layout gallery tab; Location Map shows the project on a map.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderFileField("Brochure URL", "brochureUrl", ".pdf,application/pdf", "uploads/projects", "Paste a URL or upload a PDF (max 10 MB)", true)}
            {renderFileField("Layout PDF URL", "layoutPdfUrl", ".pdf,application/pdf", "uploads/projects", "Paste a URL or upload a PDF (max 10 MB)", true)}
            {renderFileField("Layout Image URL", "layoutUrl", "image/*,.pdf", "uploads/projects", "Paste a URL or upload an image / PDF")}
            {renderFileField("Master Plan URL", "masterPlanUrl", "image/*,.pdf", "uploads/projects", "Paste a URL or upload an image / PDF")}
            {renderFileField("Location Map URL", "locationMapUrl", "image/*,.pdf", "uploads/projects", "Paste a URL or upload an image / PDF")}
          </div>
        </div>

        {/* Gallery */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Gallery</h2>
          <p className="text-xs text-white/30 mb-4">Photos &amp; videos shown in the project gallery grid. First item is the hero tile. Supports images (JPG, PNG, WebP) and videos (MP4, WebM). Captions &amp; categories appear on hover and in the lightbox.</p>
          <div className="space-y-4">
            {form.gallery.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="h-20 w-28 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0 relative">
                  <Upload className="h-6 w-6 text-white/15" />
                  {item.src ? (
                    item.type === "video" ? (
                      <video src={item.src} className="absolute inset-0 h-full w-full object-cover" muted preload="metadata" onError={(e) => e.currentTarget.remove()} />
                    ) : (
                      <img src={item.src} alt="" className="absolute inset-0 h-full w-full object-cover" onError={(e) => e.currentTarget.remove()} />
                    )
                  ) : null}
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 w-full min-w-0">
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Photo or Video</label>
                    <div className="flex gap-2">
                      <input type="text" value={item.src} onChange={(e) => updateArrayItem("gallery", i, { src: e.target.value })}
                        className="flex-1 min-w-0 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                        placeholder="/uploads/projects/photo.jpg" />
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all shrink-0">
                        {uploadingField === `gallery-${i}` ? (
                          <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        ) : (
                          <Upload className="h-3.5 w-3.5" />
                        )} Upload
                        <input type="file" accept="image/*,video/mp4,video/webm" className="hidden" disabled={uploadingField === `gallery-${i}`}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            e.currentTarget.value = "";

                            const HUNDRED_MB = 100 * 1024 * 1024;
                            const isVideo = file.type.startsWith("video/");
                            const isLarge = isVideo && file.size >= HUNDRED_MB;

                            let fileToUpload = file;
                            if (isLarge) {
                              setUploadingField(`gallery-${i}`);
                              setVideoUploadStatus(`Video is larger than 100 MB (${(file.size / (1024 * 1024)).toFixed(1)} MB). Compressing...`);
                              try {
                                fileToUpload = await compressLargeVideo(file);
                                setVideoUploadStatus("Compression complete. Uploading...");
                              } catch (err) {
                                const msg = err instanceof VideoCompressError ? err.message : err instanceof Error ? err.message : "Video compression failed";
                                lastUploadErrorRef.current = msg;
                                setUploadingField(null);
                                setVideoUploadStatus(null);
                                alert(`Video upload failed: ${msg}`);
                                return;
                              }
                            }

                            const url = await handleFileUpload(fileToUpload, "uploads/projects", `gallery-${i}`);
                            setVideoUploadStatus(null);
                            if (url) {
                              updateArrayItem("gallery", i, { src: url, type: isVideo ? "video" : "image" });
                            }
                          }} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Caption</label>
                    <input type="text" value={item.title || ""} onChange={(e) => updateArrayItem("gallery", i, { title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                      placeholder="Project Aerial View" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Category</label>
                    <input type="text" value={item.category || ""} onChange={(e) => updateArrayItem("gallery", i, { category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                      placeholder="Site / Clubhouse / Aerial" />
                  </div>
                </div>
                <button type="button" onClick={() => removeArrayItem("gallery", i)}
                  className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setForm((f) => ({ ...f, gallery: [...f.gallery, { src: "", title: "", category: "", type: "image" }] }))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all">
              <Plus className="h-3.5 w-3.5" /> Add Media
            </button>
          </div>
        </div>

        {/* Development Updates */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Development Updates</h2>
          <p className="text-xs text-white/30 mb-4">Dated site progress updates shown in the construction updates timeline.</p>
          <div className="space-y-6">
            {form.developmentUpdates.map((u, i) => (
              <div key={i} className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Date</label>
                    <input type="text" value={u.date || ""} onChange={(e) => updateArrayItem("developmentUpdates", i, { date: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                      placeholder="15 Jan 2026" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Title</label>
                    <input type="text" value={u.title || ""} onChange={(e) => updateArrayItem("developmentUpdates", i, { title: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                      placeholder="Site leveling & compound wall in progress" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Description</label>
                  <textarea value={u.description || ""} onChange={(e) => updateArrayItem("developmentUpdates", i, { description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 min-h-[60px]"
                    placeholder="What's happening at the site..." />
                </div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {((u.images as string[]) || []).map((img, j) => (
                      <div key={j} className="relative h-16 w-20 rounded-lg bg-white/[0.03] border border-white/[0.06] overflow-hidden group">
                        <img src={img} alt="" className="h-full w-full object-cover" />
                        <button type="button" onClick={() => updateArrayItem("developmentUpdates", i, { images: (u.images as string[]).filter((_, k) => k !== j) })}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ))}
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/10 border border-primary/20 text-[11px] font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all">
                      {uploadingField === `devUpdate-${i}` ? (
                        <span className="h-3.5 w-3.5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                      ) : (
                        <Upload className="h-3.5 w-3.5" />
                      )} Add Photo
                      <input type="file" accept="image/*" className="hidden" disabled={uploadingField === `devUpdate-${i}`}
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          e.currentTarget.value = "";
                          const url = await handleFileUpload(file, "uploads/projects", `devUpdate-${i}`);
                          if (url) updateArrayItem("developmentUpdates", i, { images: [...((u.images as string[]) || []), url] });
                        }} />
                    </label>
                  </div>
                  <button type="button" onClick={() => removeArrayItem("developmentUpdates", i)}
                    className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => setForm((f) => ({ ...f, developmentUpdates: [...f.developmentUpdates, { date: "", title: "", description: "", images: [] }] }))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all">
              <Plus className="h-3.5 w-3.5" /> Add Update
            </button>
          </div>
        </div>

        {/* Documents list */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Documents</h2>
          <p className="text-xs text-white/30 mb-4">Additional project documents (approvals, price list, etc.) shown in the document centre.</p>
          <div className="space-y-4">
            {form.documents.map((d, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                <div className="flex-1">
                  {renderFileRow("File", d.url, (v) => updateArrayItem("documents", i, { url: v }), ".pdf,application/pdf,image/*", "uploads/projects", "/uploads/projects/doc.pdf", `document-${i}`)}
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Name</label>
                  <input type="text" value={d.name || ""} onChange={(e) => updateArrayItem("documents", i, { name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                    placeholder="RERA / DTPC Approval" />
                </div>
                <div className="w-full md:w-36">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Type</label>
                  <select value={d.type || "pdf"} onChange={(e) => updateArrayItem("documents", i, { type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                    <option value="pdf" className="bg-charcoal-dark">PDF</option>
                    <option value="image" className="bg-charcoal-dark">Image</option>
                    <option value="link" className="bg-charcoal-dark">Link</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeArrayItem("documents", i)}
                  className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 mb-0.5">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setForm((f) => ({ ...f, documents: [...f.documents, { name: "", url: "", type: "pdf", description: "" }] }))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all">
              <Plus className="h-3.5 w-3.5" /> Add Document
            </button>
          </div>
        </div>

        {/* Project updates */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Project Status Updates</h2>
          <p className="text-xs text-white/30 mb-4">Status milestones (planned / in-progress / completed) shown on the project page.</p>
          <div className="space-y-4">
            {form.updates.map((u, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                <div className="flex-1">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Title</label>
                  <input type="text" value={u.title || ""} onChange={(e) => updateArrayItem("updates", i, { title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                    placeholder="Water Pipeline Installation" />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Description</label>
                  <input type="text" value={u.description || ""} onChange={(e) => updateArrayItem("updates", i, { description: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
                    placeholder="Ongoing across all phases" />
                </div>
                <div className="w-full md:w-36">
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Status</label>
                  <select value={u.status || "in-progress"} onChange={(e) => updateArrayItem("updates", i, { status: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                    <option value="planned" className="bg-charcoal-dark">Planned</option>
                    <option value="in-progress" className="bg-charcoal-dark">In Progress</option>
                    <option value="completed" className="bg-charcoal-dark">Completed</option>
                  </select>
                </div>
                <button type="button" onClick={() => removeArrayItem("updates", i)}
                  className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0 mb-0.5">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button type="button" onClick={() => setForm((f) => ({ ...f, updates: [...f.updates, { title: "", description: "", status: "in-progress" }] }))}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary hover:bg-primary/15 transition-all">
              <Plus className="h-3.5 w-3.5" /> Add Update
            </button>
          </div>
        </div>

        {/* Array fields */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Lists</h2>
          <div className="space-y-8">
            {renderArrayField("Amenities", "amenities", newAmenity, setNewAmenity, "Swimming Pool, Yoga Area...")}
            {renderArrayField("Highlights", "highlights", newHighlight, setNewHighlight, "FCDA Approved...")}
            {renderArrayField("USPs", "usps", "", () => {}, "")}
            {renderArrayField("Location Advantages", "locationAdvantages", newAdvantage, setNewAdvantage, "2 Minutes to Srisailam Highway...")}
            {renderArrayField("Why Invest", "whyInvest", newWhyInvest, setNewWhyInvest, "FCDA Approved project...")}
            {renderArrayField("Investment Highlights", "investmentHighlights", "", () => {}, "")}
            {renderArrayField("Connectivity", "connectivity", "", () => {}, "")}
            {renderArrayField("Nearby Landmarks", "nearbyLandmarks", "", () => {}, "")}
          </div>
        </div>

        {/* FAQs */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Project FAQs</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newFaqQ} onChange={(e) => setNewFaqQ(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
              placeholder="Question" />
            <input type="text" value={newFaqA} onChange={(e) => setNewFaqA(e.target.value)}
              className="flex-[2] px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
              placeholder="Answer" />
            <button type="button" onClick={addFaq}
              className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all shrink-0">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {form.faqs.map((faq, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/70 truncate">{faq.q}</p>
                  <p className="text-[11px] text-white/30 mt-0.5 line-clamp-1">{faq.a}</p>
                </div>
                <button type="button" onClick={() => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, j) => j !== i) }))}
                  className="h-7 w-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Project Testimonials</h2>
          <div className="flex gap-2 mb-3">
            <input type="text" value={newTestName} onChange={(e) => setNewTestName(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
              placeholder="Name" />
            <input type="text" value={newTestText} onChange={(e) => setNewTestText(e.target.value)}
              className="flex-[2] px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30"
              placeholder="Testimonial text" />
            <button type="button" onClick={addTestimonial}
              className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-all shrink-0">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            {form.testimonials.map((t, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white/70">{t.name}</p>
                  <p className="text-[11px] text-white/30 mt-0.5 line-clamp-1">{t.text}</p>
                </div>
                <button type="button" onClick={() => setForm((f) => ({ ...f, testimonials: f.testimonials.filter((_, j) => j !== i) }))}
                  className="h-7 w-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all shrink-0">
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={saving}
            className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark px-8 py-3.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? (
              <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Save className="h-4 w-4" /> {isEdit ? "Update Project" : "Create Project"}</>
            )}
          </button>
          <Link href="/admin/projects" className="px-6 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white transition-all">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
