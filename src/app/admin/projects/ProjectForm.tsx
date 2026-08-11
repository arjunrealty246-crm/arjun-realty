"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

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
  brochureUrl: string;
  layoutPdfUrl: string;
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
}

const emptyForm: ProjectFormData = {
  name: "", slug: "", builder: "", marketingPartner: "", projectType: "",
  approval: "FCDA Approved", location: "", mapsUrl: "", price: "", startingPrice: "",
  status: "Live", badge: "Live", isUpcoming: false, totalAcres: "", totalPlots: "",
  plotSizes: "", clubhouseDetails: "", heroVideo: "", brochureUrl: "", layoutPdfUrl: "", image: "",
  bankLoanAvailable: true, siteVisitBooking: true, whatsappCta: "", projectArea: "",
  amenities: [], highlights: [], locationAdvantages: [], whyInvest: [],
  investmentHighlights: [], connectivity: [], nearbyLandmarks: [], usps: [],
  faqs: [], testimonials: [],
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

  const handleFileUpload = async (file: File, folder: string) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url || "";
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleFileUpload(file, "uploads/projects");
    if (url) update("image", url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError("");

    if (!form.name || !form.slug) {
      setError("Name and Slug are required"); setSaving(false); return;
    }

    try {
      const url = isEdit ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
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

  return (
    <div>
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
                <option value="FCDA Approved" className="bg-charcoal-dark">FCDA Approved</option>
                <option value="HMDA Approved · RERA Registered" className="bg-charcoal-dark">HMDA Approved · RERA Registered</option>
                <option value="DTCP Approved" className="bg-charcoal-dark">DTCP Approved</option>
                <option value="HMDA Approved · TSRERA Registered" className="bg-charcoal-dark">HMDA Approved · TSRERA Registered</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Status</label>
              <select value={form.status} onChange={(e) => update("status", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                <option value="Live" className="bg-charcoal-dark">Live</option>
                <option value="Pre-Launch" className="bg-charcoal-dark">Pre-Launch</option>
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
            <div className="h-24 w-36 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden">
              {form.image ? (
                <img src={form.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <Upload className="h-6 w-6 text-white/15" />
              )}
            </div>
            <div className="flex-1">
              <input type="text" value={form.image} onChange={(e) => update("image", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs mb-2"
                placeholder="/images/projects/jb-harmony-woods.svg" />
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all">
                <Upload className="h-3.5 w-3.5" /> Upload Image
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
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
            <div className="h-24 w-36 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center overflow-hidden">
              {form.heroVideo ? (
                <video src={form.heroVideo} className="h-full w-full object-cover" muted />
              ) : (
                <Upload className="h-6 w-6 text-white/15" />
              )}
            </div>
            <div className="flex-1">
              <input type="text" value={form.heroVideo} onChange={(e) => update("heroVideo", e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs mb-2"
                placeholder="/videos/projects/jb-harmony-woods-drone.mp4" />
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all">
                <Upload className="h-3.5 w-3.5" /> Upload Video
                <input type="file" accept="video/*" onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const fd = new FormData();
                  fd.append("file", file);
                  fd.append("folder", "uploads/projects");
                  const res = await fetch("/api/upload", { method: "POST", body: fd });
                  const data = await res.json();
                  if (data.url) update("heroVideo", data.url);
                }} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="glass-card-elevated rounded-2xl p-6 lg:p-8">
          <h2 className="text-lg font-bold text-white mb-6">Documents &amp; Media URLs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Brochure URL</label>
              <input type="text" value={form.brochureUrl} onChange={(e) => update("brochureUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                placeholder="/brochures/jb-harmony-woods.pdf" />
            </div>
            <div>
              <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Layout PDF URL</label>
              <input type="text" value={form.layoutPdfUrl} onChange={(e) => update("layoutPdfUrl", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 font-mono text-xs"
                placeholder="/brochures/jb-harmony-woods-layout.pdf" />
            </div>
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
