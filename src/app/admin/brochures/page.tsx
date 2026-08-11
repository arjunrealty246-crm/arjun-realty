"use client";

import { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Search, FileText, Upload, ExternalLink } from "lucide-react";

interface Item { _id: string; title: string; file: string; project?: string; type: string; }

export default function AdminBrochuresPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState({ title: "", file: "", project: "", type: "brochure" });

  const fetchItems = async () => {
    const res = await fetch("/api/brochures");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };
  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { setEditing(null); setForm({ title: "", file: "", project: "", type: "brochure" }); setShowForm(true); };
  const openEdit = (item: Item) => { setEditing(item); setForm({ title: item.title, file: item.file, project: item.project || "", type: item.type }); setShowForm(true); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData(); fd.append("file", file); fd.append("folder", "uploads/brochures");
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setForm({ ...form, file: data.url });
  };

  const handleSave = async () => {
    const method = editing ? "PUT" : "POST";
    const body = editing ? { _id: editing._id, ...form } : form;
    const res = await fetch("/api/brochures", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) { setShowForm(false); fetchItems(); }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch("/api/brochures", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) fetchItems();
  };

  const filtered = items.filter((i) => i.title?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div><h1 className="text-2xl font-bold text-white tracking-tight">Brochures</h1><p className="text-sm text-white/30 mt-1">{items.length} documents</p></div>
        <button onClick={openNew} className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-dark px-5 py-2.5 rounded-full text-[13px] font-semibold text-white glow-primary-strong"><Plus className="h-4 w-4" /> Add Brochure</button>
      </div>
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/15" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white placeholder-white/15 focus:outline-none focus:border-primary/30" />
      </div>
      {loading ? (
        <div className="flex justify-center py-20"><div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <div key={item._id} className="glass-card rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white/70 truncate">{item.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[10px] text-white/25 uppercase">{item.type}</span>
                    {item.project && <span className="text-[10px] text-white/20">{item.project}</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                {item.file && <a href={item.file} target="_blank" className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"><ExternalLink className="h-3.5 w-3.5" /></a>}
                <button onClick={() => openEdit(item)} className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-primary hover:bg-primary/10 transition-all"><Edit3 className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(item._id)} className="h-8 w-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="glass-card-elevated rounded-2xl p-6 max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-white mb-5">{editing ? "Edit Brochure" : "Add Brochure"}</h3>
            <div className="space-y-4">
              <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Title</label>
                <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-primary/30">
                    <option value="brochure" className="bg-charcoal-dark">Brochure</option>
                    <option value="layout" className="bg-charcoal-dark">Layout</option>
                    <option value="price-list" className="bg-charcoal-dark">Price List</option>
                    <option value="other" className="bg-charcoal-dark">Other</option>
                  </select></div>
                <div><label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">Project</label>
                  <input type="text" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white focus:outline-none focus:border-primary/30" /></div>
              </div>
              <div>
                <label className="block text-[10px] text-white/25 uppercase tracking-[0.12em] mb-1.5 font-medium">File URL</label>
                <input type="text" value={form.file} onChange={(e) => setForm({ ...form, file: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white font-mono text-xs focus:outline-none focus:border-primary/30" />
                <label className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-xs font-semibold text-primary cursor-pointer hover:bg-primary/15 transition-all">
                  <Upload className="h-3.5 w-3.5" /> Upload PDF
                  <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
                </label>
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
