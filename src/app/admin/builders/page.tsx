"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Search, Building2 } from "lucide-react";

interface BuilderItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  established?: string;
  projectTypes?: string;
  highlights?: string[];
}

export default function AdminBuildersPage() {
  const [builders, setBuilders] = useState<BuilderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BuilderItem | null>(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "", established: "", projectTypes: "", highlights: "" });

  const fetchBuilders = async () => {
    const res = await fetch("/api/builders");
    const data = await res.json();
    setBuilders(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { fetchBuilders(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "", established: "", projectTypes: "", highlights: "" });
    setShowForm(true);
  };

  const openEdit = (b: BuilderItem) => {
    setEditing(b);
    setForm({ name: b.name, slug: b.slug, description: b.description, established: b.established || "", projectTypes: b.projectTypes || "", highlights: (b.highlights || []).join(", ") });
    setShowForm(true);
  };

  const handleSave = async () => {
    const body = { ...form, highlights: form.highlights.split(",").map((s: string) => s.trim()).filter(Boolean) };
    const url = editing ? `/api/builders/${editing._id}` : "/api/builders";
    const method = editing ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setShowForm(false); fetchBuilders(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this builder?")) return;
    await fetch(`/api/builders/${id}`, { method: "DELETE" });
    fetchBuilders();
  };

  const filtered = builders.filter((b) => b.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Builders</h1>
          <p className="text-sm text-white/30 mt-1">{builders.length} builders</p>
        </div>
        <button onClick={openNew}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong">
          <Plus className="h-4 w-4" /> Add Builder
        </button>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search builders..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30 transition-all" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((b) => (
            <div key={b._id} className="glass-card rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{b.name}</h3>
                    {b.established && <p className="text-[10px] text-white/25">Est. {b.established}</p>}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(b)} className="h-7 w-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all">
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button onClick={() => handleDelete(b._id)} className="h-7 w-7 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-white/35 line-clamp-2 mb-3">{b.description}</p>
              {b.projectTypes && <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/[0.04] text-white/30">{b.projectTypes}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-5">{editing ? "Edit Builder" : "New Builder"}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Name</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Slug</label>
                  <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30 font-mono text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Established</label>
                  <input type="text" value={form.established} onChange={(e) => setForm({ ...form, established: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="2015" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project Types</label>
                  <input type="text" value={form.projectTypes} onChange={(e) => setForm({ ...form, projectTypes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="Gated Communities, Villa Plots" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Highlights (comma separated)</label>
                <input type="text" value={form.highlights} onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" placeholder="100+ Acres Developed, FCDA Approved" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-sm font-semibold text-white">Save</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-sm text-white/50 hover:text-white transition-all">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
